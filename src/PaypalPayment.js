import { Component, createRef } from 'react';
import { Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { DEFAULT_USER_AGENT, DEFAULT_URL } from '../helpers';
import { PaypalHTML } from '../sources/Paypal';

export default class PaypalPayment extends Component {
    constructor(props) {
        super(props);
        this.webPaymentRef = createRef(null);
    }

    getContent() {
        let loadContent = null;
        const env = typeof this.props.sandbox_environment != "undefined" && this.props.sandbox_environment ? "sandbox" : "";
        const production_client_id = typeof this.props.production_client_id != "undefined" ? this.props.production_client_id : "test";
        const sandbox_client_id = typeof this.props.sandbox_client_id != "undefined" ? this.props.sandbox_client_id : "test";
        const order_id = typeof this.props.order_id != "undefined" ? this.props.order_id : "";
        let client_id = production_client_id;
        if (env === "sandbox") {
            client_id = sandbox_client_id;
        }
        const theme = typeof this.props.theme != "undefined" ? this.props.theme : "light";
        if (typeof this.props.useRemote != "undefined" && this.props.useRemote == true) {
            loadContent = { uri: DEFAULT_URL + '?client_id=' + client_id + '&env=' + env + '&order_id=' + order_id + '&theme=' + theme };
        } else {
            loadContent = { html: PaypalHTML(theme, client_id, order_id, env) };
        }
        return loadContent;
    }

    render() {
        const content = this.getContent();
        return (
            <WebView
                ref={this.webPaymentRef}
                scalesPageToFit={true}
                overScrollMode={"never"}
                nestedScrollEnabled={true}
                automaticallyAdjustContentInsets={true}
                javaScriptEnabled={true}
                originWhitelist={['*']}
                mixedContentMode="compatibility"
                {...this.props}
                source={content}
                userAgent={
                    typeof this.props.forceAndroidAutoplay != "undefined"
                        ? Platform.select({ android: DEFAULT_USER_AGENT, ios: '' })
                        : ''
                }
                onShouldStartLoadWithRequest={event => { return true; }}
                onMessage={(event) => {
                    if (
                        typeof event.nativeEvent.data == "string" &&
                        typeof JSON.parse(event.nativeEvent.data) == "object"
                    ) {
                        const datas = JSON.parse(event.nativeEvent.data);
                        if (typeof this.props.paymentResult != "undefined") {
                            if (typeof datas.paymentResult != "undefined") {
                                this.props.paymentResult(datas.paymentResult);
                                return;
                            }
                        }
                    }
                    if (typeof this.props.onMessage != "undefined") {
                        this.props.onMessage(event.nativeEvent.data);
                    }
                }}
            />
        );
    }
};