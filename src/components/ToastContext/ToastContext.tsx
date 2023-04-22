import { AlertColor } from "@mui/material";
import { createContext, ReactNode, useReducer } from "react";
import toastReducer from "./toastReducer";

type ContextResult = {
    isOpen?: boolean | undefined;
    severity?: AlertColor | undefined;
    message?: string | undefined;
}

const initialState: ContextResult = {
    isOpen: false,
    severity: 'info',
    message: ''
};

export const ToastContext = createContext({
    toastState: initialState,
    dispatch: ({ }: { type: string, payload: Partial<ContextResult> }) => { }
});

type Props = {
    children: ReactNode
}

export default function ToastProvider({ children }: Props) {
    const [ state, dispatch ] = useReducer(toastReducer, initialState);

    return (
        <ToastContext.Provider value={{ toastState: state, dispatch }}>
            {children}
        </ToastContext.Provider>
    );
};
