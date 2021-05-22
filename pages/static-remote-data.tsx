import { GetStaticPropsResult } from "next"
import BitcoinPrice from "../components/BitcoinPrice"
import Layout from "../components/Layout"
import processData, { ProcessedData } from "../lib/postprocessing"
import Link from "next/link"

interface Props {
  data: ProcessedData[]
  updatedAt: number
}

export default function ServerData({ data, updatedAt }: Props) {
  const generatedAt = new Date(updatedAt)

  return (
    <Layout>
      <h1>Statically and Incrementally Generated with Remote Data</h1>
      <BitcoinPrice data={data} />
      <p>
        <small>
          Page statically (re)generated {generatedAt.toLocaleDateString()} at{" "}
          {generatedAt.toLocaleTimeString()}
        </small>
      </p>
      <hr />
      <p>
        This page is statically generated at build time, using Next.js’s{" "}
        <code>getStaticProps</code> to fetch data from a remote source. It also
        has a <code>revalidate</code> interval of <code>60</code>, meaning that
        the page will be incrementally regenerated with new data at most every
        60 seconds.
      </p>
      <p>
        This approach is good when you don't need data to be constantly fresh,
        but still want pages to be kept relatively up-to-date.
      </p>
      <p>
        <Link href="https://github.com/daneden/nextjs-data-fetching/tree/main/pages/static-flat-data.tsx">
          <a>View this page's source on GitHub</a>
        </Link>
      </p>
    </Layout>
  )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  const data = await fetch(
    "https://api.coindesk.com/v2/bpi/currentprice.json"
  ).then((d) => d.json())
  const processedData = processData(data)

  return {
    props: {
      data: processedData,
      updatedAt: Date.now(),
    },

    // Refresh data at most every 60 seconds
    revalidate: 60,
  }
}
