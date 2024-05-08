export interface Todo {
	id: number;
	title: string;
	completed: boolean;
}

// export type TodoList = Todo[];

//lämnar ute id
export type NewTodo = Omit<Todo, "id">;
