import { useEffect, useState } from "react";
import forecastBanner from "../assets/images/forecast-banner.png";
import { WeatherReport } from "../services/OWMAPI.types";

interface ForecastProps {
	data: WeatherReport;
	isSearching: boolean
}

const Forecast: React.FC<ForecastProps> = ({ data, isSearching }) => {

	const [banner, setBanner] = useState('');

	useEffect(() => {
	  const isDay = data.dt > data.sys.sunrise && data.dt < data.sys.sunset;
	  const bannerImage = isDay ? '/src/assets/images/day.svg' : '/src/assets/images/night.svg';
	  setBanner(bannerImage);
	}, [data]);

	const time = new Date(data.dt * 1000);
	return (<>
		{isSearching ? <div>Loading...</div> :
		<div id="forecast">
			<div className="card">
				<img src={banner} className="card-img-top" alt="Daytime, nighttime, daytime, nighttime" />

				<div className="card-body">
					<h5 className="card-title" id="location">
						<span id="city">{data.name}</span>,<span id="country">{data.sys.country}</span>
					</h5>

					<p className="temp">
						<span id="temperature">{data.main.temp}</span>
						&deg;C
					</p>

					<p className="humidity">
						<span id="humidity">{data.main.humidity}</span> % humidity
					</p>

					<p className="wind">
						<span id="windspeed">{data.wind.speed}</span> m/s
					</p>


					<ul className="conditions"> {
						data.weather.map(condition =>
						<li key={condition.id}>
						<img
						src={`http://openweathermap.org/img/wn/${condition.icon}@2x.png`}
						title={condition.main}
						alt={condition.main} /></li>)
					}

					</ul>

					<p className="text-muted small">
						<span>
						{time.toLocaleString()}
						</span>
					</p>

				</div>
			</div>
		</div>

}
</>);
};

export default Forecast;
