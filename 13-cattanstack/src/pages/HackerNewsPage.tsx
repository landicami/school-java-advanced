import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useRef, useState } from 'react'
import { searchByDate } from '../services/HackerNewsAPI'
import LoadingSpinner from '../components/LoadingSpinner';
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"
import { useSearchParams } from 'react-router-dom';

const HackerNewsPage = () => {
	// const [query, setQuery] = useState("");
	// const [page, setPage] = useState(0)
	const [searchInput, setSearchInput] = useState("");

	const [searchParams, setSearchParams] = useSearchParams();

	const searchQuery = searchParams.get("query") || "";
	const pageQuery = parseInt(searchParams.get("page") || "1");

	const searchInputEl = useRef<HTMLInputElement>(null);

	useEffect(() => {
		searchInputEl.current?.focus();
	}, []);


	const hackerNews = useQuery({
		queryKey: ["news", searchQuery, pageQuery],
		queryFn: () => searchByDate(searchQuery, pageQuery),
		enabled: !!searchQuery,
	})

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		setSearchParams({ query: searchInput, page: "0" });
	}

	const handlePageChange = (newPage: number) => {
		setSearchParams({ query: searchQuery, page: newPage.toString() });
	};

	console.log(hackerNews.data)

  return (
  	<Container>
		<h1>Get me news!</h1>
		{hackerNews.isFetching && <LoadingSpinner />}

		<Form
		onSubmit={handleSubmit}
		className='col-8'>
		<InputGroup className="mb-3">
			<Form.Control
			placeholder="Haxxor news"
			aria-label="Hacker news"
			aria-describedby="search-description"
			onChange={e => setSearchInput(e.target.value)}
			value={searchInput}
			required
			type="text"
			ref={searchInputEl}
			/>
			<Button
			type="submit"
			className="outline-primary"
			id="button-addon2"
			disabled={hackerNews.isFetching}
>
			Search me some news
			</Button>
		</InputGroup>
	  </Form>

	  {hackerNews.isError && <p>{hackerNews.error.message}</p>}

	  {hackerNews.data && (
	  <Container className='mt-3 col-8 d-flex justify-content-between'>
			<div className=''>
				<Button
				disabled={pageQuery === 0}
				onClick={() => handlePageChange(pageQuery - 1)}
				>
					Previous
				</Button>
			</div>
			<div>
				 <p>Page {pageQuery + 1} of {hackerNews.data?.nbPages}</p>
			</div>
			<div>
				<Button
					disabled={pageQuery + 1 >= hackerNews.data.nbPages}
					onClick={() => handlePageChange(pageQuery + 1)}>
					Next
				</Button>
			</div>
		</Container>)}

	  <h3>Searchresults for "{searchQuery}"</h3>


		{hackerNews.data && hackerNews.data.hits.map(news =>
			<Container key={news.objectID} className='col-8 border'>
				<div className='p-2 my-2'>
					<h4><a href={news.url}>{news.title}</a></h4>
					<span>{news.author} </span>
					<span>| {news.created_at}</span>
				</div>
			</Container>

		)}


	</Container>
  )
}

export default HackerNewsPage
