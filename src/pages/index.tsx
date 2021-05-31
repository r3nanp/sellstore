import { ReactElement } from 'react'
import { GetStaticProps } from 'next'
import { api } from 'services/api'

import { Header } from '@components/Header'
import { ProductCard } from '@components/ProductCard'
import { SEO } from '@components/SEO'

type IProduct = {
  id: string
  name: string
  quantity: number
  price: number
}

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
  const { data } = await api.get('/products')

  return {
    props: {
      products: data
    },
    revalidate: 60 * 60 * 24
  }
}
