import { ReactElement, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { AiOutlineSearch } from 'react-icons/ai'
import Bag from '@components/Icons/Bag'
import { useCart } from 'hooks/useCart'

export function Header(): ReactElement {
  const { openModal } = useCart()

  const router = useRouter()

  useEffect(() => {
    router.prefetch('/search')
  }, [router])

  return (
    <header className="w-full sticky top-0 flex items-center justify-between py-6 px-4 bg-accents-1">
      <div className="flex flex-1 items-center">
        <h1 className="font-bold text-2xl">Shopping</h1>
        <nav className="hidden ml-6 space-x-4 lg:block">
          <Link href="/">
            <a className="text-gray-400 text-md">Todos</a>
          </Link>
        </nav>
      </div>

      <div className="hidden justify-center lg:flex">
        <div className="relative text-sm flex items-center justify-center w-full">
          <label htmlFor="search" className="hidden">
            Search
          </label>
          <input
            id="search"
            className="bg-transparent rounded appearance-none border border-black flex items-center w-full px-3 py-2"
            placeholder="Search for products"
            defaultValue={router.query.q}
            onKeyUp={(event) => {
              event.preventDefault()

              if (event.key === 'Enter') {
                const q = event.currentTarget.value

                router.push(
                  {
                    pathname: `/search`,
                    query: q ? { q } : {}
                  },
                  undefined,
                  { shallow: true }
                )
              }
            }}
          />
          <AiOutlineSearch
            size={25}
            className="flex items-center content-center justify-center absolute top-1 right-0"
          />
        </div>
      </div>

      <div className="flex flex-1 justify-end">
        <nav className="flex items-center">
          <button onClick={openModal} className="cursor-pointer">
            <Bag className="hover:text-gray-500 transition ease-in-out duration-150" />
          </button>
        </nav>
      </div>
    </header>
  )
}
