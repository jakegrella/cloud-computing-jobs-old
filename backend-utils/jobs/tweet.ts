import { IJob } from "../../types";
import OAuth from "oauth-1.0a";

let crypto;
try {
  crypto = await import("node:crypto");
} catch (err) {
  console.error("crypto support is disabled!");
}

export async function tweet(job: IJob) {
  try {
    const oauth = new OAuth({
      consumer: {
        key: process.env.TWITTER_CONSUMER_KEY,
        secret: process.env.TWITTER_CONSUMER_SECRET,
      },
      signature_method: "HMAC-SHA1",
      hash_function(base_string, key) {
        return crypto
          .createHmac("sha1", key)
          .update(base_string)
          .digest("base64");
      },
    });

    const auth = oauth.authorize(
      {
        method: "POST",
        url: "https://api.twitter.com/2/tweets",
      },
      {
        key: process.env.TWITTER_ACCESS_TOKEN,
        secret: process.env.TWITTER_TOKEN_SECRET,
      }
    );

    const authHeader = oauth.toHeader(auth);

    const url = "https://api.twitter.com/2/tweets";
    const data = await (
      await fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader.Authorization,
        },
        body: JSON.stringify({
          text: `${job.company.name} is hiring a ${job.title}. Check it out at https://cloudcomputingjobs.com/jobs/${job.id}`,
        }),
      })
    ).json();

    return data;
  } catch (err) {
    throw err;
  }
}
