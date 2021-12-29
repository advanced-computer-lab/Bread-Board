import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY =
  "pk_test_51KAi6WENrNlSp6QRcUJGmaT3zbGTCghUDO6hl9pwEwG0uK5T5GXX6bfihiwsTcwppL3zdgmH0nGrm1nJ8jAfyh0q00cj6CkrJu";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

function StripeContainer({ amount, setConfirmed, setOpenPopupPay }) {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm
        amount={amount}
        setConfirmed={setConfirmed}
        setOpenPopupPay={setOpenPopupPay}
      />
    </Elements>
  );
}

export default StripeContainer;
