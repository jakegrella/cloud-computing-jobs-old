import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { Button } from "../../button";
import { useStore } from "../../../store";
import { addJob } from "../../../utils/httpRequests";

// ERRORS ARE NOT HANDLED CORRECTLY
export function Payment() {
  const stripe = useStripe();
  const elements = useElements();

  const previewJob = useStore((state) => state.previewJob);

  const stripeState = useStore((state) => state.stripeState);
  const setStripeState = useStore((state) => state.setStripeState);

  useEffect(() => {
    if (!stripe) {
      // console.log("!stripe");
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      // console.log("!clientSecret");
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setStripeState({ ...stripeState, message: "Payment succeeded!" });
          break;
        case "processing":
          setStripeState({
            ...stripeState,
            message: "Your payment is processing.",
          });
          break;
        case "requires_payment_method":
          setStripeState({
            ...stripeState,
            message: "Your payment was not successful, please try again.",
          });
          break;
        default:
          setStripeState({ ...stripeState, message: "Something went wrong." });
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.log("!stripe || !elements");

      // Stripe.js has not yet loaded
      // TODO: disable form submission until Stripe.js has loaded
      return;
    }

    setStripeState({ ...stripeState, isLoading: true });

    // add job to database
    try {
      await addJob(previewJob);
    } catch (error) {
      console.error({ message: "error adding job", error });
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/payment-completed", // change away from localhost
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setStripeState({ ...stripeState, message: error.message });
      // TODO delete or unpublish job from db
    } else {
      console.log("e", error);
      setStripeState({
        ...stripeState,
        message: "An unexpected error occurred.",
      });
      // TODO delete or unpublish job from db
    }

    setStripeState({
      ...stripeState,
      isLoading: false,
    });
  };

  return (
    <div className="payment">
      <PaymentElement id="payment-element" />
      <Button
        disabled={stripeState.isLoading || !stripe || !elements}
        id="submit"
        onClick={handleSubmit}
        type="submit"
      >
        <span id="button-text">
          {stripeState.isLoading ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Pay now"
          )}
        </span>
      </Button>
      {/* Show any error or success messages */}
      {stripeState.message && (
        <div id="payment-message">{stripeState.message}</div>
      )}
    </div>
  );
}
