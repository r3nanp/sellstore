import { ReactElement } from 'react'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { api } from 'services/api'

import { Header } from '@components/Header/Header'
import { SEO } from '@components/SEO'
import { IProduct } from 'types/IProduct'

interface HomeProps {
  products: IProduct[]
}

export default function Home({ products }: HomeProps): ReactElement {
  return (
    <>
      <SEO title="SellStore | Homepage" />

      <Header />

      {products.map((product, idx) => (
        <div key={idx} className="">
          <Link href={`/product/${product.id}`}>
            <a>{product.name}</a>
          </Link>
        </div>
      ))}
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const request = await api.get('/products')
  const response = await request.data

  return {
    props: {
      products: response
    },
    revalidate: 60 * 60 * 4
  }
}
