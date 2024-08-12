import { CollectionReference, doc, getDoc } from "firebase/firestore";
import { useState } from "react";

const useGetDocument = <T>(colref: CollectionReference<T>, documentId: string) => {
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);

	const getSingleData = async () => {
		setError(false);
		setLoading(true);
		setData(null);

		const docRef = doc(colref, documentId);
		const docSnapshot = await getDoc(docRef);

		if (!docSnapshot.exists()) {
			setData(null);
			setError(true);
			setLoading(false);
			return;
		}

		const data = {
			...docSnapshot.data(),
			_id: docSnapshot.id,
		};

		setData(data);
		setLoading(false);
	};

	return { getSingleData, error, data, loading };
};

export default useGetDocument;
