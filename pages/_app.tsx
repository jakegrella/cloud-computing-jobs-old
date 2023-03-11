import type { AppProps } from "next/app";
import Head from "next/head";
import { Poppins } from "@next/font/google";
import { CookieBanner, Header } from "../components";
import "../styles/reset.css";
import "../styles/globals.css";
import styles from "../styles/_app.module.css";
import Script from "next/script";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  // acts as a layout
  return (
    <div className={`${styles.container} ${poppins.className}`}>
      <Head>
        <meta name="author" content="Cloud Computing Jobs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Google Tag Manager */}
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NTPR82K');`}
      </Script>

      <Header />
      <Component {...pageProps} />
      <CookieBanner />
    </div>
  );
}
