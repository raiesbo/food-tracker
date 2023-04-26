import { useToast } from "@/utils";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import cc from 'classcat';
import { ReactNode } from "react";
import { AppBar } from "../AppBar";
import { Footer } from "../Footer";
import { ToastAction } from "../ToastContext";
import styles from './Layout.module.scss';

type Props = {
    children: ReactNode,
    withTopMargin?: boolean
}

export default function Layout({ children, withTopMargin = false }: Props) {
    const { toastState, dispatch } = useToast();

    const onCloseToast = () => {
        dispatch({ type: ToastAction.RESET_TOAST, payload: {} });
    };

    return (
        <>
            <header>
                <AppBar />
            </header>
            <main className={cc([
                styles.main,
                withTopMargin && styles.main_withTopMargin
            ])}>
                {children}
            </main>
            <Footer />
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
