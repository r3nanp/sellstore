import { ReactElement, useCallback, useRef } from 'react'
import { GetServerSideProps } from 'next'
import { FormHandles, SubmitHandler } from '@unform/core'
import { Form } from '@unform/web'
import * as yup from 'yup'

import { api } from 'services/api'
import { SEO } from '@components/SEO'
import { Header } from '@components/Header'
import { Button } from '@components/Button'
import { ImageInput } from '@components/ImageInput'
import { parseCookies } from 'nookies'

interface UserProps {
  profile: {
    name: string
    email: string
    avatar_url: string
  }
}

interface ImageProps {
  name: string
}

export default function Profile({ profile }: UserProps): ReactElement {
  const formRef = useRef<FormHandles>(null)

  const handleSubmit: SubmitHandler<ImageProps> = useCallback(
    async ({ name }, { reset }, event) => {
      try {
        formRef.current.setErrors({})

        const schema = yup.object().shape({
          name: yup.string().required()
        })

        await schema.validate(
          { name },
          {
            abortEarly: false
          }
        )

        event.preventDefault()
        reset()

        await api.patch('/profile', { name })
      } catch (error) {
        const validationErrors = {}
        if (error instanceof yup.ValidationError) {
          error.inner.forEach(error => {
            validationErrors[error.path] = error.message
          })
          formRef.current.setErrors(validationErrors)
        }
      }
    },
    []
  )

  return (
    <>
      <SEO title="SellStore | Profile" />

      <Header />

      <main>
        <div className="grid grid-cols-1 grid-rows-1 md:grid-cols-2">
          <div className="flex flex-col items-center bg-accents-1 w-full h-full bg-white border-r border-black">
            <img
              src={profile.avatar_url}
              alt={profile.name}
              className="w-20 h-20 rounded-full object-cover border-black border-2 focus:border-blue-700"
            />

            <Form ref={formRef} onSubmit={handleSubmit}>
              <ImageInput id="image" name="image" />
              <Button type="submit">Change profile image</Button>
            </Form>
          </div>
        </div>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { 'sellstore.token': token } = parseCookies(context)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
