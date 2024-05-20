import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContextProvider";

const useTheme = () => {
	const themeContext = useContext(ThemeContext)

	if(!themeContext){
		throw new Error("Thats not working outside context")
	}

	return themeContext;

}

export default useTheme



