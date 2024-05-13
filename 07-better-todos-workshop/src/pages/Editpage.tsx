import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as TodosAPI from "../services/TodosAPI";
import Button from  "react-bootstrap/Button";

const Editpage = () => {
	const { id } = useParams();
	const todoId = Number(id);
	const location = useLocation();
	const { todo } = location.state;
	const navigate = useNavigate();

	const [inputNewTodoTitle, setInputNewTodoTitle] = useState("");
	const [isSuccess, setIsSuccess] = useState(false);

	// Toggle todo in API
	const updateTodotitle = async (e:React.FormEvent) => {
		e.preventDefault();

		try{
		// Call TodosAPI and update the todo
		const updatedTodo = await TodosAPI.updateTodo(todoId, {
			title: inputNewTodoTitle
		});
		console.log(updatedTodo);
		setIsSuccess(true);

		setTimeout(()=>{
			navigate(`/todos/${todoId}`)
		}, 2000)

		}catch(err){
			console.log("could not update todo");
		}

	}


  return (
	<>
	<h1>Here you can edit your todo with id {todoId}</h1>
	<p>Write a new title to instead of {todo.title}</p>

	<form onSubmit={updateTodotitle} className="mb-3">
			<div className="input-group">
				<input
					aria-label="Update todo-title"
					className="form-control"
					onChange={e => setInputNewTodoTitle(e.target.value)}
					placeholder={todo.title}
					required
					type="text"
					value={inputNewTodoTitle}
				/>

				<button
					className="btn btn-success"
					disabled={inputNewTodoTitle.trim().length < 3}
					type="submit"
				>💾</button>
			</div>
	</form>

	<Button className="ms-2" variant="outline-primary" onClick={() =>
			{
				navigate(-1)
			}
			}>Take me back to b4</Button>

	{isSuccess && <div className='alert alert-success'>You successfully changed the title</div>}
	</>
  )
}

export default Editpage
