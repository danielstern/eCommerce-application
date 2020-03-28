import delay from 'delay';

const cache = {};
export async function ProcessCreditCardTransaction(cardDetails, transactionId){
    
    await delay(500);
    if (cache[transactionId]) {

        cache[transactionId] = false;
        return { success : true };

    } else {

        cache[transactionId] = true;
        return { success : false };

    }
    

}