import { useState, useEffect } from 'react'
import "./App.css";
import TodoListItem from './components/TodoListItem';
import TodoCounter from './components/TodoCounter';
import AddNewTodoForm from './components/AddNewTodoForm';
import { Todo } from './types/Todo';
//VARJE GÅNG EN STATEUPPDATERING SKER GÖRS EN OMRENDERING



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
			<AddNewTodoForm
			onTodoValue={handleTodoFromValue}
			setInputTodo={setInputTodo}
			inputTodo={inputTodo}
			/>

		{todos.length === 0 &&
		<p>The todos are none
		</p>
		}

		{todos.length > 0 &&
		<div className='row'>
			<div className='col-6'>
				<ul className='mt-5'>
					<h4>Gör detta!</h4>
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
					<h4>Gjort!</h4>
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
				<div>
					<TodoCounter
					todos={todos}
					/>
				</div>
			</div>
		}
    </div>
  )
}

export default App
