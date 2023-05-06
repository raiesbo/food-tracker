import '../styles/globals.css';
import type { Metadata } from "next";
import { Layout } from "@/components/RSCLayout";

export const metadata: Metadata = {
	title: 'Food Tracker',
	description: 'Generated by create next app',
	keywords: 'Food Truck, food, city, UOC, TFM'
};

type Props = {
	children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
	return (
		<html lang="en">
		<body>
		<Layout>
			{children}
		</Layout>
		</body>
		</html>
	);
}
