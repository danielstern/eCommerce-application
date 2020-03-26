import { MONGO_URL } from '../../common/config';
import { MongoClient } from 'mongodb';

let client = undefined;

export async function initializeDB() {

    console.info("DB Initializing");

    const client = await getClient();
    const cart = await getCollection("carts", "C1");
    await cart.drop();
    await cart.insertOne({
        "type" : "CART_CREATED",
        "date" : "Apr 1 2020",
        "meta" : {}
    });

    await cart.insertOne({
        "type" : "ITEM_ADDED",
        "date" : "Apr 2 2020",
        "meta" : {
            "itemValue" : 108.0,
            "itemId" : "I1",
            "itemName" : "Otaku Katana"
        }
    });

    await client.db("transactions").dropDatabase();

    

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