import { api } from './api'

type SignInRequestProps = {
  email: string
  password: string
}

export async function signInRequest({ email, password }: SignInRequestProps) {
  const { data } = await api.post('/sessions', { email, password })

  return {
    token: data.token,
    user: data.user
  }
}

export async function recoverUserInformation(token: string) {
  const { data } = await api.post('/users', { token })

  return {
    user: data.user
  }
}
