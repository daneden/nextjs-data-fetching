import { readFileSync } from "fs"
import { useEffect } from "react"

export default function StaticFlatData({ data }) {
  useEffect(() => console.log(data))

  return (
    <>
      <h1>Hello</h1>
    </>
  )
}

export function getStaticProps() {
  const data = readFileSync("btc-price-postprocessed.json")

  return {
    props: {
      data,
    },
  }
}
