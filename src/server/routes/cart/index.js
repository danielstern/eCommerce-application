import { Router } from 'express';

import { GetCartDetails, CreateCart } from '../../database/cart';

export const Cart = Router();

Cart.post("/create", async ({body},res)=>{

    console.log("Creating... body?", body);
    
    const { cartId } = await CreateCart({...body.orderDetails, totalPrice : body.orderPricing.totalPrice});

    res.json({cartId, success: true})

});

Cart.post("/add", async ({body},res)=>{
    
    await CreateCart();

    res.json({cartId, success: true})

});