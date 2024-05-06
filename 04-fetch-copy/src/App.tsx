import { useEffect, useState } from "react";
import { Resource } from "./types/Resource";
import "./assets/scss/App.scss";
import Data from "./components/Data";
import { getResource } from "./services/JSONPlanceholder";

function App() {
	const [resource, setResource] = useState('');
	const [data, setData] = useState<Resource[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	// fetch("https://jsonplaceholder.typicode.com/posts")
	// .then(res => res.json())
	// .then(data => setData(data)); detta gör tusen omrenderingar för att vi ändrar en state varje gång vi hämtar

	// useEffect(()=> {
	// 	fetch(`https://jsonplaceholder.typicode.com/${resource}`)
	// 	.then(res => res.json())
	// 	.then(data => setData(data));
	// }, [resource]) //glöm inte att ge den ett värde som den ska bevaka , en dependencie array

	//vi kan inte göra effectfunktionen async på annat sätt
	useEffect( () => {
		if(!resource){
			return;
		}

		const fetchData = async () => {
				//här kan vi också tömma data setData([])
				setData([]);
				setIsError(false);
				setIsLoading(true);
			try {
				// const res = await fetch(`https://jsonplaceholder.typicode.com/${resource}`);

				// if(!res.ok){
				// 	setIsError(true);
				// 	return;
				// };

				// const payload = await res.json();
				// await new Promise(r => setTimeout(r, 2500));
				const payload = await getResource(resource);

				setData(payload);
			} catch (err) {
				setIsError(true);
				console.log(err);
			};

			setIsLoading(false);
			};
		fetchData();
	}, [resource]);


	return (
		<div className="container">
		<h1 className="mb-3">Fetch</h1>

			<div className="d-flex justify-content-between mb-5">
				<button onClick={() => setResource('albums')} className="btn btn-primary">Albums</button>
				<button onClick={() => setResource('photos')} className="btn btn-success">Photos</button>
				<button onClick={() => setResource('posts')} className="btn btn-warning">Posts</button>
				<button onClick={() => setResource('todos')} className="btn btn-danger">Todos</button>
				<button onClick={() => setResource('memes')} className="btn btn-info">Memes</button>

			</div>
				< Data
				data={data}
				resource={resource}
				isLoading={isLoading}
				isError={isError}
				/>
				</div>

	)
}

export default App;
