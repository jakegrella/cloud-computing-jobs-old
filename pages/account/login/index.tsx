import { OAuthExtension } from "@magic-ext/oauth";
import { Magic } from "magic-sdk";
import { useState } from "react";
import { Head } from "../../../components";
// import { magic } from "../../../utils/magic";

// user sign in by email (magic link) or 3rd party
//

export default function LogIn() {
  // TODO: check if user is already logged in and redirect to profile

  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");

  const m = new Magic(process.env.MAGIC_PUBLISHABLE_API_KEY, {
    extensions: [new OAuthExtension()],
  });

  async function handleEmail(event) {
    try {
      const res = await m.auth.loginWithMagicLink({ email, showUI: false });
    } catch (error) {
      console.error(error);
    }
  }

  async function handleGitHub() {}

  return (
    <div>
      <Head
        title="Log In — Cloud Computing Jobs"
        description="Log into your Cloud Computing Jobs account."
      />

      <main>
        <form>
          <p>log in</p>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={() => handleEmail()}>get magic link</button>
          <button onClick={handleGitHub}>log in with GitHub</button>
        </form>
      </main>
    </div>
  );
}
