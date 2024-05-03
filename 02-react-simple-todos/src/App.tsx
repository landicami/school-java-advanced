import { useState, useEffect } from 'react'
import "./App.css";
import TodoListItem from './components/TodoListItem';
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
	setTodos([...todos]);

  }

  const completedTodos = todos.filter(todo => todo.completed)

  const handleDeletedTodo = (todoToDelete: Todo) => {
	setTodos(todos.filter(todo => todo !== todoToDelete))

  }

  const notCompletedinlist = todos.filter(todo => !todo.completed);

//   document.title = `${notCompletedinlist.length} unfinished`;
//   console.log("Document updated")
console.log("rendering")

  useEffect(() => {
	// This code will only be executed **AFTER the component has rendered
	console.log("im on the other side")
  }, [notCompletedinlist.length]);

  console.log("after side effect")


  return (
    <div className="container">
		<h1>I will always todo you</h1>
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

		{todos.length === 0 &&
		<p>The todos are none
		</p>
		}

		{todos.length > 0 &&
		<div className='row'>
			<div className='col-6'>
		<ul className='mt-5'>
			<h4>Not Completed</h4>
			{notCompletedinlist.map(todo =>
				<TodoListItem
					key={todo.id}
					todo={todo}
					onTodoClick={handleTodoClick}
					onDeleteTodo={handleDeletedTodo}
				/>
			)}
		</ul>
		</div>
		<div className='col-6'>
		<ul className='mt-5'>
		<h4>Completed</h4>
			{completedTodos.map(todo =>
				<TodoListItem
					key={todo.id}
					todo={todo}
					onTodoClick={handleTodoClick}
					onDeleteTodo={handleDeletedTodo}
				/>
			)}
		</ul>
		</div>
		<h4>There are this many todos: {todos.length}</h4>
		<h4>{completedTodos.length} är avklarade</h4>
		</div>
		}
    </div>
  )
}

export default App
