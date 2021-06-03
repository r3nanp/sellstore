import { createContext, ReactNode, useState } from 'react'
import { CartView } from '@components/Cart/CartView'

interface CartContextData {
  closeModal: () => void
  openModal: () => void
}

interface CartProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextData)

export function CartProvider({ children }: CartProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const closeModal = () => setIsModalOpen(false)

  const openModal = () => setIsModalOpen(true)

  return (
    <CartContext.Provider value={{ closeModal, openModal }}>
      {children}
      {isModalOpen && <CartView />}
    </CartContext.Provider>
  )
}
