import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Todo } from "../src/types/Todo";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import * as TodosAPI from "../src/services/TodosAPI";


const TodoPage = () => {
  const { id } = useParams();
  const todoId = Number(id);
  console.log(typeof todoId);

  const [onetodo, setOneTodo] = useState<Todo | null>(null);
  const navigate = useNavigate();

  const fetchTodo = async (id:number) => {
	try {
	  const todo = await TodosAPI.getOneTodo(id);
	  setOneTodo(todo);
	} catch (error) {
	  console.error("Error fetching todo:", error);
	}
}
	//läggs i en useEffect why: Att inkludera fetchTodo(todoId) i en useEffect som lyssnar på todoId att din komponent uppdateras korrekt baserat på det aktuella todo-id:t och att korrekta todos hämtas från API:et vid rätt tillfälle.
	useEffect(() => {

		fetchTodo(todoId);
	}, [todoId]);

	const handleToggle = async () => {
		if(!onetodo){
		return
		}
		await TodosAPI.updateTodo(todoId, {
			completed: !onetodo.completed

		});
		fetchTodo(todoId);
	};

	const handleDeleteTodo = async () => {
		await TodosAPI.deleteTodo(todoId);
		setTimeout(() => {
			navigate("/todos");
		}, 200);
	}


  return (
	<>
	<h1>{onetodo?.title} for todo with id {id}</h1>

	<p><strong>Status:</strong> {onetodo?.completed ? "Completed" : "Not completed"}</p>

	<div className="buttons mb-3">
		<Button
		variant="outline-warning"
		onClick={handleToggle}>Toggle</Button>

		<Button
		className="ms-2"
		variant="outline-danger"
		onClick={handleDeleteTodo}>Delete me</Button>
	</div>

	<Link to="/todos"
	className="btn btn-secondary"
	role="button"> Back to todos</Link>
</>
  );
};

export default TodoPage;
