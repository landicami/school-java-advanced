import React from 'react'
import Container from "react-bootstrap/Container"
import { HN_SearchHit } from '../services/HackerNewsAPI.types'

interface HnProps {
	news: HN_SearchHit
}

const dateFormatter = new Intl.DateTimeFormat(undefined, {
	dateStyle: "medium",
	timeStyle: "short",
	// year: "numeric",
	// month: "long",
	// day: "numeric",
	// hour: "numeric",
	// minute: "numeric",
	// second: "numeric",
	// timeZoneName: "short",
});

const isoToFormattedString = (isoDate: string) => {
	const date = new Date(isoDate);
	return dateFormatter.format(date);
}

const SearchHNListItem:React.FC<HnProps> = ({news}) => {


  return (
	<Container className='col-8 border'>
				<div className='p-2 my-2'>
					<h4><a href={news.url}>{news.title}</a></h4>
					<span>{news.author} </span>
					<span>| {isoToFormattedString(news.created_at)}</span>
				</div>
				</Container>
  )
}

export default SearchHNListItem
