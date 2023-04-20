import { AlertColor } from "@mui/material";
import { useState } from "react";

export default function useToast() {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ message, setMessage ] = useState('');
    const [ severity, setSeverity ] = useState<AlertColor>('info');

    const handleClose = () => {
        setIsOpen(false);
    };

    const dispatch = (newMessage: string, severity: AlertColor = 'info') => {
        setIsOpen(true);
        setMessage(newMessage);
        setSeverity(severity);
    };

    return {
        isOpen,
        message,
        severity,
        handleClose,
        dispatch
    };
}
