'use client';
import { Button } from "antd";
import styles from "@/styles/page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
      <h2 className={styles.tagline}>Create your own recipe's e-book</h2>
      <div className={styles.buttonGroup}>
      <Button href={'/catalog'} size="large" className={styles.catalog_btn}>see recipes</Button>
      <Button href={'/add-recipe'} size="large" className={styles.add_btn}>add recipe</Button>
      </div>
      </main>
    </div>
  );
}
