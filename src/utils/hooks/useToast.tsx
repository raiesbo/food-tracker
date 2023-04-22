import { useContext } from "react";
import { ToastContext } from "../../components/ToastContext/ToastContext";

export default function useToast() {
    const context = useContext(ToastContext);

    if (context === undefined) {
        throw new Error("useToast must be used within ToastContext");
    }

    return context;
}
