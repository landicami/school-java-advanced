import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CounterPage from "./pages/counters/CounterPage";
import ReducerCounterPage from "./pages/counters/ReducerCounterPage";
import ReducerContextCounterPage from "./pages/counters/ReducerContextCounterPage";
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
				<Route path="/counter" element={<CounterPage />} />
				<Route path="/reducer-counter" element={<ReducerCounterPage />} />
				<Route path="/reducer-context-counter" element={<ReducerContextCounterPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>

			<ToastContainer
				autoClose={2000}  // close automatically after 2 seconds instead of the default 5 seconds
				closeOnClick  // close on click (duh)
				theme="colored"
				limit={5}
				stacked
			/>
		</div>
	)
}

export default App;
