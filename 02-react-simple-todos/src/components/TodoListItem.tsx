import React from 'react'
import { Todo } from '../types/Todo'

interface TodoListItemProps {
	todo: Todo
	onTodoClick: (todo: Todo) => void
	onDeleteTodo: (todo: Todo) => void
}
const TodoListItem: React.FC<TodoListItemProps> = ({ todo, onDeleteTodo, onTodoClick }) => {
	return (
<li className={`mt-2 ${todo.completed ? "done" : ""}`}>

	{todo.title}

		<button
			className='btn btn-outline-warning btn-sm ms-2'
			onClick={() => (onTodoClick(todo))}>
				{todo.completed ? "Undone" : "Done"}
		</button>
		<button
			className="btn btn-warning btn-sm ms-1"
			onClick={() => onDeleteTodo(todo)}
		>🗑️
		</button>
	</li>
  )
}

export default TodoListItem
