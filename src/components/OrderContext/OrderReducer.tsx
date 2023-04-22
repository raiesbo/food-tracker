import { OrderResult } from "./OrderContext";

export const OrderAction = {
    ADD_TO_ORDER: "ADD_TO_ORDER",
    REMOVE_FROM_ORDER: "ADD_TO_ORDER",
    CLEAR_ORDER: "CLEAR_ORDER"
};

export default function orderReducer(state: any, action: { type: string, payload: OrderResult }) {
    const { type, payload } = action;

    switch (type) {
        case OrderAction.ADD_TO_ORDER:
            return { ...state };
        case OrderAction.ADD_TO_ORDER:
            return { ...state };
        case OrderAction.ADD_TO_ORDER:
            return { ...state };
        default:
            throw new Error(`No case for type ${type} found in toastReducer.`);
    }
}
