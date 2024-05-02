import React, { useState } from "react";
import "./App.css";
import Counter from "./components/counter";

interface Post {
	id: number;
	title: string;
	likes: number;
}

function App() {
	const [msg, setMsg] = useState("Hi mom!");
	const [posts, setPosts] = useState<Post[]>([
		{ id: 1, title: "React Rocks!", likes: 1337 },
		{ id: 2, title: "JSX Rocks Even Moar!", likes: 42 },
		{ id: 3, title: "Got state?", likes: 3 },
	]);
	const [salary, setSalary] = useState(10);
	const [showSalary, setShowSalary] = useState(false); //använda detta för att kunna visa och dölja divar genom react

	console.log("App is being rendered");


	//vi vill uppdatera counter när den appen har renderats


	const handleChangeSalary = (amount: number) => {
		if (salary + amount < 5) {
			setSalary(5);
			return;
		}
		setSalary(salary + amount);
	}

	const handleAddLike = (post: Post) => {
		console.log("post me likes", post) //loggar det specifika objektet jag trycker på
		post.likes++ //adderar likes
		setPosts([...posts])
	}

	const handleDeletePost = (postToDelete: Post) => {
		//ändra inte en stateful variabel
		// posts.splice(posts.indexOf(postToDelete), 1);
		setPosts(posts.filter(post => post !== postToDelete))
		console.log(posts);

	}

	return (
		<div className="container">
			<h1>01-react-basics</h1>

			<p>{msg}</p>

			<button onClick={() => setMsg("Hi dad!")} className="btn btn-warning">Hi dad?</button>

			<hr />
			<Counter />
			<hr />
			<Counter />

			{/* <button onClick={() => setShowSalary(true)} className="btn btn-primary">Show salary</button>
			<button onClick={() => setShowSalary(false)} className="btn btn-primary">Hide salary</button> */}

			<button onClick={() => setShowSalary(!showSalary)} className="btn btn-primary">
				{showSalary ? "Hide salary" : "Show salary"}
				</button>

			{/*
			<button onClick={() => setShowSalary(!showSalary)} className={!showSalary ? "btn btn-warning" : "btn btn-danger"}>
			{!showSalary ? "Show salary" : "Hide salary"}
			</button>
 */}

			{showSalary && (
			<React.Fragment>
			<p>Salary per hour: {salary} &euro;</p>

			{salary < 10 && <div className="alert alert-warning">You might want to change job?</div>}

			<div className="buttons">
				<div className="mb-1">
					<button
						className="btn btn-primary btn-lg"
						onClick={() => handleChangeSalary(1)}
					>Raise 1 &euro; 🤑</button>
					<button
						className="btn btn-warning btn-lg"
						onClick={() => handleChangeSalary(-1)}
					>Decrease 1 &euro; 😢</button>
				</div>

				<div className="mb-1">
					<button
						className="btn btn-success btn-lg"
						onClick={() => handleChangeSalary(5)}
					>Raise 5 &euro; 🤑🤑🤑</button>
					<button
						className="btn btn-danger btn-lg"
						onClick={() => handleChangeSalary(-5)}
					>Decrease 5 &euro; 😢😢😢</button>
				</div>
			</div>

			<hr />
			</React.Fragment>
			)}

			{posts.length > 0 && <>
			<h2>Posts</h2>

			<ul>
				{posts.map(post =>
					<li key={post.id}>
						{post.title} ({post.likes} likes)
						<button
							className="btn btn-success btn-sm ms-1"
							onClick={() => handleAddLike(post)}
						>❤️</button>
						<button
							className="btn btn-danger btn-sm ms-1"
							onClick={() => handleDeletePost(post)}
						>🗑️</button>
					</li>
				)}
			</ul>
			</> }

		</div>
	);
}

export default App;
