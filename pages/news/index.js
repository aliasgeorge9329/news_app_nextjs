import Layout from "@/components/Layout";
import { API_URL, NEWS_PER_PAGE } from "@/config/index";
import NewsItem from "@/components/NewsItem";
import Link from "next/link";
import styles from "@/styles/News.module.css";
import Pagination from "@/components/Pagination";

export default function News({ news, page, total }) {
  return (
    <div>
      <Layout title="Home">
        {news.length === 0 && <h1>No News</h1>}
        {news.length > 0 && (
          <Link href="/">
            <a className={styles.back}>Go Back</a>
          </Link>
        )}
        <h1>Latest News</h1>
        {news.map((item) => (
          <NewsItem key={item.id} news={item} />
        ))}
        <Pagination page={page} total={total} />
      </Layout>
    </div>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const start = +page === 1 ? 0 : (+page - 1) * NEWS_PER_PAGE;
  // Fetch data from external API
  const totalnewsres = await fetch(`${API_URL}/sports/count`);
  const total = await totalnewsres.json();

  const res = await fetch(
    `${API_URL}/sports?_sort=date:ASC&_limit=${NEWS_PER_PAGE}&_start=${start}`
  );
  const news = await res.json();
  return { props: { news, page: +page, total: total } };
}
