import styles from "@/styles/Header.module.css";
import Link from "next/link";
import Search from "@/components/Search";
export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>Sports News</a>
        </Link>
      </div>
      <Search />
      <nav>
        <ul>
          <li>
            <Link href="/news">
              <a>News</a>
            </Link>
          </li>
          <li>
            <Link href="/news/add">
              <a>Add News</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
