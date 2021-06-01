import { ReactElement } from 'react'
import Head from 'next/head'

interface SEOProps {
  title: string
}

export function SEO({ title }: SEOProps): ReactElement {
  return (
    <>
      <Head>
        <title>{title}</title>

        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="keywords" content="sell, store, ecommerce" />
        <meta
          name="description"
          content="A store to sell the bests products!"
        />

        <meta property="og:site_name" content="SellStore" />
        <meta property="og:title" content="SellStore" />
        <meta
          property="og:description"
          content="A store to sell the bests products!"
        />
        <meta property="og:image" content="/thumb.svg" />
        <meta property="og:image:type" content="image/svg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:image" content="/thumb.svg" />
        <meta name="twiiter:image:alt" content="Thumbnail" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SellStore" />
        <meta
          name="twitter:description"
          content="A store to sell the bests products!"
        />
        <meta name="twiiter:create" content="SellStore" />
      </Head>
    </>
  )
}
