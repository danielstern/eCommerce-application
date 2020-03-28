import { getCollection } from '../utility';
import { CartCheckoutStatus, CartCheckoutAction, CartContentsAction } from '../../common/constants';

export function cartReducer (cartId, history) {

    if (history.length === 0) return null;

    return {
        cartId,
        checkoutStatus: history
            .sort((a,b) => new Date(a.date) - new Date(b.date))
            .reduce((status,event)=>{
                switch (event.type) {

                    case CartCheckoutAction.START_CHECKOUT:
                        return CartCheckoutStatus.CHECKOUT_STARTED;

                    case CartCheckoutAction.ABORT_CHECKOUT:
                        return CartCheckoutStatus.CHECKOUT_NOT_STARTED;

                    case CartCheckoutAction.COMPLETE_CHECKOUT:
                        return CartCheckoutStatus.CHECKOUT_COMPLETED;

                    default:
                        return status;

                }
            }, 
            CartCheckoutStatus.CHECKOUT_NOT_STARTED
        ),
        summarizedValue: history
            .filter(action => action.type === CartContentsAction.ADD_ITEM)
            .map(action => action.meta.itemValue)
            .reduce((a,b) => a + b),
        contents: history
            .filter(event => event.type === CartContentsAction.ADD_ITEM)
            .map(action => action.meta)

    }

}

export async function GetCartDetails (cartId) {

    const collection = await getCollection("carts", cartId);
    const history = await collection.find().toArray();

    return cartReducer(cartId, history);

}

export async function StartCartCheckout (cartId) {

    const collection = await getCollection("carts", cartId);
    await collection.insertOne({type:CartCheckoutAction.START_CHECKOUT, date: new Date()});

}

export async function CompleteCartCheckout (cartId) {

    const collection = await getCollection("carts", cartId);
    await collection.insertOne({type:CartCheckoutAction.COMPLETE_CHECKOUT, date: new Date()});

}

export async function AbortCartCheckout (cartId) {

    const collection = await getCollection("carts", cartId);
    await collection.insertOne({type:CartCheckoutAction.ABORT_CHECKOUT, date: new Date()})

}