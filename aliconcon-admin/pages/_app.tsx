import type { AppProps } from 'next/app';
import { DefaultOptions, QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import store from '../app/redux/store';
import RouterGuard from '../containers/RouterGuard';
import '../assets/styles/tachyons.min.css';

const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
    onError: (error) => {
      console.log(error);
    },
  },
  mutations: {
    onError: (error) => {
      console.log(error);
    },
  },
};

const queryClient = new QueryClient({ defaultOptions: queryConfig });
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterGuard>
          <Component {...pageProps} />
        </RouterGuard>
      </QueryClientProvider>
    </Provider>
  );
}
