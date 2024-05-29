import axios from "axios";
import { CatData } from "../types/Cattypes";

const FAKE_DELAY = 1500
const API_KEY = import.meta.env.VITE_CAT_API



  const instance = axios.create({
	baseURL: "https://api.thecatapi.com/v1/images/search",
	timeout: 10000,
	headers: {
		"x-api-key": API_KEY,
	  },
  });

/**
 * Execute a HTTP GET request to an endpoint
 *
 * @param endpoint Endpoint to HTTP GET
 */
const get = async <T>(endpoint: string) => {
	const res = await instance.get<T>(endpoint);

	// Fake slow API if FAKE_DELAY is truthy
	!!FAKE_DELAY && await new Promise(r => setTimeout(r, FAKE_DELAY));

	return res.data;
}

export const getRandomCat = () => {
	return get<CatData[]>("/");
}

export const getRandomBreed = (breedId: string) => {
	return get<CatData[]>(`?breed_ids=${breedId}`)
}
