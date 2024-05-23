import { createContext, useEffect, useState } from "react";

interface ThemeContextType {
	isDarkMode: boolean;
	toggleTheme: () => void;
}

// This creates the actual context and sets the context's default value
export const ThemeContext = createContext<ThemeContextType | null>(null);

interface ThemeContextProviderProps {
	children: React.ReactNode;
}

const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({ children }) => {
	const [isDarkMode, setIsDarkMode] = useState(() => {
		console.log("Getting hn_darkmode from localStorage...");
		const localStorage_hn_darkmode = window.localStorage.getItem("hn_darkmode");
		return localStorage_hn_darkmode === "true";
	});
	const toggleTheme = () => {
		setIsDarkMode(!isDarkMode);
	}

	useEffect(()=> {
		window.localStorage.setItem("hn_darkmode", JSON.stringify(isDarkMode))
	},[isDarkMode])




	return (
		<ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export default ThemeContextProvider;
