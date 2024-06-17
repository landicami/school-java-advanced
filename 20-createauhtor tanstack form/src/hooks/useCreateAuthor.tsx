import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createAuthor } from "../services/BooksAPI";
import { Author, AuthorWithBooks } from "../services/BooksAPI.types";

const useCreateAuthor = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createAuthor,
		onError: () => {
			// 😳
			toast.warning(
				<>
					<strong>Something bad happened 😳!</strong>
					<br />
					It was not possible to create the author. Please try again later.
				</>
			);
		},
		onSuccess: (newAuthor) => {
			// invalidate the authors list (or use the fetchQuery + setQueryData
			// from `09-react-query-todos/src/hooks/useCreateTodo.ts`)
			queryClient.invalidateQueries({
				queryKey: ["authors"],
			});

			// also insert the new author into the query cache
			queryClient.setQueryData<AuthorWithBooks>(["author", { id: newAuthor.id }],
				{...newAuthor,
				books:[]
				})

			// 🥂
			toast.success("Author created 🤩");
		},
	});
};

export default useCreateAuthor;
