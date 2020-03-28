import fetch from 'node-fetch';
import btoa from 'btoa';

import { 
    PAYPAL_CLIENT_ID , 
    PAYPAL_SECRET, 
    PAYPAL_TOKEN_URL, 
    PAYPAL_ORDER_URL,
    PAYPAL_ACCOUNT
 } from './config';

const getAccessTokenPaypal = async () => {

    const res = await fetch(PAYPAL_TOKEN_URL, {
        method: "POST",
        headers: {
            "Authorization" : `basic ${btoa(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`)}`,
            "accept" : "application/json",
            "accept-language" : "en_US",
            "content-type" : "application/x-www-form-urlencoded"

        },
        body: "grant_type=client_credentials"


    });

    const { access_token } = await res.json();
    return access_token;


}

const captureOrderPaypal = async ({ access_token }) => {

    const res = await fetch(PAYPAL_ORDER_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access_token}`,
        },
        body: JSON.stringify({
            "intent": "CAPTURE",
            "purchase_units": [{
                "amount": {
                    "currency_code": "USD",
                    "value": "100.00"
                },
                // "payee": {
                //     "email_address": "sb-ftzs471312705@business.example.com"
                // },
                // "payment_instruction": {
                //     "disbursement_mode": "INSTANT",
                //     "platform_fees": []
                // }
            }],
        })
        
    })

    console.log(await res.json());
}

// const ProcessCheckoutPaypal = async () => {

//     const res = request.post('https://api.sandbox.paypal.com/v2/checkout/orders', {
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: "Bearer Access-Token",
//             // "PayPal-Partner-Attribution-Id": BN-Code
//         },
//         body: {
//             "intent": "CAPTURE",
//             "purchase_units": [{
//                 "amount": {
//                     "currency_code": "USD",
//                     "value": "100.00"
//                 },
//                 "payee": {
//                     "email_address": "seller@example.com"
//                 },
//                 "payment_instruction": {
//                     "disbursement_mode": "INSTANT",
//                     "platform_fees": [{
//                         "amount": {
//                             "currency_code": "USD",
//                             "value": "25.00"
//                         }
//                     }]
//                 }
//             }],
//         },
//         json: true
//     });

getAccessTokenPaypal().then(access_token => {
    console.log(access_token);
    captureOrderPaypal({ access_token })
})