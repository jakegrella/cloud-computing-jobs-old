import type { AppProps } from "next/app";
import Header from "../components/header";
import "../styles/reset.css";
import "../styles/globals.css";
import styles from "../styles/_app.module.css";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  // acts as a layout
  return (
    <div className={styles.container}>
      <Head>
        <meta name="author" content="Cloud Computing Jobs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Component {...pageProps} />
    </div>
  );
}
