import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';

import { priceCalculation } from './sagas/priceCalculation';
import { MainRoute } from './routes/main'


const defaultState = {

    cartId : null,
    cartContents:[],
    deliveryDetails:{
        deliveryTo:"John Doe",
        phoneNumber:"5555555555",
        deliveryAddress:"123 Fake Street"
    },
    creditCardDetails : {
        nameOnCard:"John Doe",
        cardNumber:"1234567890123456",
        securityField:666,
        address:"123 Fake Street"
    },
    // prices: {
    //     baseCost:35.99,
    //     variants:{
    //         size: {
    //             "SMALL": 0,
    //             "MEDIUM": 9.99,
    //             "LARGE" : 15.99
    //         },
    //         flavor:{
    //             "CHOCOLATE": 0
    //         },
    //         frostingFlavor: {
    //             "VANILLA":0
    //         },
    //         frostingStyle: {
    //             "PLAIN":0,
    //             "DECORATIVE":7.99
    //         }
    //     }

    // },
    orderDetails:{
        size:"SMALL",
        flavor:"CHOCOLATE",
        frostingFlavor:"VANILLA",
        // frostingStyle:"DECORATIVE",
        
        message:"Happy Birthday Shaun!",
        ornament:"RACE_CAR",
        // addons:{
        //     sprinkles: true,
        //     chocolateChips: true,
        //     raisins: false
        // }
    },
    orderPricing:{
        fetchStatus: "FETCHING",
        totalPrice: null
    },
    currentRoute : "ORDER"

}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(function(state = defaultState, action){

    switch (action.type) {
        case "HANDLE_CHANGE_ORDER_PROPERTY" : {
            return {
                ...state,
                orderDetails:{
                    ...state.orderDetails,
                    [action.property]:action.value
                }
            }
        }
        case "MODIFY_CREDIT_CARD_PROPERTY": {
            return {
                ...state,
                creditCardDetails:{
                    ...state.creditCardDetails,
                    [action.property]:action.value
                }
            }
        }
        case "UPDATE_ORDER_PRICING" : {
            return {
                ...state,
                orderPricing: {
                    fetchStatus: "FETCHED",
                    totalPrice: action.price
                }
            }
        }
        case "MODIFY_APP_ROUTE" : {
            return {
                ...state,
                currentRoute: action.route
            }
        }
        default:
            return state;

        }
    },
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(priceCalculation);


ReactDOM.render(
    <Provider store={store}>
        <MainRoute />
    </Provider>,
    document.querySelector("#Container")
);

store.dispatch({type:"INIT"});