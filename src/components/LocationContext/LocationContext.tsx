import { createContext, ReactNode, useReducer } from "react";
import locationReducer, { LocationContextType } from "./locationReducer";

const initialState: LocationContextType = { lat: '', lon: '', zip: '', displayedPopup: false };

export const LocationContext = createContext({
	locationState: initialState,
	dispatch: ({}: { type: string, payload: Partial<LocationContextType> }) => {}
});

type Props = {
	children: ReactNode
}

export default function LocationProvider({ children }: Props) {
	const [state, dispatch] = useReducer(locationReducer, initialState);

	return (
		<LocationContext.Provider value={{ locationState: state, dispatch }}>
			{children}
		</LocationContext.Provider>
	);
};
