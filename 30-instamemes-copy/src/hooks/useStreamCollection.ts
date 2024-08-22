import { CollectionReference, onSnapshot, query, QueryConstraint } from "firebase/firestore";
import { useEffect, useState } from "react";

const useStreamCollection = <T>(
	colRef: CollectionReference<T>,
	...queryConstraints: QueryConstraint[]
) => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<T[] | null>(null);

	// Subscribe to data on component mount
	useEffect(() => {
		// Construct a query reference
		const queryRef = query(colRef, ...queryConstraints);

		// Subscribe to changes in the collection
		const unsubscribe = onSnapshot(queryRef, (snapshot) => {
			console.log("📸 Got a snapshot!");

			// Loop over all docs
			const data = snapshot.docs.map(doc => {
				return {
					...doc.data(), // title, completed
					_id: doc.id,
				}
			});

			setData(data);
			setLoading(false);
		});

		// Return unsubscribe function as cleanup
		return unsubscribe;

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [colRef]);

	return {
		data,
		loading,
	}
};

export default useStreamCollection;
