import { useContext } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContextProvider";

const HomePage = () => {
	const themeContextfromUseContext = useContext(ThemeContext)

	if(!themeContextfromUseContext){
		throw new Error("Trying to use ThemeContext outside of ThemeContextProvider.");
	}

	return (
		<>
			<h1>Welcome to Hacker News 🕵🏻‍♂️🤓👀! </h1>

			{themeContextfromUseContext.isDarkMode ? <p>Is dark</p> : <p>Is Light</p>}

			<Button className="me-2"onClick={themeContextfromUseContext.toggleTheme}>
				Switch theme
			</Button>

			<Link to="/search">
				<Button variant="primary">Use the Search, you must!</Button>
			</Link>
		</>
	);
};

export default HomePage;
