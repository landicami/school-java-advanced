import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";

const useAuth = () => {
	const authContext = useContext(AuthContext);
	if (!authContext) {
		throw new Error("Trying to use authContext outside of AuthContextProvider");
	}
	return authContext;
};

export default useAuth;
