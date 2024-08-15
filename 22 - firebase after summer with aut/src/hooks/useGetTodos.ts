import { orderBy, where } from "firebase/firestore";
import { todosCol } from "../services/firebase";
import useGetCollection from "./useGetCollection";
import useStreamCollection from "./useStreamCollection";

const useGetTodos = () => {
	return useStreamCollection(todosCol, orderBy("created_at"));
};

export default useGetTodos;
