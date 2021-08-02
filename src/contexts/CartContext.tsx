import { createContext, ReactNode } from 'react'
import { CartView } from '@components/Cart/CartView'
import { useToggle } from 'hooks/useToggle'

interface CartContextData {
  closeModal: () => void
  openModal: () => void
}

interface CartProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextData)

export function CartProvider({ children }: CartProps) {
  const [isModalCartOpen, toggleModalCartOpen] = useToggle(false)

  const closeModal = () => toggleModalCartOpen()

  const openModal = () => toggleModalCartOpen()

  return (
    <CartContext.Provider value={{ closeModal, openModal }}>
      {children}
      {isModalCartOpen && <CartView closeModal={closeModal} />}
    </CartContext.Provider>
  )
}
