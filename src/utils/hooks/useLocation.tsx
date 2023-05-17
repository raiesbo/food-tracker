import { useContext } from "react";
import { LocationContext } from "../../components/LocationContext/LocationContext";

export default function useLocation() {
    const context = useContext(LocationContext);

    if (context === undefined) {
        throw new Error("useLocation must be used within LocationContext");
    }

    return context;
}
