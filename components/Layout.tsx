import Head from "next/head"
import { useRouter } from "next/router"
import Link from "next/link"
import { useEffect } from "react"

export default function Layout({ children }) {
  const currentPath = useRouter().pathname
  const isRoot = currentPath === "/"

  useEffect(() => {
    console.log(currentPath)
  })

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=JetBrains+Mono&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main>
        {!isRoot && (
          <Link href="/">
            <a>&larr; Back</a>
          </Link>
        )}
        {children}
      </main>

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        @media (prefers-color-scheme: dark) {
          html {
            color: white;
            background: black;
          }
        }

        html {
          font: 100%/1.5 "Inter", system-ui, -apple-system, sans-serif;
        }

        main {
          margin: 0 auto;
          padding: 1.5rem;
          max-width: 64ch;
        }

        h1 {
          line-height: 1;
        }

        code {
          font-family: "JetBrains Mono";
          background-color: rgba(128, 128, 128, 0.15);
          padding: 0.125em 0.25em;
          border-radius: 0.25em;
        }

        hr {
          border: none;
          border-top: 1px solid rgba(128, 128, 128, 0.5);
          margin: 1.5rem 0;
        }
      `}</style>
    </>
  )
}
