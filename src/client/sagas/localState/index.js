import { takeEvery, put, select } from 'redux-saga/effects';
export function* localState(){

    yield takeEvery("INIT", function*(){

        const recoveredState = localStorage.getItem("appState");
        if (recoveredState) {

            yield put ({type: "LOAD_STATE", state: JSON.parse(recoveredState)});
            
        }

    })

    yield takeEvery([

        "MODIFY_ORDER_PROPERTY",
        "MODIFY_CREDIT_CARD_PROPERTY",
        "UPDATE_ORDER_PRICING",
        "MODIFY_DELIVERY_DETAIL_PROPERTY",
        "SET_CART_ID",
        "SET_CHECKOUT_STATUS"

    ], function * () {

        localStorage.setItem("appState", JSON.stringify(yield select()));

    })

}