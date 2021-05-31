import { ReactElement, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useCart } from 'hooks/useCart'
import { useAuth } from 'hooks/useAuth'

import { UserAvatar } from '@components/UserAvatar'
import Bag from '@components/icons/Bag'
import Heart from '@components/icons/Heart'
import { AiOutlineSearch } from 'react-icons/ai'

export function Header(): ReactElement {
  const { user } = useAuth()
  const { openModal } = useCart()

  const router = useRouter()

  useEffect(() => {
    router.prefetch('/search')
  }, [router])

  return (
    <header className="w-full flex items-center justify-between py-6 px-4 bg-accents-1">
      <div className="flex flex-1 items-center">
        <Link href="/">
          <a className="font-bold text-2xl font-sans">SellStore</a>
        </Link>
        <nav className="hidden ml-6 space-x-4 lg:block">
          <Link href="/">
            <a className="text-gray-400 text-md hover:text-gray-500">All</a>
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
            className="bg-transparent rounded-md appearance-none border border-black flex items-center w-full px-4 py-2 focus:outline-none"
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
          <button
            onClick={openModal}
            className="cursor-pointer hover:text-gray-500 transition ease-in-out duration-150 mr-6"
          >
            <Bag />
          </button>

          <Link href="/wishlist">
            <a className="cursor-pointer hover:text-gray-500 transition ease-in-out duration-150 mr-6">
              <Heart />
            </a>
          </Link>

          <div className="space-y-3">
            <UserAvatar {...user} />
          </div>
        </nav>
      </div>
    </header>
  )
}
