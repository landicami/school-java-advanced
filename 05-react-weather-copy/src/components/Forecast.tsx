import forecastBanner from "../assets/images/forecast-banner.png";
import { WeatherReport } from "../services/OWMAPI.types";

interface ForecastProps {
	weather: WeatherReport
}

const Forecast: React.FC<ForecastProps> = ({ weather }) => {



	return (

		<div id="forecast">
			<div className="card">
				<img src={forecastBanner} className="card-img-top" alt="Daytime, nighttime, daytime, nighttime" />

				<div className="card-body">
					<h5 className="card-title" id="location">
						<span id="city">{weather.name}</span>,<span id="country">{weather.sys.country}</span>
					</h5>

					<p className="temp">
						<span id="temperature">{weather.main.temp}</span>
						&deg;C
					</p>

					<p className="humidity">
						<span id="humidity">{weather.main.humidity}</span> % humidity
					</p>

					<p className="wind">
						<span id="windspeed">{weather.wind.speed}</span> m/s
					</p>

					{/*
					<ul className="conditions">
						<li><img src="" title="CONDITION_MAIN" alt="CONDITION_MAIN">CONDITION_DESCRIPTION</li>
					</ul>

					<p className="text-muted small">
						<span>
							1970-01-01 13:37:00
						</span>
					</p>
					*/}
				</div>
			</div>
		</div>
	);
};

export default Forecast;
