import { Router } from 'express';

import { CreateCart } from '../../database/cart';

export const Cart = Router();

Cart.post("/create", async (_req,res)=>{

    const { cartId } = await CreateCart();
    res.json({cartId, success: true})

});