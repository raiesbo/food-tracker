import { OrderPayload } from "./OrderContext";

export const OrderAction = {
    ADD_ONE_TO_ORDER: "ADD_ONE_TO_ORDER",
    REMOVE_ONE_FROM_ORDER: "REMOVE_ONE_FROM_ORDER",
    REMOVE_ORDER: "REMOVE_ORDER",
    CLEAR_ORDER: "CLEAR_ORDER"
};

export default function orderReducer(state: any, action: { type: string, payload: OrderPayload }) {
    const { type, payload } = action;

    switch (type) {
        case OrderAction.ADD_ONE_TO_ORDER:
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
        case OrderAction.REMOVE_ONE_FROM_ORDER:
            return {
                ...state,
                [payload.restaurantId]: [ ...state[payload.restaurantId].map((dish: { id: number, units: number }) => (
                    dish.id === payload.dishId && dish.units > 0
                        ? { id: dish.id, units: dish.units ? --dish.units : 1 }
                        : dish
                )) ]
            };
        case OrderAction.REMOVE_ORDER:
            return {
                ...state,
                [payload.restaurantId]: [ ...state[payload.restaurantId].filter((dish: { id: number, units: number }) => (
                    dish.id !== payload.dishId
                )) ]
            };
        case OrderAction.CLEAR_ORDER:
            return {};
        default:
            throw new Error(`No case for type ${type} found in toastReducer.`);
    }
}
