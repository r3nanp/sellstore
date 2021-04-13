import { render } from '@testing-library/react'
import { Header } from './Header'

test('Header should render, get the text and display', () => {
  const { getByText } = render(<Header />)

  expect(getByText('SellStore')).toBeTruthy()
})
