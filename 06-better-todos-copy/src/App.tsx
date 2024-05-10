
import { Route, Routes } from "react-router-dom";
import "./assets/scss/App.scss";
import  Container  from "react-bootstrap/Container";
import Homepage from "../pages/Homepage";
import TodosPage from "../pages/TodosPage";
import Navigation from "./components/Navigation";
import Notfound from "../pages/NotFound"


function App() {
	return (
		<div id="App">
			<Navigation />
			<Container className="py-3">
				<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/todos" element={<TodosPage />} />
				<Route path="*" element={<Notfound />} />
				{/* routes */}
				</Routes>
			</Container>
		</div>
	)
}

export default App;
