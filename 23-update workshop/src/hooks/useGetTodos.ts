import { orderBy } from "firebase/firestore";
import { todosCol } from "../services/firebase";
import useStreamCollection from "./useStreamCollection";

const useGetTodos = () => {
	return useStreamCollection(todosCol,
		// where("completed", "==", false),
		orderBy("completed"),
		orderBy("title")
	);
};

export default useGetTodos;
