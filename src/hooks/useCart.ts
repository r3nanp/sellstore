import { useContext } from 'react'
import { CartContext } from 'contexts/CartContext'

export function useCart() {
  const cart = useContext(CartContext)

  return cart
}
