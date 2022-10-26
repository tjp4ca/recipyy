import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";



// const appearance = {
//   theme: 'stripe',

//   variables: {
//     colorPrimary: '#0570de',
//     colorBackground: '#ffffff',
//     colorText: '#30313d',
//     colorDanger: '#df1b41',
//     fontFamily: 'Ideal Sans, system-ui, sans-serif',
//     spacingUnit: '2px',
//     borderRadius: '4px',
//     // See all possible variables below
//   }
// };

// // Pass the appearance object to the Elements instance
// const elements = stripe.elements({clientSecret, appearance});












export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      console.log("Stripe 23 | token generated!", paymentMethod);
      try {
        const { id } = paymentMethod;
        const response = await axios.post(
          "http://localhost:3001/stripe/charge",
          {
            amount: 2000,
            id: id,
          }
        );

        console.log("Stripe 35 | data", response.data.success);
        if (response.data.success) {
          console.log("CheckoutForm.js 25 | payment successful!");
        }
      } catch (error) {
        console.log("CheckoutForm.js 28 | ", error);
      }
    } else {
      console.log(error.message);
    }
  };





  return (
    <div className="row justify-content-center">
      <form className="donateForm col"
        onSubmit={handleSubmit} style={{ maxWidth: 400 }}>

        <CardElement className="cardInfo col-12" />

        <button className="payBtn col-12">Pay</button>

      </form>
    </div>

  );
};