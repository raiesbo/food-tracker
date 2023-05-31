import { useToast } from "@/utils";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { ReactNode, useState } from "react";
import { AppBar } from "../AppBar";
import { Footer } from "../Footer";
import { SideBar } from "../SideBar";
import { ToastAction } from "../ToastContext";
import styles from './LayoutWithSideBar.module.scss';
import cc from 'classcat';
import Head from "next/head";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

type Props = {
	children: ReactNode,
	mainClassName?: string
}

export default function LayoutWithSideBar({ children, mainClassName }: Props) {
	const { toastState, dispatch } = useToast();
	const [count, setCount] = useState(0);
	const [firstCount, setFirstCount] = useState(false);

	const onCloseToast = () => {
		dispatch({ type: ToastAction.RESET_TOAST, payload: {} });
	};

	const socketInitializer = async (userId: string) => {
		await fetch(`/api/users/${userId}/orders/count-socket`);

		socket = io();
		socket.on("count-update", setCount);

		if (!firstCount) {
			socket.emit('count');
			setFirstCount(true);
		}
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
				<AppBar withBackground withFullNavigation initSocket={socketInitializer} count={count}/>
			</header>
			<aside>
				<SideBar initSocket={socketInitializer} count={count}/>
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
