import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";
import Button from "@mui/material/Button";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

function PaymentForm({ amount, setConfirmed, setOpenPopupPay }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:8000/payment", {
          amount: amount,
          id,
        });

        if (response.data.success) {
          console.log("Successful payment");
          alert("Successful payment");
          setConfirmed(true);
          setOpenPopupPay(false);
        }
      } catch (error) {
        alert("Failed payment");
      }
    } else {
      alert("Failed payment");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="payment">
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <Button type="submit">Pay</Button>
        </div>
      </form>
    </>
  );
}

export default PaymentForm;
