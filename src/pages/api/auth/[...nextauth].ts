import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { NextAuthOptions } from 'next-auth'

const options: NextAuthOptions = {}

export default (
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> => {
  return NextAuth(request, response, options)
}
