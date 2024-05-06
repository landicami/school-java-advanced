
interface TodoFormProps {
inputTodo: string
onTodoValue: (e: React.FormEvent) => void
setInputTodo: (value: React.SetStateAction<string>) => void
}

//jag vill inte att en komponent ska ändra state

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

				{/* disabled={inputTodo.trim().length > 3} */}
			{inputTodo.length > 0 && inputTodo.length < 3
			? <>
			<button disabled className='btn btn-primary'>Create a new todo</button>
			<div className='col-12 form-text'>You need to put in at least 3 characters</div>
			</>

			: <button type='submit' className='btn btn-primary'>Create a new todo</button>}
		</div>
	</form>
	)
}

export default AddNewTodoForm

/**
 * import { useState } from 'react';
import { Todo } from '../types/Todo';

interface AddNewTodoFormProps {
	onAddTodo: (todo: Todo) => void;
	todos: Todo[];
}

const AddNewTodoForm: React.FC<AddNewTodoFormProps> = ({ onAddTodo, todos }) => {
	const [inputNewTodoTitle, setInputNewTodoTitle] = useState("");

	const handleAddTodo = (e: React.FormEvent) => {
		e.preventDefault();

		// create a new todo
		const newTodo = {
			id: Math.max(0, ...todos.map(todo => todo.id)) + 1,
			title: inputNewTodoTitle,
			completed: false,
		}

		// give new todo to App
		onAddTodo(newTodo);

		// clear input value
		setInputNewTodoTitle("");
	}

	return (
		<form onSubmit={handleAddTodo} className="mb-3">
			<div className="input-group">
				<input
					aria-label="New todo title"
					className="form-control"
					onChange={e => setInputNewTodoTitle(e.target.value)}
					placeholder="Learn about GTD"
					required
					type="text"
					value={inputNewTodoTitle}
				/>

				<button className="btn btn-success" type="submit">👶🏻</button>
			</div>
		</form>
	)
}

export default AddNewTodoForm

 */
