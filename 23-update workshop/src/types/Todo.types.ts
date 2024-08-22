import { Timestamp } from "firebase/firestore";

export interface Todo {
	_id: string;
	title: string;
	completed: boolean;
	created_at: Timestamp;
	updated_at: Timestamp;
	uid: string;
}

export type NewTodo = Omit<Todo, "_id">;

export type TodoFormData = {
	title: string;
	completed: boolean;
	uid: string;
};

export type UpdateProfileFormData = {
	name: string;
	photoFiles: string;
	email: string;
	password: string;
	confirmPassword: string;
};
