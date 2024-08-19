import { CollectionReference, getDocs, query, QueryConstraint } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";

const useGetCollection = <T>(
	colRef: CollectionReference<T>,
	...queryConstraints: QueryConstraint[]
) => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<T[] | null>(null);

	// Get todos
	const getData = useCallback(async () => {
		setLoading(true);
		setData(null);

		// Construct a query reference
		const queryRef = query(colRef, ...queryConstraints);

		// Get query snapshot of collection
		const snapshot = await getDocs(queryRef);

		// Loop over all docs
		const data = snapshot.docs.map(doc => {
			return {
				...doc.data(), // title, completed
				_id: doc.id,
			}
		});

		setData(data);
		setLoading(false);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [colRef]);

	// Get todos on component mount
	useEffect(() => {
		getData();
	}, [getData]);

	return {
		data,
		getData,
		loading,
	}
};

export default useGetCollection;
