/**
 * Service for communicating with the json-server backend
 */
import axios from "axios";
import { NewTodo, Todo } from "../types/Todo";

const BASE_URL = "http://localhost:3000";

/**
 * Get all todos
 */
export const getTodos = async () => {
	const res = await axios.get<Todo[]>(BASE_URL + "/todos");
	return res.data;
}

/**
 * Create a new todo
 *
 * @param data Object with properties and values for the new todo
 */
export const addTodo = async (todo: NewTodo) => {
	const res = await axios.post<Todo>(BASE_URL + "/todos", todo);
	return res.data;
}

/**
 * using fetch
 * export const getTodosUsingFetch = async () => {
	const res = await fetch(BASE_URL + "/todos");
	if (!res.ok) {
		throw new Error(`${res.status} ${res.statusText}`);
	}
	const data: Todo[] = await res.json();
	return data;
}
 */

/**
 * Update a todo
 *
 * @param todo_id Todo to update
 * @param data Data to update todo with
 */
// export const toggleTodo = async (todo:Todo) => {
// 	const res = await axios.patch<Todo>(`${BASE_URL}/todos/${todo.id}`, { completed: !todo.completed });
// 	return res.data;
// }

//här uppdaterar vi med vad vi än skickar in,title eller completed.
export const updateTodo = async (todo_id: number, data: Partial<NewTodo>) => {
	const res = await axios.patch<Todo>(`${BASE_URL}/todos/${todo_id}`, data);
	return res.data
}

/**
 * Delete a todo
 *
 * @param todo_id Todo to delete
 */

export const deleteTodo = async (todo_id: number) => {
	const res = await axios.delete(BASE_URL + `/todos/${todo_id}`)
	return true;
	//res.data
}
