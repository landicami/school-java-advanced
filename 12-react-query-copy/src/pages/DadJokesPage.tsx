import React from 'react'
import { useQuery } from "@tanstack/react-query"
import { getRandomDadJoke } from '../services/DadJokesAPI'

const DadJokesPage = () => {
	const { data } = useQuery({
		queryKey: ["dadjoke"],
		queryFn: getRandomDadJoke,
	});

  return (
		<>
			<h1>A Dad Joke</h1>

			<div>
				<p className="display-1 text-center">
					<em>{data && data.joke}</em>
				</p>
			</div>
		</>
	)
}

export default DadJokesPage
