import { useContext } from "react";
import { ToastContext } from "../../components/ToastContext/ToastContext";

export default function useToast() {
    const context = useContext(ToastContext);

    if (context === undefined) {
        throw new Error("useShop must be used within ShopContext");
    }

    return context;
}
