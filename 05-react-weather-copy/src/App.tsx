import Forecast from "./components/Forecast";
import "./assets/scss/App.scss";
import { useState } from "react";
import { WeatherReport } from "./services/OWMAPI.types";
import { getCurrentWeather } from "./services/OWMAPI";
import SearchCity from "./components/SearchCity";




function App() {

	function createEmptyWeatherReport(): WeatherReport {
		return {
		  dt: 0,
		  main: {
			feels_like: 0,
			humidity: 0,
			temp: 0,
		  },
		  name: "Search",
		  sys: {
			country: "??",
			sunrise: 0,
			sunset: 0,
		  },
		  weather: [],
		  wind: {
			deg: 0,
			gust: 0,
			speed: 0,
		  },
		};
	  }

	  // Använd createEmptyWeatherReport() för att initiera useState
	  const [weather, setWeather] = useState<WeatherReport>(createEmptyWeatherReport());

		const [inputValue, setInputValue] = useState("");

		const handleFormSubmit = async (e: React.FormEvent) => {
			e.preventDefault();
			try {const weatherAPI = await getCurrentWeather(inputValue);
			console.log(weatherAPI)
			setWeather(weatherAPI)
			} catch (err) {
				console.log(err)
			}
		};
	return (
		<div id="app" className="container">
			<SearchCity
			handleFormSubmit={handleFormSubmit}
			inputValue={inputValue}
			setInputValue={setInputValue}
			/>

			<Forecast
			weather={weather} />
		</div>
	);
}

export default App;
