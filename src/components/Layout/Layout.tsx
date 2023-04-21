import { ToastContext } from "@/utils";
import { Alert, Snackbar } from "@mui/material";
import { ReactNode, useContext } from "react";
import { Footer } from "../Footer";
import { NavigationMenu } from "../NavigationMenu";

type Props = {
    children: ReactNode
}

export default function Layout({ children }: Props) {
    const { toastContext, handleClose } = useContext(ToastContext);

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
                open={toastContext.isOpen}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                autoHideDuration={4000}
                onClose={handleClose}
                message={toastContext.message}
            >
                <Alert
                    onClose={handleClose}
                    severity={toastContext.severity}
                    sx={{ width: '100%' }}
                    variant="filled"
                    elevation={5}
                >
                    {toastContext.message}
                </Alert>
            </Snackbar>
        </>
    );
}
