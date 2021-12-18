import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import NewsItem from "@/components/NewsItem";
import Link from "next/link";

export default function Home(props) {
  return (
    <div>
      <Layout title="Home">
        {props.news.length === 0 && <h1>No News</h1>}
        <h1>Latest News</h1>
        {props.news.map((item) => (
          <NewsItem key={item.id} news={item} />
        ))}
        {props.news.length > 0 && (
          <Link href="/news">
            <a className="btn-secondary">View All News</a>
          </Link>
        )}
      </Layout>
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${API_URL}/api/news`);
  const news = await res.json();

  // Pass data to the page via props
  return { props: { news: news.slice(0, 5) } };
}
