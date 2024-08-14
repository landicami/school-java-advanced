import { Timestamp } from "firebase/firestore";

export interface Todo {
	_id: string;
	title: string;
	completed: boolean;
	timestamp?: Timestamp;
}

export type NewTodo = Omit<Todo, "_id"> & { timestamp: Timestamp };

export type TodoFormData = {
	title: string;
	completed: boolean;
	timestamp: Timestamp;
};
