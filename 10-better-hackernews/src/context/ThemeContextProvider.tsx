import { createContext, useState } from "react";

// This creates the actual context and sets the context's default value
export const ThemeContext = createContext({ theme: "light" });

interface ThemeContextProviderProps {
	children: React.ReactNode
}

const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({ children }) => {
	const [theme, setTheme] = useState("light")
	return (
		<ThemeContext.Provider value={ {theme} }>
			{children}
		</ThemeContext.Provider>
		)
}

export default ThemeContextProvider;
