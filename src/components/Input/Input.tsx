import { ReactElement, useRef, useEffect, InputHTMLAttributes } from 'react'
import { useField } from '@unform/core'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
}

export function Input({ name, ...rest }: InputProps): ReactElement {
  const inputRef = useRef<HTMLInputElement>(null)

  const {
    fieldName,
    registerField,
    error,
    defaultValue,
    clearError
  } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  return (
    <>
      <input
        className={
          error
            ? 'appearance-none focus:border-red-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border border-red-500'
            : 'appearance-none border focus:border-blue-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        }
        ref={inputRef}
        onFocus={clearError}
        defaultValue={defaultValue}
        {...rest}
      />

      {error && (
        <span className="font-sans text-error text-xs italic">{error}</span>
      )}
    </>
  )
}
