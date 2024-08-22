import { Timestamp } from "firebase/firestore";

export interface Meme {
	_id: string;
	uid: string;
	url: string;
	created_at: Timestamp;
	name: string;
	size: number;
	type: string;
	path: string;
}
