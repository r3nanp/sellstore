import Bag from '@components/icons/Bag'
import Cross from '@components/icons/Cross'
import { useCart } from 'hooks/useCart'

export function CartView() {
  const { closeModal } = useCart()

  return (
    <div className="h-full flex flex-col text-base bg-accents-1 shadow-xl overflow-y-auto">
      <div className="h-full flex flex-col bg-secondary">
        <header className="px-4 pt-6 pb-4 sm:px-6">
          <div className="flex items-start justify-between space-x-3">
            <div className="h-7 flex items-center">
              <button
                onClick={closeModal}
                aria-label="Close panel"
                className="hover:text-gray-500 transition ease-in-out duration-150 cursor-pointer z-10"
              >
                <Cross className="h-6 w-6" />
              </button>
            </div>
          </div>
        </header>
        <div className="flex-1 h-full px-4 flex flex-col justify-center items-center relative z-10">
          <span className="border border-dashed border-primary rounded-full flex items-center justify-center w-16 h-16 p-12 bg-secondary text-secondary">
            <Bag className="absolute" />
          </span>
          <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
            Your cart is empty
          </h2>
          <p className="text-accents-3 px-10 text-center pt-2 font-mono">
            Go back to the store and explore the best products ever.
          </p>
        </div>
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-overlay" />
      </div>
    </div>
  )
}
