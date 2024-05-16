import React from 'react'
import Button from "react-bootstrap/Button";
import { HackerResponse } from '../types/HackerNewstypes';
interface PaginationProps {
	page: number;
	backPage: () => void;
	addpage: () => void;
	searchNews: HackerResponse | null
}
const Pagination:React.FC<PaginationProps> = ({page, addpage, backPage, searchNews}) => {
  return (
	<div className="d-flex justify-content-between align-items-center">
						<div className="prev">
							<Button
							variant="primary"
							onClick={backPage}
							disabled={page === 0}
							>{page === 0 ? "No previous pages" : "Previous Page"}</Button>
						</div>

						<div className="page">{searchNews && (<><p>Page {searchNews.page + 1} of {searchNews.nbPages}</p></>)}</div>

						<div className="next">
							<Button
							variant="primary"
							onClick={addpage}
							disabled={!searchNews || (searchNews.hits.length === 0)}
							>
								{(!searchNews || (searchNews.hits.length === 0)) ? "No more pages" : "Next Page"}
							</Button>
						</div>
					</div>
  )
}

export default Pagination
