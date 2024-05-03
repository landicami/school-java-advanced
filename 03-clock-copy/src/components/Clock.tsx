import React, { useEffect, useState } from 'react'

const Clock = () => {
	const [time, setTime] = useState(() => {
		return new Date().toLocaleTimeString();
		//en initial state som tar tid att beräkna
	});

	console.log("Rendering... 🎨");

	useEffect(() => {
		console.log("🔫 Starting clock...");

		const intervalId = setInterval(() => {
			setTime(new Date().toLocaleTimeString());
			console.log("tick 🕰️");
		}, 1000);

		return () => {
			clearInterval(intervalId)
		}
	}, []);

	useEffect(() => {
		document.title = time;
	}, [time]);

  return (
		<div className="container">
			<div className="display-1 text-center">
				{time}
			</div>
		</div>  )
}

export default Clock
