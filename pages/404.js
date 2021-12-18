import styles from "@/styles/404.module.css";
import Layout from "@/components/Layout";
import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

export default function ErrorPage() {
  return (
    <Layout title="Not Found">
      <div className={styles.error}>
        <h1>
          <FaExclamationTriangle />
          404
        </h1>
        <h4>Requested File not Found</h4>
        <Link href="/">Go to Home page</Link>
      </div>
    </Layout>
  );
}
