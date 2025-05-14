import type { AppProps } from 'next/app';
import { Providers } from '../providers';
import { ErrorBoundary } from '../components/common/ErrorBoundary';
import { Notification } from '../components/common/Notification';
import '../styles/globals.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Providers>
        <Notification />
        <Component {...pageProps} />
      </Providers>
    </ErrorBoundary>
  );
}

export default App; 