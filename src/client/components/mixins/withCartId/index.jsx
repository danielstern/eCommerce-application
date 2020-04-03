import React from "react";
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

export function withCartId (Component) {

    return connect(state => ({

        cartId: state.cartId,

    }), 
    dispatch => ({

        handleStartOrder(history) {

            dispatch({type:"START_ORDER", history});

        }
        
    }))(
        ({
            cartId,
            history = useHistory(),
            handleStartOrder
        })=>(
            <div>
                { !cartId ? (
                    <div>
                        <div>
                            You have not started an order.
                        </div>
                                                
                            <button onClick={()=>handleStartOrder(history)}>Start Your Order</button>
                    </div>
                ) : < Component /> 
                }
            </div>
        )
    )
}