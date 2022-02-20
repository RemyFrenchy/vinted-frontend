import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import axios from "axios";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cardElementData = elements.getElement(CardElement);

    const stripeResponse = await stripe.createToken(cardElementData, {
      name: "L'id de l'acheteur",
    });

    const stripeToken = stripeResponse.token.id;
    console.log(stripeResponse);

    const response = await axios.post(
      "https://vinted2021.herokuapp.com/payment",
      {
        stripeToken: stripeToken,
      }
    );
    console.log(response.data);

    if (response.data.status === "succeeded") {
      setCompleted(true);
    }
  };

  return (
    <>
      {completed === false ? (
        <form onSubmit={handleSubmit}>
          <CardElement />
          <button type="submit">Valider</button>
        </form>
      ) : (
        <span>Paiement effectué ! </span>
      )}
    </>
  );
};

export default CheckoutForm;
