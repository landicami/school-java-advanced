import { useEffect, useState } from "react";
import { Resource } from "./types/Resource";
import "./assets/scss/App.scss";

function App() {
	const [resource, setResource] = useState('');
	const [data, setData] = useState<Resource[]>([]);

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
		const fetchedData = async () => {
			console.log("Side-effect triggered due to resource changing value to:", resource);
			const res = await fetch(`https://jsonplaceholder.typicode.com/${resource}`);
			const payload = await res.json();
			setData(payload);
		}
	fetchedData();

	}, [resource]);

	return (
		<div className="container">
			<h1 className="mb-3">Fetch</h1>

			<div className="d-flex justify-content-between mb-5">
				<button onClick={() => setResource('albums')} className="btn btn-primary">Albums</button>
				<button onClick={() => setResource('photos')} className="btn btn-success">Photos</button>
				<button onClick={() => setResource('posts')} className="btn btn-warning">Posts</button>
				<button onClick={() => setResource('todos')} className="btn btn-danger">Todos</button>
			</div>

			{data && (
				<>
					<h2>{resource}</h2>
					<p>There are {data.length} {resource}.</p>

					<ol>
						{data.map(item => (
							<li key={item.id}>{item.title}</li>
						))}
					</ol>
				</>
			)}
		</div>
	)
}

export default App;
