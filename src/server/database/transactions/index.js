import { v1 } from 'uuid';

import { getCollection } from '../utility';

export async function CreateTransaction (cartDetails) {

    const transactionId = v1();
    const collection = await getCollection("transactions", transactionId);

    await collection.insertOne({

        type:"TRANSACTION_CREATED",
        date:new Date(),
        meta:{ 

            cartId:cartDetails.cartId,
            summariedValue:cartDetails.summarizedValue,
            type:"CHECKOUT_CART"

        },
        

    })

    return {
        transactionId
    };

}

export async function AbortTransaction (transactionId) {

    const collection = await getCollection("transactions", transactionId);
    
    await collection.insertOne({

        type:"TRANSACTION_ABORTED",
        date:new Date(),
        meta:{ }

    })

}


export async function CompleteTransaction (transactionId) {

    const collection = await getCollection("transactions", transactionId);
    
    await collection.insertOne({

        type:"TRANSACTION_COMPLETED",
        date:new Date(),
        meta:{ }

    });

}