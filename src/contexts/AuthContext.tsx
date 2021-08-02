/* eslint-disable @typescript-eslint/ban-types */ // using object type to make the UI agnostic
import Router from 'next/router'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { setCookie, destroyCookie, parseCookies } from 'nookies'
import { api } from 'services/api'
import { useToggle } from 'hooks/useToggle'
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
  isModalFormOpen: boolean
  user: object | null
  showForm: () => void
  hideForm: () => void
  signOut: () => void
  signIn: (props: SignInData) => Promise<void>
  createAccount: (props: CreateUserProps) => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<object | null>(null)
  const [isModalFormOpen, toggleModalForm] = useToggle(false)

  useEffect(() => {
    const { 'sellstore.token': token } = parseCookies()

    if (token) {
      recoverUserInformation(token).then(response => setUser(response.user))
    }
  }, [])

  const showForm = () => toggleModalForm()

  const hideForm = () => toggleModalForm()

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
        isModalFormOpen,
        createAccount,
        signIn,
        signOut,
        showForm,
        hideForm
      }}
    >
      {children}
      {isModalFormOpen && <FormModal />}
    </AuthContext.Provider>
  )
}
