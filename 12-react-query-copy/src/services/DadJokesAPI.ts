/**
 * Get the jokes from dad
 */
import axios from "axios";

const FAKE_DELAY = 2500;

const instance = axios.create({
	baseURL: "https://icanhazdadjoke.com",
	timeout: 10000,
	headers: {
		"Accept": "application/json",
	},
});

interface DadJoke {
	id: number;
	joke: string;
	status: number;
}

// export const getJoke = async () => {
// 	const res = await instance.get<DadJoke>("/");
// 	!!FAKE_DELAY && new Promise(r => setTimeout(r, FAKE_DELAY));
// 	return res.data;
// }



const get = async <T>(endpoint: string) => {
	const res = await instance.get<T>(endpoint);

	// Fake slow API if FAKE_DELAY is truthy
	!!FAKE_DELAY && await new Promise(r => setTimeout(r, FAKE_DELAY));

	return res.data;
}

/**
 * Get a random dad joke
 *
 */
export const getRandomDadJoke = () => {
	return get<DadJoke>("/");
}

