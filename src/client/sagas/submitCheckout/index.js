import { takeEvery, put, select } from 'redux-saga/effects';

export function* submitCheckout() {

    yield takeEvery("SUBMIT_CHECKOUT", function*(){

        const { creditCardDetails,orderDetails, deliveryDetails, orderPricing } = yield select();
        const cartRequest = yield fetch("http://localhost:7777/cart/create", {

            method: 'POST',
            headers: {

                'Content-Type': 'application/json'

            },
            body: JSON.stringify({creditCardDetails, orderDetails, deliveryDetails, orderPricing})

        });

        const { cartId } = yield cartRequest.json();
        console.info("INFO:: Created cart", cartId);
        const checkoutRequest = yield fetch("http://localhost:7777/checkout/credit", {

            method: 'POST',
            headers: {

                'Content-Type': 'application/json'

            },
            body: JSON.stringify({cartId, creditCardDetails, orderDetails, deliveryDetails, orderPricing})
        });
        const { errorCode, errors } = yield checkoutRequest.json();

        switch (errorCode) {

            case "CART_TRANSACTION_ALREADY_COMPLETED":
                yield put({type:"SET_CHECKOUT_STATUS", status: "ALREADY_COMPLETED"});
                break;

            case "PAYMENT_NOT_ACCEPTED":
                yield put({type:"SET_CHECKOUT_STATUS", status: "PAYMENT_NOT_ACCEPTED"});
                break;
                
            case "FIELD_VALIDATION_FAILURE":

                yield put({type:"SET_FORM_ERRORS", form:"CHECKOUT", errors});
                break;

            default:
                yield put({type:"SET_CHECKOUT_STATUS", status: "SUCCESS"});   

        }

    });

}