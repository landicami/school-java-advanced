import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Dog } from "../types/dogAPI";

const useAxiosDog = () => {
	const [data, setData] = useState<Dog | null>(null);
	const [url, setUrl] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | false>(false);
	const lastUrlRef = useRef("");

	const getData = async (resourseURL: string) => {
		setData(null);
		setUrl(null);
		setIsLoading(true)
		setError(false);
		try { const res = await axios.get<Dog>(resourseURL);
		setData(res.data);
		setIsLoading(false)
		} catch (err) {
			setIsLoading(false);
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("ERROR: We've reached an unreachable state. Anything is possible. The limits were in our heads all along. Follow your dreams.");
			}
		}

	}

	const handleSetUrl = (newUrl: string) => {
		setUrl(newUrl);
		lastUrlRef.current = newUrl;
		console.log(newUrl, "is");
	};


//här gör vi att det inte hämtas något direkt utan först när vi trycker på knapp
	useEffect(() => {
		if(!url) {
			return;
		}

		getData(url);
	}, [url]);

	return {
		data,
		isLoading,
		setUrl,
		handleSetUrl,
		lastUrlRef,
		error
	};
}

export default useAxiosDog;
