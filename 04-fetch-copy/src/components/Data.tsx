import React from 'react'
import { Resource } from '../types/Resource';

type DataProps = {
	data: Resource[];
	isLoading: boolean;
	isError: boolean;
	resource: string;

}

const Data: React.FC<DataProps> = ({ data, isLoading, isError, resource }) => {

	if (isLoading) {
		return <p>Loading...</p>
	}

	if (isError) {
		return <div className="alert alert-warning">Something went wrong ...</div>
	}

	if (!resource) {
		return <p>Please select a resource to view</p>
	}

	if (!data.length) {
		return <p>No data exists</p>
	}

	return (
		<>
			<h2>{resource}</h2>
			<p>There are {data.length} {resource}.</p>

			<ol>
				{data.map(item => (
					<li key={item.id}>{item.title}</li>
				))}
			</ol>
		</>
	)

// <>
// 			{isError && <div className='alert alert-warning'>Something went wrong ...</div>}


// 			{isLoading
// 			? (
// 				<div className="spinner-grow text-success" role="status">
// 				</div>
// 			)
// 			: (
// 				!isLoading && data.length > 0 && resource && (
// 					<>
// 					<h2>{resource}</h2>
// 					<p>There are {data.length} {resource}.</p>
// 					<ol>
// 						{data.map(item => (
// 						<li key={item.id}>{item.title}</li>
// 						))}
// 					</ol>
// 					</>
// 				)
// 			)}
// </>

}

export default Data
