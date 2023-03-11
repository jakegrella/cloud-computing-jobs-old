import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Payment } from "../payment";
import { Button } from "../../button";
import { Card } from "../../card";
import styles from "../../../pages/jobs/jobs-post.module.css";
import { useStore } from "../../../store";

export function CheckoutForm() {
  const stripeState = useStore((state) => state.stripeState);
  const setShowPaymentForm = useStore((state) => state.setShowPaymentForm);

  return (
    <form className={styles.form}>
      <Button onClick={() => setShowPaymentForm(false)}>Back</Button>

      <Card>
        <div className="payment_title">
          <h2>Payment</h2>
          <h2>Total: $50.00</h2>
        </div>
        <Card>
          {stripeState.clientSecret && (
            <Elements
              options={{
                clientSecret: stripeState.clientSecret,
                appearance: {
                  theme: "night", // update based on computer theme
                },
              }}
              stripe={loadStripe(
                process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
              )}
            >
              <Payment />
            </Elements>
          )}
        </Card>
      </Card>
    </form>
  );
}
