import "./assets/scss/App.scss";
import { Routes, Route } from "react-router-dom";
import Homepage from './pages/Homepage';
import Searchpage from './pages/Searchpage';
import Navigation from "./components/Navigation";


function App() {

  return (
    <>
		<Navigation />

		<Routes>
			<Route path="/" element={<Homepage />} />
			<Route path="/search" element={<Searchpage />} />
		</Routes>
    </>
  )
}

export default App
