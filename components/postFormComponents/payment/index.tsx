import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { Button } from "../../button";
import { useStore } from "../../../store";
import { addJob } from "../../../utils/httpRequests";
import { LoadingIcon } from "../../loadingIcon";

export function Payment() {
  const stripe = useStripe();
  const elements = useElements();
  const [previewJob, stripeState, setStripeState] = useStore((state) => [
    state.previewJob,
    state.stripeState,
    state.setStripeState,
  ]);

  useEffect(() => {
    async function stripeInit() {
      if (!stripe) return;

      const clientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
      );

      if (!clientSecret) return;

      try {
        const { paymentIntent } = await stripe.retrievePaymentIntent(
          clientSecret
        );

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
            setStripeState({
              ...stripeState,
              message: "Something went wrong.",
            });
            break;
        }
      } catch (err) {
        setStripeState({
          ...stripeState,
          message: "Something went wrong.",
        });
      }
    }
    stripeInit();
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setStripeState({ ...stripeState, isLoading: true });

    // add job to database
    try {
      await addJob(previewJob);
    } catch (err) {
      setStripeState({
        ...stripeState,
        message: "Unable to add job to database.",
      });
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/payment-completed`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setStripeState({ ...stripeState, message: error.message });
      // TODO: delete info from DB
    } else {
      setStripeState({
        ...stripeState,
        message: "An unexpected error occurred.",
      });
      // TODO: delete info from DB
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
          {stripeState.isLoading ? <LoadingIcon /> : "Pay now"}
        </span>
      </Button>

      {stripeState.message && (
        <div id="payment-message">{stripeState.message}</div>
      )}
    </div>
  );
}
