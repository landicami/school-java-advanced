import { useState } from 'react'
import "./App.css";
//VARJE GÅNG EN STATEUPPDATERING SKER GÖRS EN OMRENDERING

interface Todo {
	id: number;
	title: string;
	completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([
	{id: 1, title: "Carry on", completed: false},
	{id: 2, title: "Carry through", completed: true},
	{id: 3, title: "Carry finale", completed: false},
  ]);

  const [inputTodo, setInputTodo] = useState("");

  const handleTodoFromValue = (e: React.FormEvent) => {
	e.preventDefault();
	const newTodo: Todo = {
		title: inputTodo,
		id: Math.max(...todos.map(todo => todo.id)) +1,
		completed: false
	}
	setTodos([...todos, newTodo]);
	setInputTodo("");
  }

  const handleTodoClick = (todo: Todo) => {
	todo.completed = !todo.completed;
	console.log(todo);
	setTodos([...todos]);

  }

  const completedTodos = todos.filter(todo => todo.completed)

  const handleDeletedTodo = (todoToDelete: Todo) => {
	setTodos(todos.filter(todo => todo !== todoToDelete))

  }

  const notCompletedinlist = todos.filter(todo => !todo.completed);
  const completedinList = todos.filter(todo => todo.completed);



  return (
    <div className="container">
		<h1>I will always todo you</h1>

		{todos.length === 0 &&
		<p>The todos are none
			</p>
			}
		{todos.length > 0 &&
		<>
		<h2>There are this many todos: {todos.length}</h2>
		<h3>{completedTodos.length} är avklarade</h3>
		<ul className='mt-5'>
			<h4>Not Completed</h4>
			{notCompletedinlist.map(todo =>
				<li
				className = {todo.completed ? "done" : ""}
				key = {todo.id}
				>

				{todo.title}

					<button
					className='btn btn-warning btn-sm'
					onClick={() => (handleTodoClick(todo))}>{todo.completed ? "Undone" : "Done"}</button>
					<button
							className="btn btn-warning btn-sm ms-1"
							onClick={() => handleDeletedTodo(todo)}
						>🗑️</button>

				</li>
			)}
		</ul>
		<ul className='mt-5'>
		<h4>Completed</h4>

			{completedinList.map(todo =>
				<li
				className = {todo.completed ? "done" : ""}
				key = {todo.id}
				>

				{todo.title}

					<button
					className='btn btn-warning btn-sm'
					onClick={() => (handleTodoClick(todo))}>{todo.completed ? "Undone" : "Done"}</button>
					<button
							className="btn btn-warning btn-sm ms-1"
							onClick={() => handleDeletedTodo(todo)}
						>🗑️</button>

				</li>
			)}
		</ul>
		<form onSubmit={handleTodoFromValue} className='mt-3'>
			<div className='input-group'>
				<input
					aria-label='Post todo'
					placeholder='Todo me'
					type="text"
					className='form-control'
					onChange={(e)=> {setInputTodo(e.target.value)}}
					value={inputTodo}
					/>
				<button type='submit'
				className='btn btn-primary'>Create a new todo</button>
			</div>
		</form>
		</>
		}
    </div>
  )
}

export default App
