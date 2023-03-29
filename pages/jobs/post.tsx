import { Button, Head } from "../../components";

export default function Post() {
  return (
    <div>
      <Head
        title="Post a Job — Cloud Computing Jobs"
        description="View information and pricing for posting jobs on our site."
      />

      <main>
        <p>card with content about job pricing</p>
        <p>$price</p>
        <Button>Buy</Button>
      </main>
    </div>
  );
}
