import styles from "@/styles/Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; Sports News {year}</p>
    </footer>
  );
}
