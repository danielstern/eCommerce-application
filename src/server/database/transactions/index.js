import { v1 } from 'uuid';

import { getCollection } from '../utility';
import { TransactionAction, TransactionType } from '../../../common/constants';

export async function CreateTransaction (cartDetails) {

    const transactionId = v1();
    const collection = await getCollection("transactions", transactionId);

    await collection.insertOne({

        type:TransactionAction.CREATE_TRANSACTION,
        date:new Date(),
        meta:{ 

            cartId: cartDetails.cartId,
            summarizedValue: cartDetails.summarizedValue,
            type: TransactionType.CART_CHECKOUT

        },

    })

    return {

        transactionId

    }

}

export async function AbortTransaction (transactionId) {

    const collection = await getCollection("transactions", transactionId);
    await collection.insertOne({

        type: TransactionAction.ABORT_TRANSACTION,
        date: new Date(),
        meta: { }

    });

}


export async function CompleteTransaction (transactionId) {

    const collection = await getCollection("transactions", transactionId);
    await collection.insertOne({

        type: TransactionAction.COMPLETE_TRANSACTION,
        date: new Date(),
        meta: { }

    });

}