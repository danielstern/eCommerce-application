import { Router } from 'express';

import { CreateCart } from '../../database/cart';

export const Cart = Router();

Cart.post("/create", async ({body},res)=>{

    const { cartId } = await CreateCart({...body.orderDetails, totalPrice : body.orderPricing.totalPrice});
    res.json({cartId, success: true})

});