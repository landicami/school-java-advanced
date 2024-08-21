import { orderBy, where } from "firebase/firestore";
import { todosCol } from "../services/firebase";
import useStreamCollection from "./useStreamCollection";
import useAuth from "./useAuth";

const useGetTodos = () => {
	const { currentUser } = useAuth();
	return useStreamCollection(
		todosCol,
		// where("completed", "==", false),
		where("uid", "==", currentUser?.uid),
		orderBy("completed"),
		orderBy("title")
	);
};

export default useGetTodos;
