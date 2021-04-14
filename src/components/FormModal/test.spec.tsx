import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

it('should open/close form modal', () => {
  const form = screen.getByRole('form')

  expect(form).toHaveStyle({ opacity: 0 })
  expect(form).toHaveAttribute('ref')
})

it('should open/close when clicking on overlay', () => {
  const form = screen.getByRole('form')
  const overlay = form.nextElementSibling

  expect(overlay).toHaveStyle({ opacity: 0 })
  expect(overlay).toHaveAttribute('aria-hidden', 'true')

  userEvent.click(overlay)

  expect(overlay).toHaveStyle({ opacity: 1 })
  expect(overlay).toHaveAttribute('aria-hidden', 'false')
})
