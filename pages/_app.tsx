import type { AppProps } from "next/app";
import Head from "next/head";
import { Poppins } from "@next/font/google";
import { Header } from "../components";
import "../styles/reset.css";
import "../styles/globals.css";
import styles from "../styles/_app.module.css";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  // acts as a layout
  return (
    <div className={`${styles.container} ${poppins.className}`}>
      <Head>
        <meta name="author" content="Cloud Computing Jobs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Component {...pageProps} />
    </div>
  );
}
