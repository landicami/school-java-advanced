/**
 * Service for communicating with the json-server backend
 */
import axios from "axios";
import { Todo } from "../types/Todo";

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
export const addTodo = async (todo: Todo) => {
	const data = await axios.post<Todo>(BASE_URL + "/todos", todo);
	return data;
}

/**
 * Update a todo
 *
 * @param todo_id Todo to update
 * @param data Data to update todo with
 */
export const toggleTodo = async (todo:Todo) => {
	const data = await axios.patch<Todo>(`${BASE_URL}/todos/${todo.id}`, { completed: !todo.completed });
	return data;
}

// export const toggleTodo = async (todo: Todo) => {
// 	const data = await axios.patch<Todo>(`${BASE_URL}/todos/${todo.id}`, { completed: !todo.completed });
// 	return data;
//   }



/**
 * Delete a todo
 *
 * @param todo_id Todo to delete
 */

export const deleteTodo = async (todo_id: number) => {
	const res = await axios.delete<Todo>(BASE_URL + `/todos/${todo_id}`)
	return res.data
}
