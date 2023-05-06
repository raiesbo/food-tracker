'use client';

import { ReactNode } from 'react';
import { AppBar } from "@/components/AppBar";
import { SideBar } from "@/components/SideBar";
import { Footer } from "@/components/Footer";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ToastContext } from "@/components/ToastContext";
import { OrderContext } from "@/components/OrderContext";

type Props = {
	children: ReactNode;
}

export default function Layout({ children }: Props) {
	return (
		<UserProvider>
			<OrderContext>
				<ToastContext>
					<header>
						<AppBar withBackground withFullNavigation/>
					</header>
					<aside>
						<SideBar/>
					</aside>
					{children}
					<Footer withSideBar/>
				</ToastContext>
			</OrderContext>
		</UserProvider>
	);
}
