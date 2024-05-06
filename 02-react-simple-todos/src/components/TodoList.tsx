//prop drilling mellankomponent
import React from 'react'
import TodoListItem from './TodoListItem'
import { Todo } from '../types/Todo'

interface TodoListProps {
	todos: Todo[];
	onTodoClick: (todo: Todo) => void;
	onDeleteTodo: (todo: Todo) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onDeleteTodo, onTodoClick }) => {
  return (
	<ul className='mt-5'>
		<h4>Gör detta!</h4>
		{todos.map(todo =>
			<TodoListItem
				key={todo.id}
				todo={todo}
				onTodoClick={onTodoClick}
				onDeleteTodo={onDeleteTodo}
			/>
		)}
	</ul>
  )
}

export default TodoList
