import { useToast } from "@/utils";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { ReactNode } from "react";
import { Footer } from "../Footer";
import { NavigationMenu } from "../NavigationMenu";
import { ToastAction } from "../ToastContext";

type Props = {
    children: ReactNode
}

export default function Layout({ children }: Props) {
    const { toastState, dispatch } = useToast();

    const onCloseToast = () => {
        dispatch({ type: ToastAction.RESET_TOAST, payload: {} });
    };

    return (
        <>
            <header>
                <NavigationMenu />
            </header>
            <main>
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
