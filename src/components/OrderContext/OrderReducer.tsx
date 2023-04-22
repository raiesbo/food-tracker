import { OrderPayload } from "./OrderContext";

export const OrderAction = {
    ADD_TO_ORDER: "ADD_TO_ORDER",
    REMOVE_FROM_ORDER: "ADD_TO_ORDER",
    CLEAR_ORDER: "CLEAR_ORDER"
};

export default function orderReducer(state: any, action: { type: string, payload: OrderPayload }) {
    const { type, payload } = action;

    switch (type) {
        case OrderAction.ADD_TO_ORDER:
            return {
                ...state,
                [payload.restaurantId]: !state[payload.restaurantId]
                    ? [ { id: payload.dishId, units: 1 } ]
                    : state[payload.restaurantId].some((dish: { id: number }) => dish.id === payload.dishId)
                        ? [ ...state[payload.restaurantId].map((dish: { id: number, units: number }) => (
                            dish.id === payload.dishId
                                ? { id: dish.id, units: dish.units ? ++dish.units : 1 }
                                : dish
                        )) ]
                        : [ ...state[payload.restaurantId], { id: payload.dishId, units: 1 } ]
            };
        case OrderAction.REMOVE_FROM_ORDER:
            return {
                ...state,
                [payload.restaurantId]: --state[payload.restaurantId]
            };
        case OrderAction.CLEAR_ORDER:
            return {
                ...state,
                [payload.restaurantId]: 0
            };
        default:
            throw new Error(`No case for type ${type} found in toastReducer.`);
    }
}
