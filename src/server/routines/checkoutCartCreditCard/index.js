import { ProcessCreditCardTransaction } from '../../vendor/local';
import { StartCartCheckout, AbortCartCheckout, CompleteCartCheckout } from '../../database/cart';
import { VendorPaymentOutcome } from '../../../common/constants';

export async function checkoutCartCreditCard({cartDetails, creditCardDetails, orderDetails, deliveryDetails}) {

    await StartCartCheckout(cartDetails.cartId);
    const { success } = await ProcessCreditCardTransaction({cartDetails, creditCardDetails, orderDetails, deliveryDetails});

    if (success) {
        
        await CompleteCartCheckout(cartDetails.cartId);
        return {

            status: VendorPaymentOutcome.ACCEPTED

        }
        
    } else {

        await AbortCartCheckout(cartDetails.cartId);
        await AbortTransaction(transactionId);

        return {

            status: VendorPaymentOutcome.NOT_ACCEPTED

        }

    }
    
}
