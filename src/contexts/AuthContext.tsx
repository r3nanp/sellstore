/* eslint-disable @typescript-eslint/ban-types */ // using object type to make the UI agnostic

import { createContext, ReactNode, useEffect, useState } from 'react'
import { setCookie, destroyCookie, parseCookies } from 'nookies'
import Router from 'next/router'
import { api } from 'services/api'
import { recoverUserInformation, signInRequest } from 'services/auth'

import { FormModal } from '@components/FormModal'

type CreateUserProps = {
  name: string
  email: string
  password: string
}

type SignInData = Omit<CreateUserProps, 'name'> // omit the name parameter

export interface AuthContextData {
  signed: boolean
  showModalForm: boolean
  user: object | null
  showForm: () => void
  hideForm: () => void
  signOut: () => void
  signIn: ({ email, password }: SignInData) => Promise<void>
  createAccount: ({ name, email, password }: CreateUserProps) => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<object | null>(null)
  const [showModalForm, setShowModalForm] = useState(false)

  useEffect(() => {
    const { 'sellstore.token': token } = parseCookies()

    if (token) {
      recoverUserInformation(token).then(response => setUser(response.user))
    }
  }, [])

  const showForm = () => setShowModalForm(true)

  const hideForm = () => setShowModalForm(false)

  async function createAccount({ name, email, password }: CreateUserProps) {
    await api.post('/users', { name, email, password })

    Router.push('/')
  }

  async function signIn({ email, password }: SignInData) {
    const { token, user } = await signInRequest({ email, password })

    api.defaults.headers.Authorization = `Bearer ${token}`

    setCookie(undefined, 'sellstore.token', token, {
      maxAge: 60 * 60 * 24 // 1 day
    })

    setUser(user)

    hideForm()
  }

  function signOut() {
    destroyCookie(undefined, 'sellstore.token')
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        showModalForm,
        createAccount,
        signIn,
        signOut,
        showForm,
        hideForm
      }}
    >
      {children}
      {showModalForm && <FormModal />}
    </AuthContext.Provider>
  )
}
