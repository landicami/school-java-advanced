import { CollectionReference, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

const useStreamDocument = <T>(colRef: CollectionReference<T>, documentId: string | undefined) => {
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);

	// Subscribe to data on component mount
	useEffect(() => {
		// Get reference to the document in the collection
		const docRef = doc(colRef, documentId);

		// Subscribe to changes in the document
		const unsubscribe = onSnapshot(docRef, (snapshot) => {
			if (!snapshot.exists()) {
				setData(null);
				setError(true);
				setLoading(false);
				return;
			}

			const data = {
				...snapshot.data(),
				_id: snapshot.id,
			}

			setData(data);
			setLoading(false);
		});

		// Return unsubscribe function as cleanup
		return unsubscribe;

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [colRef]);

	return {
		data,
		error,
		loading,
	}
}

export default useStreamDocument;
