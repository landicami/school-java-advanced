import React, { useState } from 'react'

interface TodoFormProps {
inputTodo: string
onTodoValue: (e: React.FormEvent) => void
setInputTodo: (value: React.SetStateAction<string>) => void
}

const AddNewTodoForm: React.FC<TodoFormProps> = ( {setInputTodo, onTodoValue, inputTodo }) => {

	return (
	<form onSubmit={onTodoValue} className='mt-3'>
		<div className='input-group container'>
			<input
				aria-label='Post todo'
				placeholder='Todo me'
				type="text"
				className='form-control'
				onChange={(e)=> {setInputTodo(e.target.value)}}
				value={inputTodo}
				/>
			{inputTodo.length < 3
			? <>
			<button disabled className='btn btn-primary'>Create a new todo</button>
			<div className='col-12'><p>You need to put in at least 3 characters</p></div>
			</>

			: <button type='submit' className='btn btn-primary'>Create a new todo</button>}
		</div>
	</form>
	)
}

export default AddNewTodoForm
