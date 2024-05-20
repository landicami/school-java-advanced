import Container from "react-bootstrap/Container";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import SearchPage from "./pages/SearchPage";
import "./assets/scss/App.scss";
import useTheme from "./hooks/useTheme";

import clsx from "clsx";
import RandomDogPage from "./pages/RandomDogPage";

function App() {
	const { isDarkMode } = useTheme();
	const cssClasses = clsx({
		"bg-white": !isDarkMode,
		"text-dark": !isDarkMode,
		"bg-success": isDarkMode,
		"text-warning": isDarkMode
	});

	return (
		<div id="App"
		className={cssClasses}
		// className={isDarkMode ? "bg-dark text-white" : "bg-white text-dark"}
		>
		<Navigation />

			<Container className="py-3">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/search" element={<SearchPage />} />
					<Route path="/randomdog" element={<RandomDogPage />} />

					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</Container>
		</div>
	)
}

export default App;
