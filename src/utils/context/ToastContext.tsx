import { AlertColor } from "@mui/material";
import { createContext } from "react";

export const defaultToastContext: {
    isOpen: boolean,
    severity: AlertColor,
    message: string
} = {
    isOpen: false,
    severity: 'info',
    message: ''
};

const ToastContext = createContext({
    toastContext: defaultToastContext,
    dispatch: (message: string, severity: AlertColor = 'info') => { },
    handleClose: () => { }
});

export default ToastContext;
