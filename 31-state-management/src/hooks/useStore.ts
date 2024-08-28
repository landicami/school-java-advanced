import { useContext } from "react";
import { StoreContext } from "../contexts/StoreContextProvider";

const useStore = () => {
	const storeContext = useContext(StoreContext);
	if (!storeContext) {
		throw new Error("very wrong");
	}
	return storeContext;
};

export default useStore;
