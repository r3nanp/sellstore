import { ReactElement } from 'react'
import { AppProps } from 'next/app'
import { CartProvider } from 'contexts/CartContext'
import '@styles/tailwind.css'

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  )
}

export default MyApp
