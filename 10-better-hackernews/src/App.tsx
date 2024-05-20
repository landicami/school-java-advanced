import Container from "react-bootstrap/Container";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import SearchPage from "./pages/SearchPage";
import "./assets/scss/App.scss";
import useTheme from "./hooks/useTheme";

function App() {
	const { isDarkMode, toggleTheme } = useTheme();

	return (
		<div id="App"
		className={isDarkMode ? "bg-dark text-white" : "bg-white text-dark"}
		>
		<Navigation />

			<Container className="py-3">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/search" element={<SearchPage />} />

					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</Container>
		</div>
	)
}

export default App;
