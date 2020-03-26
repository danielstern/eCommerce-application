import { Router } from 'express';

import { validateCreditCard } from '../common/validation';
import { GetCartDetails, StartCartCheckout, AbortCartCheckout, CompleteCartCheckout } from '../database/cart';
import { CreateTransaction, AbortTransaction, CompleteTransaction } from '../database/transactions';
import { initializeDB } from '../database/utility';
import { ProcessCreditCardTransaction } from '../vendor/local';
import delay from 'delay';

export const Checkout = Router();

export async function checkoutCartCreditCard(cartDetails, body) {

    const { transactionId } = await CreateTransaction(cartDetails);
    await StartCartCheckout(cartDetails.cartId);
    const { success } = await ProcessCreditCardTransaction(body, cartDetails.cartId);

    if (success) {
        
        await CompleteCartCheckout(body.cartId);
        await CompleteTransaction(transactionId);
        return {

            status: "ACCEPTED"

        }
        
    } else {

        await AbortCartCheckout(body.cartId);
        await AbortTransaction(transactionId);

        return {

            status: "NOT_ACCEPTED"

        }

    }
    

    

}

Checkout.post("/credit", async ({body},res)=>{

    const cartDetails = await GetCartDetails(body.cartId);

    if (!cartDetails) {

        return res.json({

            status:404,
            description:`Cart with ID ${body.cartId} not found.`,
            errorCode:"CART_NOT_FOUND",
            body,
            success: false

        });

    }

    const { valid, errors } = validateCreditCard(body);

    if (!valid) {

        return res.json({

            status:400,
            description:"Some fields did not validate.",
            errorCode:"FIELD_VALIDATION",
            body,
            errors,
            success: false

        });

    }

    if (cartDetails.checkoutStatus === "CHECKOUT_STARTED") {

        return res.json({

            status:403,
            description:`Transaction is already processing for cart (id: ${body.cartId}).`,
            errorCode:"CART_TRANSACTION_ALREADY_STARTED",
            body,
            success: false

        });

    }

    if (cartDetails.checkoutStatus === "CHECKOUT_COMPLETED") {

        return res.json({

            status:403,
            description:`Transaction has already been successfully completed for cart (id: ${body.cartId}).`,
            errorCode:"CART_TRANSACTION_ALREADY_COMPLETED",
            body,
            success: false

        });

    }

    const { status } = await checkoutCartCreditCard(cartDetails, body);

    if (status === "NOT_ACCEPTED") {

        return res.json({

            status:403,
            description:`Payment not accepted by third party vendor.`,
            errorCode:"PAYMENT_NOT_ACCEPTED",
            body,
            success: false

        });

    }

    if (status === "ACCEPTED") {

        res.json({

            status:200,
            description:`Cart checkout successful.`,
            success: true

        });

        await delay(10000);
        await initializeDB();
        return;

    }
    
});