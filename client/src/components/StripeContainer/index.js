// import React from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";

// // import { CheckoutForm } from "./CheckoutForm";
// import { CheckoutForm } from "../CheckoutForm";

// const PUBLIC_KEY = 'pk_test_51LwUjsKzkAHe1megeoJbSdKKZhLIDWfK3Np9HnZmolZVNkfG7lzqNldKYUZusDKVFpofWoM1xEY2moOxSiEQ7PAu003aK1Yl0s';

// const stripeTestPromise = loadStripe(PUBLIC_KEY);

// const Stripe = () => {
//   return (
//     <Elements stripe={stripeTestPromise}>
//       <CheckoutForm className="checkoutForm" />
//     </Elements>
//   );
// };

// export default Stripe;










// stripe css not working

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../CheckoutForm";
import "../../Donation.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe('pk_test_51LwUjsKzkAHe1megeoJbSdKKZhLIDWfK3Np9HnZmolZVNkfG7lzqNldKYUZusDKVFpofWoM1xEY2moOxSiEQ7PAu003aK1Yl0s');
export default function Stripe() {
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);
  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}