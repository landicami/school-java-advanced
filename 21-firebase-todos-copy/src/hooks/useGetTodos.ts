import { useState } from 'react'
import { Todo } from '../types/Todo.types';
import { getDocs } from 'firebase/firestore';
import { todosCol } from '../services/firebase';

const useGetTodos = () => {
	const [todos, setTodos] = useState<Todo[] | null>(null);
	const [loading, setLoading] = useState(true);

	const getTodos = async ()  => {
		setLoading(true)
		setTodos(null);
		//querysnapshot
		const snapshot = await getDocs(todosCol);

		const data = snapshot.docs.map(doc => {
			return {
				...doc.data(),
				_id: doc.id
			}
		})

		setTodos(data);
		setLoading(false);
	}
	return { getTodos, loading, todos }
}

export default useGetTodos
