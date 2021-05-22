import { GetServerSidePropsResult } from "next"
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
      <h1>Server-Side Generated with Remote Data</h1>
      <BitcoinPrice data={data} />
      <p>
        <small>
          Page generated {generatedAt.toLocaleDateString()} at{" "}
          {generatedAt.toLocaleTimeString()}
        </small>
      </p>
      <hr />
      <p>
        This page is regenerated on <strong>every</strong> page load, using
        Next.js’s <code>getServerSideProps</code> to fetch new data from a
        remote source and pass the data to the page on every request.
      </p>
      <p>
        This is a good approach if you want to ensure that page data is
        constantly up-to-date.
      </p>
      <p>
        <Link href="https://github.com/daneden/nextjs-data-fetching/tree/main/pages/server-data.tsx">
          <a>View this page's source on GitHub</a>
        </Link>
      </p>
    </Layout>
  )
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<Props>
> {
  const data = await fetch(
    "https://api.coindesk.com/v2/bpi/currentprice.json"
  ).then((d) => d.json())
  const processedData = processData(data)

  return {
    props: {
      data: processedData,
      updatedAt: Date.now(),
    },
  }
}
