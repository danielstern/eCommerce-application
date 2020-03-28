import React from 'react';

const styles = {
    table:{borderCollapse:"collapse", border:"1px solid black"}
}
export const Template = ({cardDetails, cartDetails, date}) => (
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
            {cartDetails.contents.map((item,i) => (
                <tr key={i}>
                    <td>
                        {item.itemName}
                    </td>
                    <td>
                        ${item.itemValue}
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
                        {cardDetails.nameOnCard}
                    </td>
                </tr>                
                <tr>
                    <th>
                        Address
                    </th>
                    <td>
                        {cardDetails.address1}
                    </td>
                </tr> 
                <tr>
                    <th>
                        Card Number
                    </th>
                    <td>
                        {cardDetails.cardNumber}
                    </td>
                </tr> 
                <tr>
                    <th>
                        CVC
                    </th>
                    <td>
                        {cardDetails.securityField}
                    </td>
                </tr> 
            </tbody>
        </table>
        

    </div>
)