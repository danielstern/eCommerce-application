import { takeEvery, put, call } from 'redux-saga/effects';

export const cartCreation = function*(){
    yield takeEvery(["START_ORDER"], function*({history}){ 

        const cartRequest = yield fetch("http://localhost:7777/cart/create", {

            method: 'POST',
            headers: {

                'Content-Type': 'application/json'

            },

        });

        const { cartId } = yield cartRequest.json();

        localStorage.setItem("cartId", cartId);
        yield put({type: "SET_CART_ID", cartId});
        yield call(history.push, '/order');
    

    });
}