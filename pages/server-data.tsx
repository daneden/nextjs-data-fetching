import { GetServerSidePropsResult } from "next"
import processData, { ProcessedData } from "../lib/postprocessing"

interface Props {
  data: ProcessedData[]
  updatedAt: number
}

export default function ServerData({ data, updatedAt }: Props) {
  const generatedAt = new Date(updatedAt)

  return (
    <>
      <h1>Server-Side Generated with Remote Data</h1>
      <small>
        Page generated at {generatedAt.toLocaleDateString()}{" "}
        {generatedAt.toLocaleTimeString()}
      </small>
    </>
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
