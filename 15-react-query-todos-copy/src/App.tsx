import Container from "react-bootstrap/Container";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import CreateTodoPage from "./pages/CreateTodoPage";
import EditTodoPage from "./pages/EditTodoPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import TodosPage from "./pages/TodosPage";
import TodoPage from "./pages/TodoPage";
import "./assets/scss/App.scss";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import HamburgerLoadingSpinner from "./components/HamburgerSpinner";

function App() {
	return (
		<div id="App">
			<Navigation />
			<HamburgerLoadingSpinner />

			<Container className="py-3">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/todos" element={<TodosPage />} />
					<Route path="/todos/:id" element={<TodoPage />} />
					<Route path="/todos/:id/edit" element={<EditTodoPage />} />
					<Route path="/todos/create" element={<CreateTodoPage />} />

					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</Container>
			<ReactQueryDevtools />
		</div>
	)
}

export default App;
