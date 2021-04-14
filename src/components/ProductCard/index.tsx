import { ReactElement } from 'react'
import Link from 'next/link'
import { IProduct } from 'types/IProduct'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import Heart from '@components/Icons/Heart'

export function ProductCard({
  id,
  name,
  price,
  quantity
}: IProduct): ReactElement {
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
            <button className="text-pink-500 hover:text-pink-600 p-2 rounded-full">
              <Heart className="w-6 h-6" />
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
              <svg viewBox="0 0 24 24" className="inline w-4 h-4">
                <path
                  fill="currentColor"
                  d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"
                />
              </svg>{' '}
              Details
            </button>
          </div>
          <div>
            <Link href={`product/${id}`}>
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
