import { registerServiceWorker } from '@/pushNotifications'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

registerServiceWorker()

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}


