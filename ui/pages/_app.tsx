import Axios from 'axios';
import { SWRConfig } from 'swr';
import { AppProps } from 'next/app';

import { ConfirmationServiceProvider } from '../components/ConfirmationService';

import '../styles/globals.css';
import '../providers/auth';

export default function App({ Component, pageProps }: AppProps & { messages: any }) {
  if ((Component as any).plain) {
    return <Component {...pageProps} />;
  }

  return (
    <SWRConfig
      value={{
        fetcher: (resource) => Axios.get(resource).then((r) => r.data),
      }}
    >
      <ConfirmationServiceProvider>
        <Component {...pageProps} />
      </ConfirmationServiceProvider>
    </SWRConfig>
  );
}
