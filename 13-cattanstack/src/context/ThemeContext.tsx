import { createContext, useState } from "react";

interface ThemeContextType {
	isDarkMode: boolean;
	toggleTheme?: () => void;
}

// This creates the actual context and sets the context's default value
export const ThemeContext = createContext<ThemeContextType | null>(null);
	// { isDarkMode: true, toggleTheme: () => {}}
interface ThemeContextProviderProps {
	children: React.ReactNode
}

const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({ children }) => {
	const [isDarkMode, setIsDarkMode] = useState(true)

	const toggleTheme = () => {
		setIsDarkMode(!isDarkMode)
		console.log("Changed theme")
	};

	return (
		<ThemeContext.Provider value={ {isDarkMode, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
		)
}

export default ThemeContextProvider;
