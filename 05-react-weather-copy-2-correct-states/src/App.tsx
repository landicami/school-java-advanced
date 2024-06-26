import { useState } from "react";
import Forecast from "./components/Forecast";
import SearchCity from "./components/SearchCity";
import { getCurrentWeather } from "./services/OWMAPI";
import { WeatherReport } from "./services/OWMAPI.types";
import "./assets/scss/App.scss";

function App() {
	const [currentWeather, setCurrentWeather] = useState<WeatherReport | null>(null);
	const [isSearching, setIsSearching] = useState(false);
	const [error, setError] = useState(false)


	const handleSearch = async (location: string) => {
		setCurrentWeather(null);
		setIsSearching(true)
		setError(false)

		// Call API and ask for weather in `location`
		try {
			const data = await getCurrentWeather(location);

		// Update current weather state with the weather in `location`
		setCurrentWeather(data);
		setError(false)
		} catch (err) {
			setError(true)
		}
		setIsSearching(false);

	}

	return (
		<div id="app" className="container">

			<SearchCity
			onSearch={handleSearch}
			 />
			{isSearching && (<div><img src="src/assets/images/747.svg" alt="Flying stuff"></img></div>)}

			{error ? <div className="alert alert-danger">No city like that exists</div> : ""}

			{currentWeather &&
			<Forecast
			data={currentWeather}
			/>}
		</div>
	);
}

export default App;
