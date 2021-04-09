import { ReactElement } from 'react'
import { Header } from '@components/Header/Header'
import { SEO } from '@components/SEO'

export default function Home(): ReactElement {
  return (
    <>
      <SEO title="SellStore | HomePage" />

      <Header />
    </>
  )
}
