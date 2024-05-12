import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOneTodo } from "../src/services/TodosAPI";
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

  useEffect(() => {
    const fetchTodo = async (id:number) => {
      try {
        const todo = await getOneTodo(id);
        setOneTodo(todo);
      } catch (error) {
        console.error("Error fetching todo:", error);
      }
    };

    fetchTodo(todoId);
  }, [todoId]);
  console.log(onetodo);

	const handleToggle = async () => {
		if(!onetodo){
		return
		}
		await TodosAPI.updateTodo(todoId, {
			completed: !onetodo.completed

		});
		const todo = await getOneTodo(todoId);
			setOneTodo(todo);

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

	<Link to="/todos"><Button variant="outline-light">Back to all todos</Button></Link>
</>
  );
};

export default TodoPage;
