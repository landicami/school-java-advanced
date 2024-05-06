import { Resource } from "../types/Resource";

export const getResource = async (resource: string) => {
	// fetch resource
	const res = await fetch(`https://jsonplaceholder.typicode.com/${resource}`);
	if(!res.ok){
		throw new Error(`${res.status} ${res.statusText}`);
	}

	// parse response
	const payload: Resource[] = await res.json();

	// fake slow api
	await new Promise(r => setTimeout(r, 1500));

	return payload;
}
