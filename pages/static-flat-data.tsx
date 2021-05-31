import { readFileSync } from "fs"
import { GetStaticPropsResult } from "next"
import Layout from "../components/Layout"
import { ProcessedData } from "../lib/postprocessing"
import Link from "next/link"
import BitcoinPrice from "../components/BitcoinPrice"

interface Props {
  data: ProcessedData[]
  updatedAt: number
}

export default function StaticFlatData({ data, updatedAt }: Props) {
  const generatedAt = new Date(updatedAt)

  return (
    <Layout>
      <h1>Statically Generated with GitHub Flat Data</h1>
      <BitcoinPrice data={data} />
      <p>
        <small>
          Page statically generated {generatedAt.toLocaleDateString()} at{" "}
          {generatedAt.toLocaleTimeString()}
        </small>
      </p>
      <hr />
      <p>
        This page is statically generated using a data source that is kept
        up-to-date by GitHub{" "}
        <Link href="https://octo.github.com/projects/flat-data">
          <a>Flat Data</a>
        </Link>
        . A GitHub action is responsible for refreshing the data source every 2
        hours, pushing changes to the git repository, which causes a new
        deployment of the Next.js website.
      </p>
      <p>
        This method is especially useful if you want to have a local copy of the
        data, for example, to generate{" "}
        <Link href="https://github.com/daneden/nextjs-data-fetching/blob/main/lib/postprocessing.ts#L3">
          <a>type signatures</a>
        </Link>{" "}
        from a data source.
      </p>
      <p>
        <Link href="https://github.com/daneden/nextjs-data-fetching/tree/main/pages/static-flat-data.tsx">
          <a>View this page's source on GitHub</a>
        </Link>
      </p>
    </Layout>
  )
}

export function getStaticProps(): GetStaticPropsResult<Props> {
  const data = JSON.parse(
    readFileSync("btc-price-postprocessed.json").toString()
  )

  return {
    props: {
      data,
      updatedAt: Date.now(),
    },
  }
}
