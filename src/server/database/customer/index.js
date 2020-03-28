import { v1 } from 'uuid';

import { getCollection } from '../utility';

export async function CreateCustomer ({cardDetails}) {

    const customerID = v1();
    const collection = await getCollection("customers", customerID);

    await collection.insertOne({

        type:"CREATE_CUSTOMER",
        date:new Date(),
        meta:{ 

            customerID

        },

    })

    await collection.insertOne({

        type:"SET_CUSTOMER_CREDIT_CARD_DETAILS",
        date:new Date(),
        meta:{ 

            cardDetails

        },

    })

    return {

        customerID

    }

}