import useStreamCollection from "./useStreamCollection";
import useAuth from "./useAuth";
import { memesCol } from "../services/firebase";
import { orderBy } from "firebase/firestore";

const useGetMemes = () => {
	const { currentUser } = useAuth();
	return useStreamCollection(
		memesCol,
		orderBy("created_at")
		// where("completed", "==", false),
		// where("uid", "==", currentUser?.uid),
	);
};

export default useGetMemes;
