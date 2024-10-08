import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import LoginPage from "./pages/auth/LoginPage";
import LogoutPage from "./pages/auth/LogoutPage";
import SignupPage from "./pages/auth/SignupPage";
import UpdateProfile from "./pages/auth/UpdateProfile";
import Navigation from "./pages/partials/Navigation";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import "./assets/scss/App.scss";

function App() {
	return (
		<div id="App">
			<Navigation />

			<Routes>
				<Route path="*" element={<NotFoundPage />} />

				{/* Auth Routes */}
				<Route path="/forgot-password" element={<ForgotPasswordPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/logout" element={<LogoutPage />} />
				<Route path="/signup" element={<SignupPage />} />
				<Route path="/" element={<HomePage />} />

				{/* Protected Routes */}
				<Route element={<ProtectedRoutes />}>
					<Route path="/update-profile" element={<UpdateProfile />} />
				</Route>
			</Routes>

			<ToastContainer
				// position="bottom-right"
				autoClose={1000} // close automatically after 3 seconds instead of the default 5 seconds
				// autoClose={false}  // don't close automatically
				// pauseOnFocusLoss={false}  // continue autoclose even if window isn't in focus
				closeOnClick // close on click (duh)
				theme="colored"
				limit={5}
				stacked
			/>
		</div>
	);
}

export default App;
