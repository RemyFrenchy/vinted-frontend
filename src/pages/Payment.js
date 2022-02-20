import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51KUwQFIwoULn9HYX7z1hBi2Mbnb5vvd7bAoa9ZGekoL2LV3I8ae12gHRR50bf8grQxqnsNuwkgZgvSezYrKrnXRl00c511GMmS"
);

export default function Payment() {
  const location = useLocation();
  const { title, price } = location.state;
  return (
    <div>
      <div>{title}</div>
      <div>{price} euros</div>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}
