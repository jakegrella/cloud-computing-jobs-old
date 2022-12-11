export async function createPaymentIntent() {
  try {
    const response = await fetch("/api/payment/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "job-posting" }] }),
    });
    const paymentIntent = await response.json();
    return paymentIntent;
  } catch (err) {
    throw new Error(err.message);
  }
}
