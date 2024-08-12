import { todosCol } from "../services/firebase";
import useGetCollection from "./useGetCollection";

const useGetTodos = () => {
	const { data, loading, getData } = useGetCollection(todosCol);

	return { getData, loading, data };

	// eller return useGetCollection(todosCol)
};

export default useGetTodos;
