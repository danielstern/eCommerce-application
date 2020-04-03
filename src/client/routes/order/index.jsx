import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

export const OrderRoute = connect(
    (state)=>({

        ...state.orderDetails,
        totalPrice: state.orderPricing.totalPrice

    }),
    (dispatch)=>({

        handleChangeOrderProperty(property, value){

            dispatch({type:"MODIFY_ORDER_PROPERTY", property, value});

        },
        handleGoToCheckout(){

            dispatch({type:"MODIFY_APP_ROUTE", route: "CHECKOUT"});

        }
        
    })
)(({
    size,
    flavor,
    frostingFlavor,
    totalPrice,
    ornament,
    message,
    handleChangeOrderProperty,
    handleGoToCheckout
})=>(
    <div>

        <h2>
            Place Your Order
        </h2>
        <div>
            <h3>
                Size
            </h3>
            <div>
                <div>

                    <input type="radio" name="size" value="small" checked={size === "SMALL"} onChange={()=>handleChangeOrderProperty("size", "SMALL")}/>
                    <label htmlFor="small">Small</label>

                </div>
                <div>

                    <input type="radio" name="size" value="medium" checked={size === "MEDIUM"} onChange={()=>handleChangeOrderProperty("size", "MEDIUM")}/>
                    <label htmlFor="medium">Medium</label>

                </div>
                <div>
                    
                    <input type="radio" name="size" value="large" checked={size === "LARGE"} onChange={()=>handleChangeOrderProperty("size", "LARGE")}/>
                    <label htmlFor="large">Large</label>

                </div>
            </div>
        </div>

        <div>

            <h3>

                Flavor

            </h3>
            <div>

                <div>

                    <input type="radio" name="flavor" value="chocolate" checked={flavor === "CHOCOLATE"} onChange={()=>handleChangeOrderProperty("flavor", "CHOCOLATE")}/>
                    <label htmlFor="small">Double Chocolate</label>

                </div>

                <div>

                    <input type="radio" name="flavor" value="vanilla" checked={flavor === "VANILLA"} onChange={()=>handleChangeOrderProperty("flavor", "VANILLA")}/>
                    <label htmlFor="medium">French Vanilla</label>

                </div>
                
            </div>

        </div>

        <div>

            <h3>

                Frosting Flavor

            </h3>
            <div>

                <div>

                    <input type="radio" name="frostingFlavor" value="chocolate" checked={frostingFlavor === "CHOCOLATE"} onChange={()=>handleChangeOrderProperty("frostingFlavor", "CHOCOLATE")}/>
                    <label htmlFor="small">Chocolate</label>

                </div>

                <div>

                    <input type="radio" name="frostingFlavor" value="vanilla" checked={frostingFlavor === "VANILLA"} onChange={()=>handleChangeOrderProperty("frostingFlavor", "VANILLA")}/>
                    <label htmlFor="medium">Vanilla</label>

                </div>
                
            </div>

        </div>

        <div>

            <h3>

                Ornament

            </h3>

            <div>
                
                <input type="radio" name="ornament" value="NONE" checked={ornament === "NONE"} onChange={()=>handleChangeOrderProperty("ornament", "NONE")}/>
                <label htmlFor="small">None</label>
    
            </div>
            <div>

                <input type="radio" name="ornament" value="RACE_CAR" checked={ornament === "RACE_CAR"} onChange={()=>handleChangeOrderProperty("ornament", "RACE_CAR")}/>
                <label htmlFor="small">Race Car</label>
    
            </div>

            <div>

                <input type="radio" name="ornament" value="PONY" checked={ornament === "PONY"} onChange={()=>handleChangeOrderProperty("ornament", "PONY")}/>
                <label htmlFor="small">Pony</label>

            </div>
            
        </div>

        <div>
            <h3>
                Personalized Message
            </h3>
            <input type="text" value={message} onChange={(e)=>handleChangeOrderProperty("message", e.target.value)}/>
        </div>

        <h2>
            Subtotal: {totalPrice}
        </h2>


        <Link to="/checkout">
            <button>Go to Checkout</button>
        </Link>
        
    </div>
))