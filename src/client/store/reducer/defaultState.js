export const defaultState = {

    cartId: null,
    deliveryDetails:{
       
    },
    creditCardDetails : {
     
    },
    orderDetails:{

        size:"SMALL",
        flavor:"CHOCOLATE",
        frostingFlavor:"VANILLA",
        ornament:"NONE"

    },
    orderPricing:{
     
    },
    formErrors:{

        "CHECKOUT":{}

    },
    currentRoute : "CHECKOUT",
    checkoutStatus: "NOT_STARTED"

}