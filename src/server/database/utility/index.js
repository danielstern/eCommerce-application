import { MONGO_URL } from '../../../common/config';
import { CartContentsAction } from '../../../common/constants';
import { MongoClient } from 'mongodb';

let client = undefined;

export async function initializeDB() {

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