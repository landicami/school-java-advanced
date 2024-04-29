import { useState } from "react";

interface Post {
	id: number;
	title: string;
	likes: number;
}

function App() {
	// const msg = "Hello React";
	// let counter = 1;
	// en reactfunktion, vad ska counter ha för startvärde
	const [counter, setCounter] = useState(1)

	const [msg, setMsg] = useState("Hi mom!");
	// <Post[]> som typargument så att posts inte blir never
	const [posts, setPosts] = useState<Post[]>([
		{ id: 1, title: "React Rocks!", likes: 1337 },
		{ id: 2, title: "JSX Rocks Even Moar!", likes: 42 },
		{ id: 3, title: "Got state?", likes: 3 },
	])

	const [salary, setSalary] = useState(10);


	const handleBtnClick = () => {
		// counter++;
    setCounter(counter + 1 )
		console.log("Counter is now:", counter);
	}

	return (
	<div className="container">
		<h1>01-react-basics</h1>
     	<p>{msg}</p>

		<p>Counter: {counter}</p>

		<ul>{
			posts.map(post =>
			<li key={post.id}>{post.title}</li>)
			}
		</ul>

		<button onClick={handleBtnClick} className="btn btn-success">Click me</button>
    	<button onClick={() => setMsg("Hi dad!")} className="btn btn-warning">Hi dad?</button>
		<hr />

		<p>Salary per hour: {salary} &euro;</p>

		<div className="buttons">
			<div className="mb-1">
				<button onClick={() => setSalary(salary + 1)} className="btn btn-primary btn-lg">Raise 1 &euro; 🤑</button>
				<button onClick={() => setSalary(salary - 1)} className="btn btn-warning btn-lg">Decrease 1 &euro; 😢</button>
			</div>

			<div className="mb-1">
				<button onClick={() => setSalary(salary + 5)} className="btn btn-success btn-lg">Raise 5 &euro; 🤑🤑🤑</button>
				<button onClick={() => setSalary(salary - 5)} className="btn btn-danger btn-lg">Decrease 5 &euro; 😢😢😢</button>
			</div>
		</div>

<hr />
    </div>



	);
}

export default App;
