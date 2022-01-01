import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import NewsItem from "@/components/NewsItem";
import Link from "next/link";
import qs from "qs";
import { useRouter } from "next/router";

export default function Search(props) {
  const router = useRouter();

  return (
    <div>
      <Layout title="Search Result">
        {props.news.length == 0 && <h1>No News Found</h1>}
        {props.news.length != 0 && (
          <h1>Search Result for {router.query.term}</h1>
        )}
        {props.news.map((item) => (
          <NewsItem key={item.id} news={item} />
        ))}

        <Link href="/">
          <a>Go Back</a>
        </Link>
      </Layout>
    </div>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    _where: {
      _or: [{ name_contains: term }, { detail_contains: term }],
    },
  });
  // Fetch data from external API
  const res = await fetch(`${API_URL}/sports?${query}`);
  const news = await res.json();
  return { props: { news } };
}
