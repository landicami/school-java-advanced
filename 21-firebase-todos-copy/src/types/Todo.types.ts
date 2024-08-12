export interface Todo {
	_id: string;
	title: string;
	completed: boolean;
}

export type NewTodo = Omit<Todo, "_id">;

export type TodoFormData = {
	title: string;
	completed: boolean;
};
