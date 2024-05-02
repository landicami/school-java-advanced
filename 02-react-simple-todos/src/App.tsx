import { useState } from 'react'

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

  return (
    <div className="container">
	<h1>I will always todo you</h1>

		<ul className='mt-5'>
			{todos.map(todo =>
			<li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
			{todo.title}
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
    </div>
  )
}

export default App
