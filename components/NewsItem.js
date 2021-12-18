import styles from "@/styles/NewsItem.module.css";
import Link from "next/link";
import Image from "next/image";

export default function NewsItem({ news }) {
  return (
    <div className={styles.news}>
      <div className={styles.img}>
        <Image
          src={news.image ? news.image : "No Image"}
          width={150}
          height={150}
        />
      </div>
      <div className={styles.info}>
        <span>
          {news.date} {news.time}
        </span>
        <h3>{news.name}</h3>
      </div>
      <div className={styles.link}>
        <Link href={`/news/${news.slug}`}>
          <a className="btn">Read more</a>
        </Link>
      </div>
    </div>
  );
}
