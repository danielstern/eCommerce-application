import React from 'react';
import { connect } from 'react-redux';

// import './checkout.css';

async function handleFormSubmit({creditCardDetails,orderDetails, deliveryDetails, orderPricing }) {
    event.preventDefault();

    const { cartId } = await (await fetch("http://localhost:7777/cart/create", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({creditCardDetails, orderDetails, deliveryDetails, orderPricing})
    })).json();

    const j = {
        cartId,
    }

    const response = await fetch("http://localhost:7777/checkout/credit", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({...j, creditCardDetails, orderDetails, deliveryDetails, orderPricing})
    });
    const res = await response.json();

    document.querySelectorAll('.error').forEach(e => e.remove());

    if (!res.success) {

        switch (res.errorCode) {
            case "CART_TRANSACTION_ALREADY_COMPLETED":
                document.getElementById("CheckoutContainer").innerHTML = `<div><h3>You've already checked out successfully.</div>`
                break;

            case "PAYMENT_NOT_ACCEPTED":
                document.getElementById("CheckoutTitle").insertAdjacentHTML("afterEnd",`<div class="error large">Your payment method was declined.</div>`)
                break;
                
            case "FIELD_VALIDATION_FAILURE":
                for (let field in res.errors) {

                    for (let error of res.errors[field]) {
                        
                        document.getElementsByName(field)[0].insertAdjacentHTML("afterEnd",`<div class="error">${error.description}</div>`)
    
                    }
    
                }

                break;
                
        }

    } else {

        document.getElementById("CheckoutContainer").innerHTML = `<div><h3>Success! Your product is on the way!</div>`

    }

}

export const CheckoutRoute = connect(state => ({

    orderPricing:state.orderPricing,
    ... state.creditCardDetails,
    ... state.deliveryDetails,
    ... state.orderDetails,
    payload:{
        orderDetails: state.orderDetails,
        deliveryDetails: state.deliveryDetails,
        creditCardDetails: state.creditCardDetails,
        orderPricing: state.orderPricing
    }
    

}), dispatch => ({
    handleReturnToOrder(){

        dispatch({type:"MODIFY_APP_ROUTE", route: "ORDER"});

    },
    handleCreditCardDetailChange(property, value){

        dispatch({type:"MODIFY_CREDIT_CARD_PROPERTY", property, value})
    },
    handleDeliveryDetailChange(property, value){

        dispatch({type:"MODIFY_DELIVERY_DETAIL_PROPERTY", property, value})
    }
}))(({

    orderPricing,
    deliveryTo,
    phoneNumber,
    deliveryAddress,
    nameOnCard,

    address,
    cardNumber,
    securityField,

    size,
    flavor,
    ornament,

    payload,

    handleReturnToOrder,
    handleCreditCardDetailChange,
    handleDeliveryDetailChange

}) => (
    <div>

        <div>

            <h2>

                Your Order - ${orderPricing.totalPrice}

            </h2>

            <h3>
                Custom Cake x1
            </h3>

            <table>
                <tbody>
                    <tr>
                        <th>
                            Size
                        </th>
                        <td>
                            {size}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Flavor
                        </th>
                        <td>
                            {flavor}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Ornament
                        </th>
                        <td>
                            {ornament}
                        </td>
                    </tr>
                </tbody>
            </table>

            <button onClick={()=>handleReturnToOrder()}>Change Your Order</button>

        </div>

        <div id="CheckoutContainer">

            <h2 id="CheckoutTitle">

                Checkout

            </h2>
            <form onSubmit={()=>handleFormSubmit(payload)}>
            <h3>
                Delivery Details
            </h3>

            <div>
            
                <label>
        
                    Name
        
                </label>
                
                <input type="text" value={deliveryTo} onChange={(e)=>handleDeliveryDetailChange("deliveryTo", e.target.value)}/>
    
            </div>

            <div>
            
                <label>
        
                    Address
        
                </label>
                
                <input type="text" value={deliveryAddress} onChange={(e)=>handleDeliveryDetailChange("deliveryAddress", e.target.value)}/>
    
            </div>

            <div>
            
            <label>
    
                Phone Number
    
            </label>
            
            <input type="text" value={phoneNumber} onChange={(e)=>handleDeliveryDetailChange("phoneNumber", e.target.value)}/>

        </div>


            <h3>
                Payment Details
            </h3>
            

                <div>
            
                    <label>
            
                        Name on Card
            
                    </label>
                    
                    <input type="text" value={nameOnCard} onChange={(e)=>handleCreditCardDetailChange("nameOnCard", e.target.value)}/>
            
                </div>

                <div>
            
                    <label>
            
                        Address
            
                    </label>

                    <input type="text" value={address} onChange={(e)=>handleCreditCardDetailChange("address", e.target.value)}/>
                    
                </div>
            
                <div>
            
                    <label>
            
                        Card Number
            
                    </label>

                    <input type="text" value={cardNumber} onChange={(e)=>handleCreditCardDetailChange("cardNumber", e.target.value)}/>
                    
                </div>

                <div>
            
                    <label>
            
                        CVC
            
                    </label>

                    <input type="text" value={securityField} onChange={(e)=>handleCreditCardDetailChange("securityField", e.target.value)}/>
                    
                </div>

                <button type="submit">Checkout with Credit Card</button>

            </form>

        </div>

    </div>
))