import { defaultState } from './defaultState';
export function reducer(state = defaultState, action){

    switch (action.type) {

        case "MODIFY_ORDER_PROPERTY" : {

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
        case "MODIFY_DELIVERY_DETAIL_PROPERTY" : {
            return {
                ...state,
                deliveryDetails: {
                    ...state.deliveryDetails,
                    [action.property]: action.value
                }
            }

        }
        case "SET_FORM_ERRORS" : {
            return {
                ...state,
                formErrors:{
                    ... state.formErrors,
                    [action.form] : action.errors
                }
            }
        }
        case "SET_CHECKOUT_STATUS" : {
            return {
                ... state,
                checkoutStatus: action.status
            }
        }
        case "SET_CART_ID" : {
            return {
                ...state,
                cartId: action.cartId
            }
        }
        case "LOAD_STATE": {
            return {
                ...state,
                ...action.state,
            }
        }

        case "RESTART_ORDER" : {

            return {

                ... defaultState

            }

        }
        default: {

            return state;

        }
            

    }

    
}