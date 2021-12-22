import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import NewsItem from "@/components/NewsItem";
import Link from "next/link";
// import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

// const client = new ApolloClient({
//   uri: `${API_URL}/graphql`,
//   cache: new InMemoryCache(),
// });

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

export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(`${API_URL}/sports?_sort=date:ASC&_limit=5`);
  const news = await res.json();
  return { props: { news }, revalidate: 1 };
}

// export async function getServerSideProps() {
//   // Fetch data from external API
//   const res = await fetch(`${API_URL}/sports?_sort=date:ASC&_limit=2`);
//   const news = await res.json();

//   // const { data } = await client.query({
//   //   query: gql`
//   //     query {
//   //       sports(limit: 5, sort: "date:desc") {
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
//   return { props: { news } };
// }

// export async function getServerSideProps() {
//   // Fetch data from external API
//   const res = await fetch(`${API_URL}/sports?_sort=date:ASC&_limit=2`);
//   const news = await res.json();

//   // const { data } = await client.query({
//   //   query: gql`
//   //     query {
//   //       sports(limit: 5, sort: "date:desc") {
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
//   return { props: { news } };
// }
