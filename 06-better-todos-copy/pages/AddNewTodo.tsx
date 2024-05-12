import React from 'react'
import { useEffect, useRef, useState } from 'react';

import * as TodosAPI from "../src/services/TodosAPI";
import { useNavigate } from 'react-router-dom';



const AddNewTodo = ( ) => {
	const [inputNewTodoTitle, setInputNewTodoTitle] = useState("");
	const inputNewTodoTitleRef = useRef<HTMLInputElement>(null);
	const [success, isSuccess] = useState(false);
	const navigate = useNavigate(); // Använd useNavigate() för att få en navigationsfunktion



	const handleAddTodo = async (e: React.FormEvent) => {
		e.preventDefault();

		// create a new todo
		const newTodo = {
			title: inputNewTodoTitle.trim(),
			completed: false,
		}
		isSuccess(false)
		// give new todo to App
		try {
		await TodosAPI.createTodo(newTodo);
		isSuccess(true)

		setTimeout(() => {
			navigate("/todos");
		}, 2000);

		} catch (err){
			isSuccess(false)
		}
			// clear input value
			setInputNewTodoTitle("");
		}

	// On component mount, focus on the input field
	useEffect(() => {
		inputNewTodoTitleRef.current?.focus();
	}, []);

	return (
		<>
		<form onSubmit={handleAddTodo} className="mb-3">
			<div className="input-group">
				<input
					aria-label="New todo title"
					className="form-control"
					onChange={e => setInputNewTodoTitle(e.target.value)}
					placeholder="Learn about GTD"
					ref={inputNewTodoTitleRef}
					required
					type="text"
					value={inputNewTodoTitle}
				/>

				<button
					className="btn btn-success"
					disabled={inputNewTodoTitle.trim().length < 3}
					type="submit"
				>👶🏻</button>
			</div>

			{inputNewTodoTitle.trim().length > 0 && inputNewTodoTitle.trim().length < 3 && (
				<div className="form-text text-danger">Please enter 3 chars or more</div>
			)}
		</form>

		{success && (<div className='alert alert-success'>You added a todo</div>)}


	</>
	)
}

export default AddNewTodo

