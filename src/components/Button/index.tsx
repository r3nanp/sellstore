import { ReactElement, ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export function Button({ children, ...rest }: ButtonProps): ReactElement {
  return (
    <>
      <button
        {...rest}
        className="w-full p-4 mt-6 shadow-outline-normal uppercase rounded text-secondary font-mono font-bold bg-black cursor-pointer border border-black transition hover:bg-white hover:text-primary"
      >
        {children}
      </button>
    </>
  )
}
