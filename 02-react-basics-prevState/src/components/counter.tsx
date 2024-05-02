import { useState } from "react"

const Counter = () => {
	const [counter, setCounter] = useState(1);

		const handleBtnClick = () => {
		console.log("Counter before update:", counter);
		setCounter( (prevCounter) => { return prevCounter + 1});
		console.log("Counter after update:", counter);
	}

		// console.log("Counter on render:", counter);

	return (
		<>
		<p>You have clicked me: {counter} times</p>

		<button onClick={handleBtnClick} className="btn btn-success">Click me</button>
		</>

	)
}

export default Counter;
