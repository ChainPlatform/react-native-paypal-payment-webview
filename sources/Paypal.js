export function PaypalHTML(
    theme = "light",
    client_id = "",
    order_id = "",
    env = "") {
    return `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <title>Accept a payment</title>
            <meta name="author" content="santran686@gmail.com">
            <meta name="author" content="chainplatform.net">
            <style>
                * {
                    box-sizing: border-box;
                }
                body {
                    font-family: system-ui, sans-serif;
                    font-size: 14px;
                    -webkit-font-smoothing: antialiased;
                    display: flex;
                    justify-content: center;      
                }
                @media screen and (max-width: 400px) {
                    #paypal-button-container {
                        width: 100%;
                    }
                }
                @media screen and (min-width: 400px) {
                    #paypal-button-container {
                        width: 100%;
                        max-width: 250px;
                    }
                }
            </style>
            </head>
            <body>
                <div id="paypal-button-container"></div>
                <script>
                    let tag = document.createElement('script');
                    tag.src = 'https://${env == "sandbox" ? env : "www"}.paypal.com/sdk/js?client-id=${client_id}&components=buttons&debug=false';
                    tag.onload = () => {
                        document.documentElement.style.colorScheme = '${theme}';
                        paypal.Buttons({
                            createOrder: function(data, actions) {
                                return '${order_id}';
                            },
                            onApprove: function(data, actions) {
                                actions.order.capture().then(function (details) {
                                    let result = { paymentResult: 1, datas: details };
                                    (window.ReactNativeWebView || window.parent || window).postMessage(JSON.stringify(result), '*');
                                });
                            }
                        }).render('#paypal-button-container');
                    };
                    tag.onerror = () => { };
                    let firstScriptTag = document.getElementsByTagName('script')[0];
                    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                </script>
            </body>
        </html>`
}