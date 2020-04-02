import React from 'react';
import ReactDOMServer from 'react-dom/server';
import nodemailer from 'nodemailer';
import { Template } from './template';

export async function sendOrderNoticeEmail({cartDetails, creditCardDetails, deliveryDetails, orderDetails}){
    
    let transporter = nodemailer.createTransport({

        host: "secure198.inmotionhosting.com",
        port: 465,
        secure: true,
        auth: {

            user: "noreply@elitebtc.com", 
            pass: "gm(mOD.C[Z[R" 

        }
    });
        
    await transporter.sendMail({
        from: 'Commerce Application <noreply@elitebtc.com>', 
        to: "Dave <vendor@elitebtc.com>", 
        subject: "Order Received", 
        html: ReactDOMServer.renderToString(<Template date={new Date} cartDetails={cartDetails} creditCardDetails={creditCardDetails} deliveryDetails={deliveryDetails} orderDetails={orderDetails}/>)
    });

}