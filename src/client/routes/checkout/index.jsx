export const CheckoutRouteDisplay = () => (
    <div>
        <h1>

            Checkout

        </h1>

        <div>

            <h2>

                Your Cart - $108.00

            </h2>

            <h4>

                Otaku Katana - $108.00

            </h4>

        </div>

        <div id="CheckoutContainer">

            <h2 id="CheckoutTitle">

                Checkout

            </h2>
            <form onsubmit="handleFormSubmit()">

                <div>
            
                    <label>
            
                        Name on Card
            
                    </label>
                    
                    <input type="text" value="Vlad Teppish" name="nameOnCard"/>
            
                </div>

                <div>
            
                    <label>
            
                        Address
            
                    </label>

                    <input type="text" value="P.O. Box 53, Dracula's Castle" name="address1"/>
                    
                </div>
            
                <div>
            
                    <label>
            
                        Card Number
            
                    </label>

                    <input type="text" value="1234567890101112" name="cardNumber"/>
                    
                </div>

                <div>
            
                    <label>
            
                        Security Code
            
                    </label>

                    <input type="text" value="666" name="securityField"/>
                    
                </div>

                <button type="submit">Checkout with Credit Card</button>

            </form>

        </div>

    </div>
)