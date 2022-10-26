import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// import { CheckoutForm } from "./CheckoutForm";
import { CheckoutForm } from "../CheckoutForm";

const PUBLIC_KEY = 'pk_test_51LwUjsKzkAHe1megeoJbSdKKZhLIDWfK3Np9HnZmolZVNkfG7lzqNldKYUZusDKVFpofWoM1xEY2moOxSiEQ7PAu003aK1Yl0s';

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const Stripe = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <CheckoutForm className="checkoutForm" />
    </Elements>
  );
};

export default Stripe;