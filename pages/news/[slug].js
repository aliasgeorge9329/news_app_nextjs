import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/News.module.css";
import Link from "next/link";
import Image from "next/image";

export default function SingleNews(news) {
  return (
    <Layout>
      <div className={styles.news}>
        <span>
          {news.date} {news.time}
        </span>
        <h1>{news.name}</h1>
        {news.image && (
          <div className={styles.img}>
            <Image
              src={news.image ? news.image : "No Image"}
              width={900}
              height={600}
            />
          </div>
        )}
        <p>{news.detail}</p>
        <Link href="/news">
          <a className={styles.back}>Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

// export async function getServerSideProps({ query: { slug } }) {
//   // Fetch data from external API

//   const res = await fetch(`${API_URL}/api/news/${slug}`);
//   const news = await res.json();
//   // Pass data to the page via props
//   return { props: news[0] };
// }

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/news`);
  const news = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = news.map((item) => ({
    params: { slug: item.slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: true };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/api/news/${slug}`);
  const news = await res.json();

  return {
    props: news[0],

    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 1, // In seconds
  };
}
