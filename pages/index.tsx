import Link from "next/link"
import Layout from "../components/Layout"

export default function IndexPage() {
  return (
    <Layout>
      <h1>Next.js Data Fetching Strategies</h1>
      <p>
        This site demonstrates three methods for fetching data from a remote
        source and using that data in a Next.js site. Click on each example
        below to see the results and read about each method.
      </p>
      <ul>
        <li>
          <Link href="/server-data">
            <a>
              Server-side data fetching and page generation (
              <code>getServerSideProps</code>)
            </a>
          </Link>
        </li>
        <li>
          <Link href="/static-remote-data">
            <a>
              Static fetching and page generation with incremental regeneration
              (<code>getStaticProps</code> with revalidate interval)
            </a>
          </Link>
        </li>
        <li>
          <Link href="/static-flat-data">
            <a>
              Static fetching with GitHub “Flat Data” (
              <code>getStaticProps</code>)
            </a>
          </Link>
        </li>
      </ul>
    </Layout>
  )
}
