import { ProcessedData } from "../lib/postprocessing"

interface Props {
  data: ProcessedData[]
}

export default function BitcoinPrice({ data }: Props) {
  return (
    <>
      <div>
        <h2>Bitcoin Price</h2>
        <ul>
          {data.map((price) => (
            <li>
              <h3>{price.currency}</h3>
              <p className="bc-price">
                <span dangerouslySetInnerHTML={{ __html: price.symbol }} />
                {price.bitcoinRate.toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <style jsx>{`
        h2 {
          font-size: 1.25rem;
          color: orange;
        }

        h2::before {
          content: "₿";
          background-color: orange;
          color: white;
          padding: 0.25em;
          border-radius: 100%;
          text-align: center;
          width: 1em;
          height: 1em;
          line-height: 1.1;
          display: inline-block;
          margin-right: 0.25em;
        }

        @media (prefers-color-scheme: dark) {
          h2::before {
            color: black;
          }
        }

        h3 {
          font-size: 1rem;
          margin: 0;
        }

        .bc-price {
          font-size: 2rem;
          line-height: 1;
          margin: 0;
        }

        ul {
          list-style: none;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(20ch, 1fr));
          gap: 1rem;
        }
      `}</style>
    </>
  )
}
