import '../styles/globals.css';
import LayoutWithSideBar from "@/components/Layout/LayoutWithSideBar";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export const metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app'
};

type Props = {
	children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
	return (
		<html lang="en">
		<body>
		<UserProvider>
			<LayoutWithSideBar>
				{children}
			</LayoutWithSideBar>
		</UserProvider>
		</body>
		</html>
	);
}
