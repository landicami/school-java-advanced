import Forecast from "./components/Forecast";
import "./assets/scss/App.scss";
import { useState } from "react";
import { WeatherReport } from "./services/OWMAPI.types";
import { getCurrentWeather } from "./services/OWMAPI";
import SearchCity from "./components/SearchCity";




function App() {
	const [weather, setWeather] = useState<WeatherReport | null >(null);

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

			{weather && ( <Forecast
			weather={weather} />)}
		</div>
	);
}

export default App;
