import Link from "next/link";
import { Button } from "../components";

export default function PaymentCompleted() {
  return (
    <div>
      <h2>Payment Successfully Completed</h2>
      <p>
        Your job has been added to the system and is pending approval. It will
        be live within 24 hours.
      </p>
      <Button>
        <Link href="/jobs/post">Add Another Job</Link>
      </Button>
    </div>
  );
}
