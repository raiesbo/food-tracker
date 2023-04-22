import { OrderContext } from "@/components/OrderContext/OrderContext";
import { useContext } from "react";

export default function useOrder() {
    const context = useContext(OrderContext);

    if (context === undefined) {
        throw new Error("useOrder must be used within OrderContext");
    }

    return context;
}
