import axios from "axios";
import { HackerResponse } from "../types/HackerNewstypes";

const BASE_URL = "http://hn.algolia.com/api/v1/"
/**
 * get all
 */

// export const getFull =async () => {
// 	const res = await axios.get(BASE_URL + "/search_by_date?query=")
// 	return res.data

// }

/**
 * Get query
 */
export const getQuery = async (SEARCH_QUERY: string) => {
	const res = await axios.get<HackerResponse>(`${BASE_URL}/search_by_date?query=${SEARCH_QUERY}&tags=story&page=0`);
	return res.data
}
