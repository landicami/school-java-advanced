import { keepPreviousData, useQuery } from '@tanstack/react-query'
import React, { useEffect, useRef, useState } from 'react'
import { searchByDate } from '../services/HackerNewsAPI'
import LoadingSpinner from '../components/LoadingSpinner';
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"
import { useSearchParams } from 'react-router-dom';
import SearchHNListItem from '../components/SearchHNListItem';

const HackerNewsPage = () => {
	// const [query, setQuery] = useState("");
	// const [page, setPage] = useState(0)
	const [searchInput, setSearchInput] = useState("");

	const [searchParams, setSearchParams] = useSearchParams();

	const searchQuery = searchParams.get("query") ?? "";
	const pageQuery = parseInt(searchParams.get("page") ?? "1");

	const searchInputEl = useRef<HTMLInputElement>(null);




	const hackerNews = useQuery({
		queryKey: ["news", searchQuery, pageQuery],
		queryFn: () => searchByDate(searchQuery, pageQuery),
		enabled: !!searchQuery,
		placeholderData: keepPreviousData,   // show previous data (if available) while a new query is being fetched

	})

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		setSearchParams({ query: searchInput, page: "0" });
	}

	const handlePageChange = (newPage: number) => {
		setSearchParams({ query: searchQuery, page: newPage.toString() });
	};

	console.log(hackerNews.data)

	const handleReset = () => {
		setSearchInput("");
		setSearchParams({ query: "", page: "0" });
		searchInputEl.current?.focus();
	}

	useEffect(() => {
		searchInputEl.current?.focus();
	}, []);

  return (
  	<Container>
		<h1>Get me news!</h1>
		{hackerNews.isFetching && <LoadingSpinner />}

		<Form
		onSubmit={handleSubmit}
		onReset={handleReset}
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
			<Button
						type="reset"
						variant="warning"
					>
						Clear
					</Button>
		</InputGroup>
	  </Form>

	  {hackerNews.isError && <p>{hackerNews.error.message}</p>}

	  {hackerNews.data && (
	  <Container className='mt-3 col-8 d-flex justify-content-between'>
			<div className=''>
				<Button
				disabled={hackerNews.isFetching || pageQuery === 0}
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
					disabled={hackerNews.isFetching || pageQuery + 1 >= hackerNews.data.nbPages}
					onClick={() => handlePageChange(pageQuery + 1)}>
					Next
				</Button>
			</div>
		</Container>)}

	  <h3>Searchresults for "{searchQuery}"</h3>


		{hackerNews.data && hackerNews.data.hits.map(news =>
			<SearchHNListItem
			news={news}
			key={news.objectID} />

		)}


	</Container>
  )
}

export default HackerNewsPage
