/* eslint-disable @typescript-eslint/ban-types */
import {
  createContext,
  ReactElement,
  ReactNode,
  useEffect,
  useState
} from 'react'
import { FormModal } from '@components/FormModal'
import { api } from 'services/api'
import Cookies from 'js-cookie'

interface UserProps {
  user: {
    name: string
    email: string
    avatar_url: string
  }
}

export interface AuthContextData {
  signed: boolean
  token: string | null
  user: UserProps | null
  showModalForm: boolean
  showForm: () => void
  hideForm: () => void
  signOut: () => void
  signIn: (data: unknown) => Promise<void>
  createAccount: (data: unknown) => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps): ReactElement {
  const [user, setUser] = useState<UserProps | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [showModalForm, setShowModalForm] = useState(false)

  useEffect(() => {
    Cookies.set('user', JSON.stringify(user))
    Cookies.set('token', token)
  }, [user, token])

  const showForm = () => setShowModalForm(true)

  const hideForm = () => setShowModalForm(false)

  async function createAccount(data: unknown): Promise<void> {
    await api.post('/users', data)

    hideForm()
  }

  async function signIn(data: unknown): Promise<void> {
    const response = await api.post('/sessions', data)

    api.defaults.headers.authorization = `Bearer ${response.data.token}`

    hideForm()

    setUser(response.data.user)
    setToken(response.data.token)
  }

  function signOut(): void {
    Cookies.remove('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        token,
        createAccount,
        user,
        signIn,
        signOut,
        showForm,
        hideForm,
        showModalForm
      }}
    >
      {children}
      {showModalForm && <FormModal />}
    </AuthContext.Provider>
  )
}
