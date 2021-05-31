/* eslint-disable @typescript-eslint/ban-types */ // using object type to make the UI agnostic
import {
  createContext,
  ReactElement,
  ReactNode,
  useEffect,
  useState
} from 'react'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { FormModal } from '@components/FormModal'
import { setCookie, destroyCookie } from 'nookies'
import { api } from 'services/api'

type CreateUserProps = {
  name: string
  email: string
  password: string
}

type SignInData = Omit<CreateUserProps, 'name'>

export interface AuthContextData {
  signed: boolean
  showModalForm: boolean
  token: string | null
  user: object | null
  showForm: () => void
  hideForm: () => void
  signIn: ({ email, password }: SignInData) => Promise<void>
  createAccount: ({ name, email, password }: CreateUserProps) => Promise<void>
  signOut: (ctx: GetServerSidePropsContext) => void
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps): ReactElement {
  const [user, setUser] = useState<object | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [showModalForm, setShowModalForm] = useState(false)

  const router = useRouter()

  useEffect(() => {
    setCookie(undefined, 'user', JSON.stringify(user))
    setCookie(undefined, 'token', token)
  }, [user, token])

  const showForm = () => setShowModalForm(true)

  const hideForm = () => setShowModalForm(false)

  async function createAccount({
    name,
    email,
    password
  }: CreateUserProps): Promise<void> {
    await api.post('/users', { name, email, password })

    router.push('/')
  }

  async function signIn({ email, password }: SignInData): Promise<void> {
    const { data: response } = await api.post('/sessions', {
      name,
      email,
      password
    })

    api.defaults.headers.Authorization = `Bearer ${response.token}`

    hideForm()

    setUser(response.user)
    setToken(response.token)
  }

  function signOut(ctx: GetServerSidePropsContext): void {
    destroyCookie(ctx, 'user')
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        token,
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
