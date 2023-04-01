import type { AppProps } from "next/app";
import { Chivo, Inter } from "next/font/google";
import Head from "next/head";
import Script from "next/script";
import { getCookie } from "cookies-next";
import { ConsentBanner, Header } from "../components";
import "../styles/reset.css";
import "../styles/globals.css";
import styles from "../styles/_app.module.css";

const inter = Inter({
  subsets: ["latin"],
  preload: false,
  variable: "--inter-font",
});

const chivo = Chivo({
  subsets: ["latin"],
  preload: false,
  variable: "--chivo-font",
});

export default function App({ Component, pageProps }: AppProps) {
  const consent = getCookie("localConsent");

  return (
    <div className={`${styles.container} ${chivo.variable} ${inter.variable}`}>
      <Head>
        <meta name="author" content="Cloud Computing Jobs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Google Tag Manager */}

      <Script id="google-tag-manager" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            'ad_storage': 'denied',
            'analytics_storage': 'denied'
          });
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NTPR82K');`}
      </Script>

      {consent === true && (
        <Script id="consent-update" strategy="afterInteractive">
          {`
            gtag('consent', 'update', {
              'ad_storage': 'granted',
              'analytics_storage': 'granted'
            });
          `}
        </Script>
      )}

      <Header />
      <Component {...pageProps} />
      <ConsentBanner />
    </div>
  );
}
