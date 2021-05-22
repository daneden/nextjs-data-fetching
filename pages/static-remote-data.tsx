import { GetStaticPropsResult } from "next"
import processData, { ProcessedData } from "../lib/postprocessing"

interface Props {
  data: ProcessedData[]
  updatedAt: number
}

export default function ServerData({ data, updatedAt }: Props) {
  const generatedAt = new Date(updatedAt)

  return (
    <>
      <h1>Statically and Incrementally Generated with Remote Data</h1>
      <p>
        <small>
          Page statically (re)generated at {generatedAt.toLocaleDateString()}{" "}
          {generatedAt.toLocaleTimeString()}
        </small>
      </p>
    </>
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
