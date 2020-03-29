import { CreateTransaction, AbortTransaction, CompleteTransaction } from '../../database/transactions';
import { ProcessCreditCardTransaction } from '../../vendor/local';
import { StartCartCheckout, AbortCartCheckout, CompleteCartCheckout } from '../../database/cart';
import { VendorPaymentOutcome } from '../../../common/constants';

export async function checkoutCartCreditCard(cartDetails, body) {

    const { transactionId } = await CreateTransaction(cartDetails);
    await StartCartCheckout(cartDetails.cartId);
    const { success } = await ProcessCreditCardTransaction(body, cartDetails.cartId);

    if (success) {
        
        await CompleteCartCheckout(body.cartId);
        await CompleteTransaction(transactionId);
        return {

            status: VendorPaymentOutcome.ACCEPTED

        }
        
    } else {

        await AbortCartCheckout(body.cartId);
        await AbortTransaction(transactionId);

        return {

            status: VendorPaymentOutcome.NOT_ACCEPTED

        }

    }
    
}
