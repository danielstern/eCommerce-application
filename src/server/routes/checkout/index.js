import { Router } from 'express';

import { validateCreditCard } from '../../utility/validation';
import { GetCartDetails } from '../../database/cart';
import { initializeDB } from '../../database/utility';
import { DEV_MODE } from '../../common/config';
import { checkoutCartCreditCard } from '../../sagas/checkoutCartCreditCard';

import delay from 'delay';

export const Checkout = Router();

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

        if (DEV_MODE) {

            await delay(10000);
            await initializeDB();

        }

        return;

    }
    
});