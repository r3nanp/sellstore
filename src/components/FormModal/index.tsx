import { ReactElement, useCallback, useRef } from 'react'
import Link from 'next/link'
import { FormHandles, SubmitHandler } from '@unform/core'
import { Form } from '@unform/web'
import * as yup from 'yup'

import { useAuth } from 'hooks/useAuth'
import { useClickOutside } from 'hooks/useClickOutside'
import { Input } from '@components/Input'
import Cross from '@components/icons/Cross'

interface FormProps {
  email: string
  password: string
}

export function FormModal(): ReactElement {
  const { signIn, hideForm, showModalForm } = useAuth()

  const formRef = useRef<FormHandles>(null)
  const divRef = useRef<HTMLDivElement>(null)
  useClickOutside(divRef, hideForm)

  const handleSubmit: SubmitHandler<FormProps> = useCallback(
    async (data, { reset }, event) => {
      try {
        formRef.current.setErrors({})

        const schema = yup.object().shape({
          email: yup.string().email().required(),
          password: yup.string().min(7).required()
        })

        await schema.validate(data, {
          abortEarly: false
        })

        event.preventDefault()

        await signIn(data)

        reset()
      } catch (error) {
        const validationErrors = {}
        if (error instanceof yup.ValidationError) {
          error.inner.forEach((error) => {
            validationErrors[error.path] = error.message
          })
          formRef.current.setErrors(validationErrors)
        }
      }
    },
    [signIn]
  )

  return (
    <div
      className="top-0 left-0 right-0 bottom-0 bg-overlay overflow-hidden flex items-center justify-center fixed z-5"
      aria-hidden={!showModalForm}
    >
      <div
        ref={divRef}
        className="flex flex-col items-center justify-center max-w-sm"
      >
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          className="bg-white shadow-magical rounded px-8 pt-6 pb-8 mb-4 w-full relative z-50"
        >
          <button
            type="button"
            className="absolute right-2 top-2 border-none bg-transparent"
            onClick={hideForm}
            aria-hidden={!showModalForm}
          >
            <Cross className="h-4 w-4" />
          </button>
          <div className="mb-4">
            <Input
              id="email"
              label="Email"
              name="email"
              className="appearance-none border focus:border-blue-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="example@example.com"
            />
          </div>
          <div className="mb-6">
            <Input
              label="Password"
              name="password"
              className="appearance-none border focus:border-blue-700 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 text-secondary hover:bg-blue-700 font-mono shadow-outline-normal py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-transform"
              type="submit"
            >
              Log In
            </button>
            <Link href="/createAccount">
              <a
                onClick={hideForm}
                className="ml-2 bg-blue-500 bg-opacity-60 hover:bg-blue-700 hover:bg-opacity-60 text-secondary shadow-md font-mono py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-transform"
              >
                Create Account
              </a>
            </Link>
          </div>
          <Link href="/forgot">
            <a
              onClick={hideForm}
              className="mt-6 flex items-center justify-center align-baseline font-mono text-sm text-blue-500 hover:text-blue-800 hover:underline"
            >
              Forgot Password?
            </a>
          </Link>
        </Form>
      </div>
    </div>
  )
}
