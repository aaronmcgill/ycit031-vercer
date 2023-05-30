import Image from "next/image";
import { createClient } from "@vercel/postgres";

import styles from "./page.module.css";

export default async function Home() {
  const client = createClient();
  await client.connect();

  const { rows } = await client.sql`
SELECT name, message
FROM messages`;

  console.log(rows);

  // console.log({
  //     POSTGRES_URL: process.env.POSTGRES_URL,
  //     POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING
  //   });

  return (
    <main className={styles.main}>
      <p>Welcome to my app!</p>
      {rows.map((r) => (
        <span>
          <span key="{name}">{r.name} <br></br></span>
          <span key="{message}">{r.message}</span>
        </span>
      ))}
    </main>
  );
}