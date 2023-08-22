import '@/styles/globals.css';
import {SessionProvider} from 'next-auth/react';
import { FacepalContext } from '@/settings/globals';

export default function App({ Component,Session, ...pageProps }) {
  return (
    <SessionProvider session={Session}>
      <FacepalContext>
        <Component {...pageProps} />
      </FacepalContext>
    </SessionProvider>
  )
}