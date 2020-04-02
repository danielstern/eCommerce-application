export const defaultState = {

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
    orderDetails:{
        size:"SMALL",
        flavor:"CHOCOLATE",
        frostingFlavor:"VANILLA",
        message:"Happy Birthday Shaun!",
        ornament:"RACE_CAR",
    },
    orderPricing:{
        fetchStatus: "FETCHING",
        totalPrice: null
    },
    formErrors:{
        "CHECKOUT":{}
    },
    currentRoute : "CHECKOUT",
    checkoutStatus: "NOT_STARTED"

}