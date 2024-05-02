import React, { useState } from "react";
import "./App.css";
import Counter from "./components/counter";
import Salary from "./components/Salary";

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
	const [showSalary, setShowSalary] = useState(false); //använda detta för att kunna visa och dölja divar genom react


	//State för form
	const [inputPostTitle, setInputPostTitle] = useState("");
	console.log("App is being rendered");


	//vi vill uppdatera counter när den appen har renderats




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

	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		const newPost: Post = {
			title: inputPostTitle,
			likes: 0,
			id: Math.max(...posts.map(post => post.id)) +1
		}
		setPosts([...posts, newPost]);
		//clear inputfield
		setInputPostTitle("");
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

			{showSalary && <Salary />}
			<hr />

			{posts.length > 0 &&
			<>
			<h2>Posts</h2>

			<form onSubmit={handleFormSubmit} className="mb-3" >
				<div className="input-group">
					<input
						aria-label="Post title"
						className="form-control"
						placeholder="Fun with Forms"
						required
						type="text"
						onChange={(e)=> {setInputPostTitle(e.target.value)}}
						value={inputPostTitle}
					/>

					<button
						type="submit"
						className="btn btn-success"
					>Create</button>
				</div>
			</form>

			<ul>
				{posts.map(post =>
					<li key={post.id}>
						{post.title} ({post.likes} likes)
						<button
							className="btn btn-primary btn-sm ms-1"
							onClick={() => handleAddLike(post)}
						>❤️</button>
						<button
							className="btn btn-warning btn-sm ms-1"
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
