import { ReactElement, createContext, ReactNode, useState } from 'react'
import { CartView } from '@components/Cart/CartView'

export interface CartContextData {
  closeModal: () => void
  openModal: () => void
}

interface CartProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextData)

export function CartProvider({ children }: CartProps): ReactElement {
  const [isModalOpen, setIsModalOpen] = useState(false)

  function closeModal() {
    setIsModalOpen(false)
  }

  function openModal() {
    setIsModalOpen(true)
  }

  return (
    <CartContext.Provider value={{ closeModal, openModal }}>
      {isModalOpen && <CartView />}
      {children}
    </CartContext.Provider>
  )
}
