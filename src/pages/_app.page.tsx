import { OrderContext } from '@/components/OrderContext';
import { ToastContext } from '@/components/ToastContext';
import '@/styles/globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';

const theme = createTheme();

export default function App({ Component, pageProps }: AppProps) {

	return (
		<ThemeProvider theme={theme}>
			<UserProvider>
				<OrderContext>
					<ToastContext>
						<Component {...pageProps} />
					</ToastContext>
				</OrderContext>
			</UserProvider>
		</ThemeProvider>
	);
}
