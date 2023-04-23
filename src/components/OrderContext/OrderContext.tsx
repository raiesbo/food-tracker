import { createContext, ReactNode, useReducer } from "react";
import orderReducer from "./OrderReducer";

export type OrderPayload = {
    restaurantId: number, dishId?: number
}

export type OrderResult = {
    [restaurantId: string]: Array<{ id: number, units: number }>
}

const initialState: OrderResult = {};

export const OrderContext = createContext({
    state: initialState,
    dispatch: ({ }: { type: string, payload: OrderPayload }) => { }
});

export default function OrderProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(orderReducer, initialState);

    return (
        <OrderContext.Provider value={{ state, dispatch }}>
            {children}
        </OrderContext.Provider>
    );
}
