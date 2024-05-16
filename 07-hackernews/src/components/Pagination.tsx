import React from 'react'
import Button from "react-bootstrap/Button";
import { HackerResponse } from '../types/HackerNewstypes';
interface PaginationProps {
	page: number;
	backPage: () => void;
	addpage: () => void;
	data: HackerResponse | null
}

//obs om jag vill göra den till en allmän komponent så behöver jag döpa om funktionerna eller variabelnamnen
const Pagination:React.FC<PaginationProps> = ({page, addpage, backPage, data}) => {
  return (
	<div className="d-flex justify-content-between align-items-center">
						<div className="prev">
							<Button
							variant="primary"
							onClick={backPage}
							disabled={page === 0}
							>{page === 0 ? "No previous pages" : "Previous Page"}</Button>
						</div>

						<div className="page">{data && (<><p>Page {data.page + 1} of {data.nbPages}</p></>)}</div>

						<div className="next">
							<Button
							variant="primary"
							onClick={addpage}
							disabled={!data || (data.hits.length === 0)}
							>
								{(!data || (data.hits.length === 0)) ? "No more pages" : "Next Page"}
							</Button>
						</div>
					</div>
  )
}

export default Pagination
