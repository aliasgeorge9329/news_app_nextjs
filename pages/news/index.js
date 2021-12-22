import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import NewsItem from "@/components/NewsItem";
import Link from "next/link";
import styles from "@/styles/News.module.css";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export default function News(props) {
  return (
    <div>
      <Layout title="Home">
        {props.news.length === 0 && <h1>No News</h1>}
        <h1>Latest News</h1>
        {props.news.map((item) => (
          <NewsItem key={item.id} news={item} />
        ))}
        {props.news.length > 0 && (
          <Link href="/">
            <a className={styles.back}>Go Back</a>
          </Link>
        )}
      </Layout>
    </div>
  );
}

export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(`${API_URL}/sports`);
  const news = await res.json();
  return { props: { news }, revalidate: 1 };
}

// export async function getServerSideProps() {
//   // Fetch data from external API
//   // const res = await fetch(`${API_URL}/api/news`);
//   // const news = await res.json();
//   // const client = new ApolloClient({
//   //   uri: `${API_URL}/graphql`,
//   //   cache: new InMemoryCache(),
//   // });
//   // const { data } = await client.query({
//   //   query: gql`
//   //     query {
//   //       sports {
//   //         id
//   //         name
//   //         slug
//   //         date
//   //         time
//   //         detail
//   //         image {
//   //           formats
//   //         }
//   //       }
//   //     }
//   //   `,
//   // });
//   // Pass data to the page via props
//   // return { props: { news: data.sports } };
// }
