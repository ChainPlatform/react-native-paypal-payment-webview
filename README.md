# React Native Paypal Payment and React Native Web Paypal Payment
 The library allows you to use Paypal Payment with react-native without ejecting support both react-native and react-native-web.

<p align="center">
  <a href="https://github.com/ChainPlatform/react-native-paypal-payment-webview/blob/HEAD/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" />
  </a>
  <a href="https://www.npmjs.com/package/react-native-paypal-payment-webview">
    <img src="https://img.shields.io/npm/v/react-native-paypal-payment-webview?color=brightgreen&label=npm%20package" alt="Current npm package version." />
  </a>
  <a href="https://www.npmjs.com/package/react-native-paypal-payment-webview">
    <img src="https://img.shields.io/npm/dt/react-native-paypal-payment-webview.svg"></img>
  </a>
  <a href="https://www.npmjs.com/package/react-native-paypal-payment-webview">
    <img src="https://img.shields.io/badge/platform-android%20%7C%20ios%20%7C%20web-blue"></img>
  </a>
  <a href="https://github.com/ChainPlatform/react-native-paypal-payment-webview/pulls">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome!" />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=doansan">
    <img src="https://img.shields.io/twitter/follow/doansan.svg?label=Follow%20@doansan" alt="Follow @doansan" />
  </a>
</p>


## Description
The library allows you to use [Paypal Checkout](https://developer.paypal.com/docs) with react-native without ejecting. You can use it with both server-side implementations and client-side implementations.


## Prequisites
- This library relies on [React Native Webview](https://www.npmjs.com/package/react-native-webview). Please follow [this guide](https://github.com/react-native-community/react-native-webview/blob/HEAD/docs/Getting-Started.md) to install in your project first.


## Installation

- Ensure you've completed the setps in [prequisites.](#prequisites)

- Install package via npm or yarn:

`npm install --save @chainplatform/paypal` OR `yarn add @chainplatform/paypal`

- If your project use react-native-web to build website:

`npm install --save @chainplatform/react-native-web-webview` OR `yarn add @chainplatform/react-native-web-webview`

Then setup by guide at: https://github.com/ChainPlatform/react-native-web-webview#readme

## Usage

- Import in your project

```javascript
import PaypalPayment from '@chainplatform/paypal';
```

```js
    <PaypalPayment
        theme={"light"}
        order_id={datas.payment_infos.datas.order_id}
        sandbox_client_id={datas.payment_infos.datas.sandbox_client_id}
        production_client_id={datas.payment_infos.datas.production_client_id}
        sandbox_environment={datas.payment_infos.datas.sandbox_environment}
        paymentResult={(datas) => {
            console.log("paymentResult ", datas);
        }}
    />
```

## Component props

- `theme` (String) - theme dark or light
- `order_id` (String) - order_id.
- `sandbox_client_id` (String) - Paypal sandbox client id of your project.
- `production_client_id` (String) - Paypal production client id of your project.
- `sandbox_environment` (String) - Paypal environment.
- `paymentResult` (?Function) - Called upon calback of the checkout session 
- Support full Webview props


## Contributing
Pull requests are highly appreciated! For major changes, please open an issue first to discuss what you would like to change.

### Related Projects
- Other packages for react native and react native web: [ChainPlatform](https://github.com/ChainPlatform)

