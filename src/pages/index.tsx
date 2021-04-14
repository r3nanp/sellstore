import { ReactElement } from 'react'
import { GetStaticProps } from 'next'
import { api } from 'services/api'

import { Header } from '@components/Header/Header'
import { ProductCard } from '@components/ProductCard'
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

      <div className="grid place-items-center gap-4 grid-cols-1 grid-rows-1 md:grid-cols-3 md:grid-rows-1">
        {products.map((product, idx) => (
          <ProductCard key={idx} {...product} />
        ))}
      </div>
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
