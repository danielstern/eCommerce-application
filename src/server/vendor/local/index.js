import delay from 'delay';
import sendmail from 'sendmail';
const nodemailer = require("nodemailer");

import { GetCartDetails } from '../../database/cart';

const pass = "gm(mOD.C[Z[R";
// const cache = {};
export async function ProcessCreditCardTransaction(body){

    const { cartId, userId, ...cardDetails} = body;
    console.log(cardDetails);

    const cartDetails = await GetCartDetails(cartId);

    console.log(cartDetails);
    
    // await delay(500);
    // if (cache[transactionId]) {
        console.log("Sending email...");

        let transporter = nodemailer.createTransport({
            host: "secure198.inmotionhosting.com",
            port: 465,
            secure: true,
            auth: {
              user: "noreply@elitebtc.com", 
              pass: "gm(mOD.C[Z[R" 
            }
          });

          
          let info = await transporter.sendMail({
            from: 'Commerce Application <noreply@elitebtc.com>', // sender address
            to: "Dave <vendor@elitebtc.com>", // list of receivers
            subject: "Order Received", // Subject line
            text: `Received order at ${new Date().toLocaleDateString("en-us")}` // html body
          });

          console.log("Message sent: %s", info.messageId);
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // sendmail({
        //     logger: {
        //       debug: console.log,
        //       info: console.info,
        //       warn: console.warn,
        //       error: console.error
        //     },
        //     silent: false,
        //     // dkim: { // Default: False
        //     //   privateKey: fs.readFileSync('./dkim-private.pem', 'utf8'),
        //     //   keySelector: 'mydomainkey'
        //     // },
        //     // devPort: 1025, // Default: False
        //     // devHost: 'localhost', // Default: localhost
        //     // smtpPort: 2525, // Default: 25
        //     // smtpHost: 'localhost' // Default: -1 - extra smtp host after resolveMX
        //   })({
        //     from: 'no-reply@myapp.com',
        //     to: 'vendor@elitebtc.com',
        //     subject: 'test sendmail',
        //     html: 'Mail of test sendmail ',
        // }, function(err, reply){
        //     console.log(err, reply);
        // });

        console.info("Notifying vendor via email");

        // cache[transactionId] = false;


        return { success : true };

    // } else {

        // cache[transactionId] = true;
        // return { success : false };

    // }
    

}