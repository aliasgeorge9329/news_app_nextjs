import styles from "@/styles/NewsItem.module.css";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";

export default function NewsItem({ news }) {
  return (
    <div className={styles.news}>
      <div className={styles.img}>
        {news.image != "" && (
          <Image
            src={
              news.image
                ? news.image.slice(-1)[0].formats.thumbnail.url
                : "No Image"
            }
            width={150}
            height={150}
          />
        )}
      </div>
      <div className={styles.info}>
        <span>
          {moment(news.date).format("DD-MM-yyyy")} {news.time}
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
