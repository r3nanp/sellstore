import { ReactElement } from 'react'
import { AppProps } from 'next/app'
import { CartProvider } from 'contexts/CartContext'
import { AuthProvider } from 'contexts/AuthContext'
import '@styles/tailwind.css'

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <AuthProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </AuthProvider>
  )
}

export default MyApp
