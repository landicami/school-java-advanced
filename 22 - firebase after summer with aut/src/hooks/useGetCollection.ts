import { CollectionReference, QueryConstraint, getDocs, orderBy, query, where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";

const useGetCollection = <T>(colRef: CollectionReference<T>, ...queryConstraints: QueryConstraint[]) => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<T[] | null>(null);

	// Get todos
	const getData = useCallback(async () => {
		setLoading(true);
		setData(null);

		// queryreference där alla todos är completed
		// const queryRef = query(colRef, where("completed", "==", true));

		// const queryRef = query(colRef, orderBy("title"));
		const queryRef = query(colRef, ...queryConstraints);

		// Get query snapshot of collection
		const snapshot = await getDocs(queryRef);

		// Loop over all docs
		const data = snapshot.docs.map((doc) => {
			return {
				...doc.data(), // title, completed
				_id: doc.id,
			};
		});

		setData(data);
		setLoading(false);
	}, [colRef]);

	// Get todos on component mount
	useEffect(() => {
		getData();
	}, [getData]);

	return {
		data,
		getData,
		loading,
	};
};

export default useGetCollection;
