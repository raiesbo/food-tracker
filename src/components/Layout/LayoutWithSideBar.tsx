'use client';

import { useToast } from "@/utils";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { ReactNode } from "react";
import { AppBar } from "../AppBar";
import { Footer } from "../Footer";
import { SideBar } from "../SideBar";
import { ToastAction } from "../ToastContext";
import styles from './LayoutWithSideBar.module.scss';
import cc from 'classcat';
import Head from "next/head";

type Props = {
	children: ReactNode,
	mainClassName?: string
}

export default function LayoutWithSideBar({ children, mainClassName }: Props) {
	const { toastState, dispatch } = useToast();

	const onCloseToast = () => {
		dispatch({ type: ToastAction.RESET_TOAST, payload: {} });
	};

	return (
		<>
			<Head>
				<title>Food Tracker</title>
				<meta name="author" content="Raimon Espasa Bou"/>
				<meta name="description" content="Your free world wide Street Food finder tool"/>
				<meta name="keywords" content="Food Truck, food, city, UOC, TFM"/>
			</Head>
			<header>
				<AppBar withBackground withFullNavigation/>
			</header>
			<aside>
				<SideBar/>
			</aside>
			<main className={cc([styles.main, mainClassName])}>
				{children}
			</main>
			<Footer withSideBar/>
			<Snackbar
				open={toastState.isOpen}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				autoHideDuration={4000}
				onClose={onCloseToast}
				message={toastState.message}
			>
				<Alert
					onClose={onCloseToast}
					severity={toastState.severity}
					sx={{ width: '100%' }}
					variant="filled"
					elevation={5}
				>
					{toastState.message}
				</Alert>
			</Snackbar>
		</>
	);
}
