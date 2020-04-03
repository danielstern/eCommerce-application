import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export const WelcomeRoute = connect(
    state => ({
        cartId: state.cartId
    }),
    dispatch => ({
        handleStartOrder(history) {
            dispatch({type:"START_ORDER", history});
        }
    })
)(({
    cartId,
    handleStartOrder,
    history = useHistory()
})=>(
    
    <div>
        <h2>
            Thanks for choosing Katie's custom cakes!
        </h2>
        <p>
            Cooking custom cakes since the century started!
        </p>

        {cartId ? 
        <div>
            <p>You have an order in progress.</p>
            <Link to="/order">
                <button>
                    Continue Your Order
                </button>
            </Link> 
        </div> : <button onClick={()=>handleStartOrder(history)}>

            Start Your Order

        </button>    }

        

    </div>
))