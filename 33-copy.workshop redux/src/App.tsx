import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AccountPage from "./features/account/AccountPage";
import TodosPage from "./features/todos/TodosPage";
import Navigation from "./pages/partials/Navigation";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import "./assets/scss/App.scss";

function App() {
	return (
		<div id="App">
			<Navigation />

			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/account" element={<AccountPage />} />
				<Route path="/todos" element={<TodosPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>

			<ToastContainer
				autoClose={2000}  // close automatically after 2 seconds instead of the default 5 seconds
				closeOnClick  // close on click (duh)
				pauseOnFocusLoss={false}  // don't pause when the window loses focus
				theme="colored"
				limit={5}
				stacked
			/>
		</div>
	)
}

export default App;
