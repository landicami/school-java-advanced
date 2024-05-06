import React from 'react'
import { Todo } from '../types/Todo'

//kan också skicka med ett nummeravtal
interface Todocounter {
	todos: Todo[]
}

const TodoCounter: React.FC<Todocounter> = ({ todos }) => {
	//undvik att göra något mer än en gång
	const completedTodos = todos.filter(todo => todo.completed)

  return (
	<>
	<h4>There are this many todos {todos.length}</h4>
	<h4>{completedTodos.length} är avklarade</h4>
	</>

  )
}

export default TodoCounter
