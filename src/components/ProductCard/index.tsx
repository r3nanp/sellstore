import { ReactElement, useState } from 'react'
import Link from 'next/link'

import { AiOutlineShoppingCart } from 'react-icons/ai'
import Heart from '@components/icons/Heart'
import Eye from '@components/icons/Eye'

type IProduct = {
  id: string
  name: string
  quantity: number
  price: number
}

export function ProductCard({
  id,
  name,
  price,
  quantity
}: IProduct): ReactElement {
  const [click, setClick] = useState(false)

  return (
    <div className="w-full md:p-6">
      <div className="bg-white shadow-outline-normal hover:shadow-magical rounded-lg p-6">
        <div
          className="bg-gray-400 h-64 rounded-t-lg p-4 bg-no-repeat bg-center bg-cover"
          style={{
            backgroundImage: 'url(https://loremflickr.com/400/340/bread,book)'
          }}
        >
          <div className="text-right">
            <button
              onClick={() => setClick(true)}
              className="text-pink-500 hover:text-pink-600 p-2 rounded-full"
            >
              <Heart
                className={
                  click ? 'w-6 h-6 fill-current text-error' : 'w-6 h-6'
                }
              />
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-between items-start px-2 pt-2">
          <div className="p-2 flex-grow">
            <h1 className="font-medium text-xl font-mono">{name}</h1>
            <p className="text-gray-500 font-sans">{quantity}</p>
          </div>
          <div className="p-2 text-right">
            <div className="text-secondary font-semibold text-lg font-sans">
              {price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
            </div>
          </div>
        </div>
        <div className="w-full grid place-items-center grid-cols-2 grid-rows-1">
          <div className="w-full">
            <button className="inline p-4 text-sm text-secondary bg-blue-600 hover:bg-blue-700 border border-gray-400 hover:border-gray-500 rounded uppercase font-mono font-medium">
              <Eye className="w-4 h-4 inline mr-2" />
              Details
            </button>
          </div>
          <div>
            <Link href={`/product/${id}`}>
              <a className="p-4 w-full text-sm uppercase rounded text-secondary font-mono bg-black cursor-pointer border border-black transition hover:bg-white hover:text-primary">
                <AiOutlineShoppingCart className="w-4 h-4 inline mr-2" />
                Add to cart
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
