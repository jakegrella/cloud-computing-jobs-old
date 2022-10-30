import Head from "next/head";
import Card from "../components/card";
import Header from "../components/header";
import List from "../components/list";
import styles from "../styles/Home.module.css";

export default function Companies() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Companies - Cloud Computing Jobs</title>
        <meta
          name="description"
          content="The best job board for cloud-focused software engineers"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className={styles.main}>
        <h1>Companies</h1>
        <Card>
          <List />
        </Card>
      </main>
    </div>
  );
}
