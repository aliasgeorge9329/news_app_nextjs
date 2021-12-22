import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/News.module.css";
import Link from "next/link";
import Image from "next/image";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import moment from "moment";

const client = new ApolloClient({
  uri: `${API_URL}/graphql`,
  cache: new InMemoryCache(),
});

export default function SingleNews(news) {
  return (
    <Layout>
      <div className={styles.news}>
        <span>
          {moment(news.date).format("DD-MM-yyyy")} {news.time}
        </span>
        <h1>{news.name}</h1>
        {news.image != "" && (
          <div className={styles.img}>
            <Image
              src={news.image[0].url ? news.image[0].url : "No Image"}
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
  // const res = await fetch(`${API_URL}/api/news`);
  // const news = await res.json();

  const { data } = await client.query({
    query: gql`
      query {
        sports {
          slug
        }
      }
    `,
  });

  // Get the paths we want to pre-render based on posts
  const paths = data.sports.map((item) => ({
    params: { slug: item.slug },
  }));
  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: true };
}

export async function getStaticProps({ params: { slug } }) {
  // const res = await fetch(`${API_URL}/api/news/${slug}`);
  // const news = await res.json();

  const query = gql`
    query getData($slug: String!) {
      sports(where: { slug: $slug }) {
        id
        name
        slug
        date
        time
        detail
        image {
          url
        }
      }
    }
  `;

  const { data } = await client.query({
    query: query,
    variables: { slug: slug },
  });

  return {
    props: data.sports[0],

    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 1, // In seconds
  };
}
