import 'tailwindcss/tailwind.css'
import { Provider } from 'react-redux';
import store from '../app/redux/store';
import RouterGuard from '../components/RouterGuard';
import { DefaultOptions, QueryClient, QueryClientProvider } from 'react-query';

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

function MyApp({ Component, pageProps }) {
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

export default MyApp;
