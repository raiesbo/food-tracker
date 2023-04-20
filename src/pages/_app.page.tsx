import { Layout } from '@/components/Layout';
import '@/styles/globals.css';
import { ToastContext, useToast } from '@/utils';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';

const theme = createTheme();

export default function App({ Component, pageProps }: AppProps) {
  const { isOpen, message, severity, dispatch, handleClose } = useToast();

  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <ToastContext.Provider value={{
          toastContext: { isOpen, message, severity },
          dispatch,
          handleClose
        }}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ToastContext.Provider>
      </UserProvider>
    </ThemeProvider >
  );
}
