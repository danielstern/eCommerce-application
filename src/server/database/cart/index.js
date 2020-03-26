import { getCollection } from '../utility';

export function cartReducer (cartId, history) {

    if (history.length === 0) return null;

    return {
        cartId,
        checkoutStatus: history
            .sort((a,b) => new Date(a.date) - new Date(b.date))
            .reduce((a,b)=>{
                switch (b.type) {
                    case "CHECKOUT_STARTED":
                        return "CHECKOUT_STARTED";
                    case "CHECKOUT_ABORTED":
                        return "CHECKOUT_NOT_STARTED";
                    case "CHECKOUT_COMPLETED":
                        return "CHECKOUT_COMPLETED";
                    default:
                        return a;
                }
            }, "CHECKOUT_NOT_STARTED"),
        summarizedValue: history
            .filter(action => action.type === "ITEM_ADDED")
            .map(action => action.meta.itemValue)
            .reduce((a,b) => a + b)

    }

}

export async function GetCartDetails (cartId) {

    const collection = await getCollection("carts", cartId);
    const history = await collection.find().toArray();

    return cartReducer(cartId, history);

}

export async function StartCartCheckout (cartId) {

    const collection = await getCollection("carts", cartId);
    await collection.insertOne({type:"CHECKOUT_STARTED", date: new Date()});

    return { }

}

export async function CompleteCartCheckout (cartId) {

    const collection = await getCollection("carts", cartId);
    await collection.insertOne({type:"CHECKOUT_COMPLETED", date: new Date()});

    return { }

}

export async function AbortCartCheckout (cartId) {

    const collection = await getCollection("carts", cartId);
    await collection.insertOne({type:"CHECKOUT_ABORTED", date: new Date()})

}