import { Container } from "react-bootstrap";
import "./assets/scss/App.scss";
import Navigation from "./components/Navigation";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import DadJokesPage from "./pages/DadJokesPage";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import RandomCatImage from "./pages/RandomCatImage";

function App() {
	return (
		<div id="App">
			<Navigation />

			<Container className="py-3">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/dadjokes" element={<DadJokesPage />} />
					<Route path="/catimage" element={<RandomCatImage />} />

					<Route path="*" element={<NotFoundPage />} />

				</Routes>
			</Container>

			<ReactQueryDevtools />
		</div>
	);
}

export default App;
