import { takeEvery, put, select } from 'redux-saga/effects';

export const priceCalculation = function*(){
    yield takeEvery(["INIT","HANDLE_CHANGE_ORDER_PROPERTY"], function*(){

        const { orderDetails } = yield select();
        const response = yield fetch("http://localhost:7777/price", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...orderDetails})
        });
        const { price } = yield response.json();

        yield put({type: "UPDATE_ORDER_PRICING", price})
    

    });
}