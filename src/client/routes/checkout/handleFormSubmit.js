
// export async function handleFormSubmit({creditCardDetails,orderDetails, deliveryDetails, orderPricing }) {
//     // event.preventDefault();

    

//     // const j = {
//     //     cartId,
//     // }

//     const response = await fetch("http://localhost:7777/checkout/credit", {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({...j, creditCardDetails, orderDetails, deliveryDetails, orderPricing})
//     });
//     const res = await response.json();

//     document.querySelectorAll('.error').forEach(e => e.remove());

//     if (!res.success) {

//         switch (res.errorCode) {
//             case "CART_TRANSACTION_ALREADY_COMPLETED":
//                 document.getElementById("CheckoutContainer").innerHTML = `<div><h3>You've already checked out successfully.</div>`
//                 break;

//             case "PAYMENT_NOT_ACCEPTED":
//                 document.getElementById("CheckoutTitle").insertAdjacentHTML("afterEnd",`<div class="error large">Your payment method was declined.</div>`)
//                 break;
                
//             case "FIELD_VALIDATION_FAILURE":
//                 for (let field in res.errors) {

//                     for (let error of res.errors[field]) {
                        
//                         document.getElementsByName(field)[0].insertAdjacentHTML("afterEnd",`<div class="error">${error.description}</div>`)
    
//                     }
    
//                 }

//                 break;
                
//         }

//     } else {

//         document.getElementById("CheckoutContainer").innerHTML = `<div><h3>Success! Your product is on the way!</div>`

//     }

// }