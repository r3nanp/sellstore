import { render } from '@testing-library/react'
import Home from '@pages/index'

test('Home page should render', () => {
  const app = render(<Home />)
})
