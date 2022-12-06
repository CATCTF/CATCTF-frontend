import '../styles/_globals.scss'
import type { AppProps } from 'next/app'
import Header from '../components/Header'
import Meta from '../components/Meta'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Meta />
      <Header />
      <Component {...pageProps} />
    </>
  )
}
