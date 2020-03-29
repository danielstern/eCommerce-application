import { MONGO_URL } from '../../../common/config';
import { CartContentsAction } from '../../../common/constants';
import { MongoClient } from 'mongodb';

let client = undefined;

export async function initializeDB() {

    const client = await getClient();
    const cart = await getCollection("carts", "C1");
    await cart.drop();
    await cart.insertOne({

        "type" : CartContentsAction.CREATE_CART,
        "date" : new Date("Apr 1 2020"),
        "meta" : {}

    });

    await cart.insertOne({
        "type" : CartContentsAction.ADD_ITEM,
        "date" : new Date("Apr 2 2020"),
        "meta" : {

            "itemValue" : 108.0,
            "itemId" : "I1",
            "itemName" : "Otaku Katana"
            
        }
    });
 
    await client.db("transactions").dropDatabase();
    await client.db("customers").dropDatabase();

    console.info("INFO: Database Initialized.");    

}

export async function getClient () {
    
    if (!client) {

        client = new MongoClient(MONGO_URL, {useUnifiedTopology: true});
        await client.connect();

    }  

    return client;

}

export async function getCollection(db, collection) {

    const client = await getClient();
    return client.db(db).collection(collection);
    
}