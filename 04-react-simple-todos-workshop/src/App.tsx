import { useEffect, useState } from "react";
import AddNewTodoForm from "./components/AddNewTodoForm";
import TodoCounter from "./components/TodoCounter";
import TodoList from "./components/TodoList";
import * as TodosAPI from "./services/TodosAPI";
import { Todo } from "./types/Todo";
import "./assets/scss/App.scss";

function App() {
	const [todos, setTodos] = useState<Todo[]>([]);

	const addTodo = async (todo: Todo) => {
		try {
		  const newTodo = await TodosAPI.addTodo(todo);

		  // Uppdatera todos med den nya todo
		  setTodos([...todos, newTodo.data]);
		} catch (error) {
		  // Hantera fel om det uppstår något vid läggning till todo
		  console.error('Error adding todo:', error);
		}
	  }

	const handleToggleTodo = async (todo: Todo) => {
		try {
			const updatedTodo = await TodosAPI.toggleTodo(todo);
			console.log(updatedTodo.data);

			setTodos(prevTodos => prevTodos.map(prevTodo => {
			  if (prevTodo.id === updatedTodo.data.id) {
				return updatedTodo.data;
			  } else {
				return prevTodo;
			  }
			}));
		} catch (error) {
			console.error("Error putting todo", error)
		}
	}

	const handleDeleteTodo = async (todo: Todo) => {
		try {
			await TodosAPI.deleteTodo(todo.id);
			// Uppdatera todos-tillståndet genom att filtrera bort den todo med matchande id
			setTodos(prevTodos => prevTodos.filter(toDo => toDo.id !== todo.id));
		} catch(error){
			console.error("Error deleting todo", error)
		}
	}

	const finishedTodos = todos.filter(todo => todo.completed);
	const unfinishedTodos = todos.filter(todo => !todo.completed);

	console.log("Component is rendering");

	useEffect(() => {
		const getTodos = async () => {
			setTodos([]);

			// make request to api
			const data = await TodosAPI.getTodos();

			setTodos(data);
		}
		getTodos();
	}, []);

	return (
		<div className="container">
			<h1>React Simple Todos</h1>

			<AddNewTodoForm
				onAddTodo={addTodo}
				todos={todos}
			/>

			{todos.length > 0 && (
				<>
					<h2 className="mb-2 h5">💪🏻 Stuff I got to do</h2>
					<TodoList
						onDelete={handleDeleteTodo}
						onToggle={handleToggleTodo}
						todos={unfinishedTodos}
					/>

					<h2 className="mb-2 h5">🥺 Stuff I've done</h2>
					<TodoList
						onDelete={handleDeleteTodo}
						onToggle={handleToggleTodo}
						todos={finishedTodos}
					/>

					<TodoCounter finished={finishedTodos.length} total={todos.length} />
				</>
			)}

			{!todos.length && (
				<div className="alert alert-success">You ain't got no todos 🤩!</div>
			)}
		</div>
	);
}

export default App;
