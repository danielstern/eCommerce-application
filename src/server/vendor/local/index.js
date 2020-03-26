import delay from 'delay';

const cache = {};
export async function ProcessCreditCardTransaction(cardDetails, transactionId){
    
    if (cache[transactionId]) {

        cache[transactionId] = false;
        await delay(500);
        return { success : true };

    } else {
        cache[transactionId] = true;
        await delay(500);
        return { success : false };
    }
    

}