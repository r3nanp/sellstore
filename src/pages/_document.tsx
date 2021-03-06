import Document, { Head, Html, Main, NextScript } from 'next/document'
import { ReactElement } from 'react'

export default class MyDocument extends Document {
  render(): ReactElement {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=Roboto&family=Roboto+Mono:wght@400;500&display=swap"
            rel="stylesheet"
          />
          <script
            crossOrigin="anonymous"
            src="https://polyfill.io/v3/polyfill.min.js"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
