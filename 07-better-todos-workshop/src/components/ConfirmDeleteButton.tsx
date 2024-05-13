import React from 'react'
import  Button  from 'react-bootstrap/Button'
import { Todo } from '../types/Todo'

interface ConfirmDeleteButtonProps {
	deleteTodo: (todo: Todo) => Promise<void>
	todo: Todo;
}

const ConfirmDeleteButton: React.FC<ConfirmDeleteButtonProps> = ( {deleteTodo, todo}) => {
  return (
	<Button
	className='ms-2'
	variant="danger"
	onClick={() => {
		const confirmBox = window.confirm(
			`Do you really want to delete the todo "${todo.title}"?`
		  )
		if (confirmBox === true) {
			{deleteTodo(todo)}
		}
	}}>
		Delete</Button>
  )
}

export default ConfirmDeleteButton
