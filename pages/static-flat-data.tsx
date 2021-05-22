import { readFileSync } from "fs"
import { GetStaticPropsResult } from "next"
import { ProcessedData } from "../lib/postprocessing"

interface Props {
  data: ProcessedData[]
  updatedAt: number
}

export default function StaticFlatData({ data, updatedAt }: Props) {
  const generatedAt = new Date(updatedAt)

  return (
    <>
      <h1>Statically Generated with GitHub Flat Data</h1>
      <p>
        <small>
          Page statically generated at {generatedAt.toLocaleDateString()}{" "}
          {generatedAt.toLocaleTimeString()}
        </small>
      </p>
    </>
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
