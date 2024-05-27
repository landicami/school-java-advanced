import { useQuery } from "@tanstack/react-query"
import { getRandomDadJoke } from '../services/DadJokesAPI'

import Alert from "react-bootstrap/Alert";
import LoadingSpinner from "../components/LoadingSpinner";

const DadJokesPage = () => {
	const {
		error,
		data,
		isError,
		isFetching,
		isLoading,
		isPending,
		isStale,
		isSuccess,
		isRefetching,
		status,
	 } = useQuery({
		queryKey: ["dadjoke"],
		queryFn: getRandomDadJoke,
	});

	// const dadJokeQuery = useQuery({
	// 	queryKey: ["dadjoke"],
	// 	queryFn: getRandomDadJoke,
	// });
  return (
		<>
			<h1>A Dad Joke</h1>

			{isFetching &&
				<LoadingSpinner />}

			<pre className="bg-light py-2 px-3">
				isError: {String(isError)}<br />
				isFetching: {String(isFetching)}<br />
				isLoading: {String(isLoading)}<br />
				isPending: {String(isPending)} <br/>
				isRefetching: {String(isRefetching)}<br />
				isStale: {String(isStale)}<br />
				isSuccess: {String(isSuccess)}<br />
				status: {status}
			</pre>

			{isError && <Alert variant="warning">{error.message}</Alert>}

			<div>
				<p className="display-1 text-center">

					<em>{isSuccess === true && data.joke}</em>
					{/* <em>{dadJokeQuery.data && dadJokeQuery.data.joke}</em> */}
				</p>
			</div>
		</>
	)
}

export default DadJokesPage
