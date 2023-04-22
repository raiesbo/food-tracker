import { createContext, ReactNode, useReducer } from "react";
import orderReducer from "./OrderReducer";

export type OrderResult = Array<{ id: number, units: number }>

const initialState: OrderResult = [ { id: 0, units: 0 } ];

export const OrderContext = createContext({
    state: initialState,
    dispatch: ({ }: { type: string, payload: OrderResult }) => { }
});

export default function OrderProvider({ children }: { children: ReactNode }) {
    const [ state, dispatch ] = useReducer(orderReducer, initialState);

    return (
        <OrderContext.Provider value={{ state, dispatch }}>
            {children}
        </OrderContext.Provider>
    );
}
