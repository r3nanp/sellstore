import { ReactElement } from 'react'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { api } from 'services/api'

import { Header } from '@components/Header'
import { SEO } from '@components/SEO'
import { Button } from '@components/Button'

type IProduct = {
  id: string
  name: string
  quantity: number
  price: number
}

export default function Slug({
  product
}: InferGetStaticPropsType<typeof getStaticProps>): ReactElement {
  const { isFallback } = useRouter()

  if (isFallback) {
    return <p>Loading...</p>
  }

  return (
    <>
      <SEO title={`SellStore | ${product.name}`} />

      <Header />
      <main>
        <section className="flex flex-col justify-center overflow-hidden items-center w-full h-screen md:grid md:grid-cols-2 md:grid-rows-1">
          <div className="w-full h-full bg-purple-500">
            <img src="/vercel.svg" alt={product.name} />
          </div>

          <div className="w-full h-full">
            <div className="h-full flex flex-col justify-center mt-6 px-8">
              <div>
                <h2 className="font-bold text-2xl">{product.name}</h2>
                <div className="pb-14 break-words w-full max-w-xl">
                  <p className="text-justify text-xl text-black leading-2 tracking-wide">
                    {product.quantity}
                  </p>
                </div>
                <span className="text-center font-bold text-xl">
                  {product.price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </span>
              </div>
              <div className="w-1/2">
                <Button type="button" onClick={() => console.log('click')}>
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params

  const { data } = await api.get(`/products/${id}`)

  const product = {
    id: data.id
  }

  return {
    props: {
      product
    },
    revalidate: 22400
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get('/products')

  const paths = data.map((path: IProduct) => {
    return {
      params: {
        id: path.id
      }
    }
  })

  return {
    paths,
    fallback: 'blocking'
  }
}
