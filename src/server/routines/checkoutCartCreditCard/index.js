import { StartCartCheckout, CompleteCartCheckout } from '../../database/cart';
import { VendorPaymentOutcome } from '../../../common/constants';

import { CreateCustomer } from '../../database/customer'
import { sendOrderNoticeEmail } from '../../utility/communication';

export async function checkoutCartCreditCard({cartDetails, creditCardDetails, orderDetails, deliveryDetails}) {

    await StartCartCheckout(cartDetails.cartId);
    await sendOrderNoticeEmail({cartDetails, creditCardDetails, deliveryDetails, orderDetails});
    await CreateCustomer({creditCardDetails});
    await CompleteCartCheckout(cartDetails.cartId);

    return {

        status: VendorPaymentOutcome.ACCEPTED

    }
    
}
