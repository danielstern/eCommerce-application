// import React from 'react';
// import ReactDOMServer from 'react-dom/server';
// import nodemailer from 'nodemailer';

// import { Template } from '../../utility/communication/template.jsx';
import { CreateCustomer } from '../../database/customer'
import { sendOrderNoticeEmail } from '../../utility/communication';

export async function ProcessCreditCardTransaction({cartDetails, creditCardDetails, deliveryDetails, orderDetails}){

    await sendOrderNoticeEmail({cartDetails, creditCardDetails, deliveryDetails, orderDetails});

    // let transporter = nodemailer.createTransport({
    //     host: "secure198.inmotionhosting.com",
    //     port: 465,
    //     secure: true,
    //     auth: {
    //         user: "noreply@elitebtc.com", 
    //         pass: "gm(mOD.C[Z[R" 
    //     }
    // });
        
    // await transporter.sendMail({
    //     from: 'Commerce Application <noreply@elitebtc.com>', 
    //     to: "Dave <vendor@elitebtc.com>", 
    //     subject: "Order Received", 
    //     html: ReactDOMServer.renderToString(<Template date={new Date} cartDetails={cartDetails} creditCardDetails={creditCardDetails} deliveryDetails={deliveryDetails} orderDetails={orderDetails}/>)
    // });

    const customerId = await CreateCustomer({creditCardDetails});
    return { success : true, customerId };

}