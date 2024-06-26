import Container from "react-bootstrap/Container";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navigation from "./pages/partials/Navigation";
import EditTodoPage from "./pages/EditTodoPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import TodosPage from "./pages/TodosPage";
import TodoPage from "./pages/TodoPage";
import "./assets/scss/App.scss";

function App() {
	return (
		<div id="App">
			<Navigation />

			<Container className="py-3">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/todos" element={<TodosPage />} />
					<Route path="/todos/:id" element={<TodoPage />} />
					<Route path="/todos/:id/edit" element={<EditTodoPage />} />

					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</Container>

			<ToastContainer
				// position="bottom-right"
				// autoClose={3000}  // close automatically after 3 seconds instead of the default 5 seconds
				// autoClose={false}  // don't close automatically
				// pauseOnFocusLoss={false}  // continue autoclose even if window isn't in focus
				closeOnClick  // close on click (duh)
				theme="colored"
				limit={5}
				stacked
			/>
		</div>
	)
}

export default App;
