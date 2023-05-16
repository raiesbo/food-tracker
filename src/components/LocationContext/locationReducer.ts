export enum LocationAction {
    UPDATE_LOCATION = 'UPDATE_TOAST'
}

export type LocationContextType = {
    lat?: string,
    lon?: string,
    zip?: string,
    displayedPopup: boolean
}

export default function locationReducer(state: any, action: { type: string; payload: Partial<LocationContextType>; }) {
    const { type, payload } = action;

    switch (type) {
        case LocationAction.UPDATE_LOCATION:
            return { ...state, ...payload };
        default:
            throw new Error(`No case for type ${type} found in toastReducer.`);
    }
}
