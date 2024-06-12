import WarningAlert from "../components/alerts/WarningAlert";
import BookList from "../components/BookList";
import BSBooktable from "../components/BSBooktable";
import BSBookTable2 from "../components/BSBooktable2";
import TanstackBasicTable from "../components/TanstackBasictable";
import useBooks from "../hooks/useBooks";
import { ColumnDef } from "@tanstack/react-table";
import { Book } from "../services/BooksAPI.types";
import TanstackSortableTable from "../components/TanstackSortableTable";

const colums: ColumnDef<Book>[] = [
	{
		header: "Title",
		accessorKey: "title",
	},
	{
		header: "Pages",
		accessorKey: "pages"
	},
	{
		header: "Published",
		accessorKey: "published"
	},
	{
		header: "Author",
		accessorKey: "author.name"
	},
	{
		header: "Birthyear",
		accessorKey: "author.date_of_birth"
	},
]

const BooksPage = () => {
	const { data: books, isError, isLoading } = useBooks();

	return (
		<>
			<h1 className="mb-3">Books</h1>

			{isError && (
				<WarningAlert>
					An terrible, inexplicable error occurred while fetching books. It wasn't me!
				</WarningAlert>
			)}

			{isLoading && <p>Loading books...</p>}

			{/* {books && <BSBookTable2 books={books} />} */}
						{books &&
						<TanstackSortableTable
						data={books}
						columns={colums} />}

		</>
	);
};

export default BooksPage;
