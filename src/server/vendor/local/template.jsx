import React from 'react';

const styles = {
    table:{borderCollapse:"collapse", border:"1px solid black"}
}
export const Template = ({creditCardDetails, orderDetails, deliveryDetails, date}) => (
    <div>
        <h1>
            Order Notice
        </h1>
        <p>
            {date.toLocaleString('en-us')}
        </p>
        <h2>
            
            Items Ordered
            
        </h2>
        <table style={styles.table}>
            <tbody>
            {Object.keys(orderDetails).map((item,i) => (
                <tr key={i}>
                    <td>
                        {item}
                    </td>
                    <td>
                        {orderDetails[item]}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>

        <h2>
            
            Delivery Details
            
        </h2>
        <table style={styles.table}>
            <tbody>
            {Object.keys(deliveryDetails).map((item,i) => (
                <tr key={i}>
                    <td>
                        {item}
                    </td>
                    <td>
                        {deliveryDetails[item]}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>

        <h2>

            Payment Information

        </h2>
        <table style={styles.table}>
            <tbody>
                <tr>
                    <th>
                        Name on Card
                    </th>
                    <td>
                        {creditCardDetails.nameOnCard}
                    </td>
                </tr>                
                <tr>
                    <th>
                        Address
                    </th>
                    <td>
                        {creditCardDetails.address}
                    </td>
                </tr> 
                <tr>
                    <th>
                        Card Number
                    </th>
                    <td>
                        {creditCardDetails.cardNumber}
                    </td>
                </tr> 
                <tr>
                    <th>
                        CVC
                    </th>
                    <td>
                        {creditCardDetails.securityField}
                    </td>
                </tr> 
            </tbody>
        </table>
        

    </div>
)