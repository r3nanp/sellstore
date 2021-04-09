import { useContext } from 'react'
import { CartContext, CartContextData } from 'contexts/CartContext'

export function useCart(): CartContextData {
  const cart = useContext(CartContext)

  return cart
}
