import { useState, useEffect } from "react";
import axios from "axios";
import { Dog } from "../types/dogAPI";

const useAxiosDog = () => {
	const [data, setData] = useState<Dog | null>(null);
	const [url, setUrl] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false);

	const getData = async (resourseURL: string) => {
		setData(null);
		setUrl(null);
		setIsLoading(true)
		const res = await axios.get<Dog>(resourseURL);
		setData(res.data);
		setIsLoading(false)

	}


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
	};
}

export default useAxiosDog;
