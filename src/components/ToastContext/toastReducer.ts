import { AlertColor } from "@mui/material";

export enum ToastAction {
    UPDATE_TOAST = 'UPDATE_TOAST',
    RESET_TOAST = 'RESET_TOAST'
}

type ToastType = {
    isOpen?: boolean,
    severity?: AlertColor,
    message?: string
}

export default function toastReducer(state: any, action: { type: string; payload: ToastType; }) {
    const { type, payload } = action;

    switch (type) {
        case ToastAction.UPDATE_TOAST:
            return { ...state, isOpen: true, ...payload };
        case ToastAction.RESET_TOAST:
            return { ...state, isOpen: false };
        default:
            throw new Error(`No case for type ${type} found in toastReducer.`);
    }
}
