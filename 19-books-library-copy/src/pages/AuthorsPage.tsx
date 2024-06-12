import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import WarningAlert from "../components/alerts/WarningAlert";
import AuthorList from "../components/AuthorList";
import BSAuthorTable from "../components/BSAuthorTable";
import TanstackBasicTable from "../components/TanstackBasictable";
import useAuthors from "../hooks/useAuthors";
import { Author } from "../services/BooksAPI.types";

// const columns: ColumnDef<Author>[] = [
// 	{
// 		accessorKey: "name",
// 		header: "Name",
// 	},
// 	{
// 		accessorKey: "date_of_birth",
// 		header: "Date of birth",
// 		meta: {
// 			align: "end",
// 		},
// 	},
// ]

const columnHelper = createColumnHelper<Author>();

const columns = [


	columnHelper.group({
		header: "Author Details",
		columns: [
			columnHelper.accessor("name", {
				header: "Name",
			}),
			columnHelper.accessor("date_of_birth", {
				header: "Date of birth",
				meta: {
					align: "end",
				},
			}),
		],
	}),
];

const AuthorsPage = () => {
	const { data: authors, isError, isLoading } = useAuthors();

	return (
		<>
			<h1 className="mb-3">Authors</h1>

			{isError && (
				<WarningAlert>
					An terrible, inexplicable error occurred while fetching authors. It wasn't me!
				</WarningAlert>
			)}

			{isLoading && <p>Loading authors...</p>}

			{/* {authors && <BSAuthorTable authors={authors} />} */}
			{authors && <TanstackBasicTable columns={columns} data={authors} />}

		</>
	);
};

export default AuthorsPage;
