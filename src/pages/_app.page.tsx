import { OrderContext } from '@/components/OrderContext';
import { ToastContext } from '@/components/ToastContext';
import '@/styles/globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { SWRConfig } from "swr";

const theme = createTheme();

export type NextPageWithLayout<
	P = Record<string, unknown>,
	IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? ((page) => page);

	return (
		<ThemeProvider theme={theme}>
			<SWRConfig value={{ revalidateOnMount: false }}>
				<UserProvider>
					<OrderContext>
						<ToastContext>
							{getLayout(<Component {...pageProps} />)}
						</ToastContext>
					</OrderContext>
				</UserProvider>
			</SWRConfig>
		</ThemeProvider>
	);
}
