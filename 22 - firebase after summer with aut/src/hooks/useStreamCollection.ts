import { CollectionReference, QueryConstraint, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";

const useStreamCollection = <T>(colRef: CollectionReference<T>, ...queryConstraints: QueryConstraint[]) => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<T[] | null>(null);

	// Subscribe to data on component mount
	useEffect(() => {
		const queryRef = query(colRef, ...queryConstraints);

		//subscribe to changes in collection
		onSnapshot(queryRef, (snapshot) => {
			// Loop over all docs
			const data = snapshot.docs.map((doc) => {
				return {
					...doc.data(), // title, completed
					_id: doc.id,
				};
			});
			setData(data);
			setLoading(false);
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [colRef]);

	return {
		data,
		loading,
	};
};

export default useStreamCollection;
