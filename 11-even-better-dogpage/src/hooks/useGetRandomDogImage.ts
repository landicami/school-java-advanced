import axios from "axios";
import { RandomDogImage } from "../types/DogAPI.types";
import useGetData from "./useGetData";
import { useState } from "react";

const useGetRandomDogImage = (breed: string | null = null) => {

	const [error, setError] = useState<string | false>(false)
	const url = breed
	? `https://dog.ceo/api/breed/${breed}/images/random`
	: "https://dog.ceo/api/breeds/image/random";

	// const { changeUrl } = useGetData();

	const getRandomDogImage = async (breed: string | null = null) => {
		try {
			const res = await axios.get<RandomDogImage>(`https://dog.ceo/api/breed/${breed}/images/random`)
			console.log(res.data)

			return res.data
		} catch (error) {
			setError(error instanceof Error ? error.message : "Something else went very bad")
		}
	};
	getRandomDogImage()

	console.log(error);

	return useGetData<RandomDogImage>(url)
}

// const getRandomDogImageUrl = (breed?: string) => {
// 	return breed
// 		? `https://dog.ceo/api/breed/${breed}/images/random`
// 		: "https://dog.ceo/api/breeds/image/random";
// }

// const useGetRandomDogImage = (breed?: string) => {
// 	const url = getRandomDogImageUrl(breed);
// 	const query = useGetData<RandomDogImage>(url);

// 	const getRandomDogImage = (breed?: string) => {
// 		const url = getRandomDogImageUrl(breed);
// 		query.changeUrl(url);
// 	}

// 	return {
// 		getRandomDogImage,
// 		...query,
// 	};

export default useGetRandomDogImage;
