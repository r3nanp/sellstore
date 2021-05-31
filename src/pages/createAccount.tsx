import { ReactElement, useCallback, useRef } from 'react'
import { Form } from '@unform/web'
import { FormHandles, SubmitHandler } from '@unform/core'
import { useRouter } from 'next/router'
import * as yup from 'yup'

import { useAuth } from 'hooks/useAuth'
import { SEO } from '@components/SEO'
import { Header } from '@components/Header'
import { Input } from '@components/Input'
import { Button } from '@components/Button'

interface SignProps {
  name: string
  email: string
  password: string
}

export default function CreateAccount(): ReactElement {
  const { createAccount } = useAuth()

  const formRef = useRef<FormHandles>(null)
  const router = useRouter()

  const handleSubmit: SubmitHandler<SignProps> = useCallback(
    async ({ email, name, password }, { reset }, event) => {
      try {
        formRef.current.setErrors({})

        const schema = yup.object().shape({
          name: yup.string().required(),
          email: yup.string().email().required(),
          password: yup.string().min(7).required()
        })

        await schema.validate(
          { email, name, password },
          {
            abortEarly: false
          }
        )

        event.preventDefault()
        reset()

        createAccount({
          email,
          name,
          password
        })
        router.push('/')
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
    [createAccount, router]
  )

  return (
    <>
      <SEO title="SellStore | Create account" />

      <Header />

      <main className="flex flex-col items-center justify-center h-screen overflow-hidden">
        <h2 className="text-left tracking-wide text-xl mb-8 px-6">
          Fill this form with your data, and buy the bests products!!
        </h2>

        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          className="bg-white w-full max-w-xs shadow-magical rounded p-4"
        >
          <Input id="name" name="name" type="text" label="Name" />

          <Input id="email" name="email" type="email" label="Email" />

          <Input
            id="password"
            name="password"
            type="password"
            label="Password"
          />
          <Button type="submit">Create Account</Button>
        </Form>
      </main>
    </>
  )
}
