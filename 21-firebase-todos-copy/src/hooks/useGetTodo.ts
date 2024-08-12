import { useState } from 'react'
import { Todo } from '../types/Todo.types';
import { todosCol } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';

const useGetTodo = (todoId: string) => {
	const [data, setData]= useState<Todo | null>(null);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);

	const getTodo = async () => {
		setError(false);
		setLoading(true);
		setData(null)

		const docRef = doc(todosCol, todoId)
		const docSnapshot = await getDoc(docRef)


		if(!docSnapshot.exists()) {
			setData(null);
			setError(true);
			setLoading(false);
			return;
		}

		const data = {
			...docSnapshot.data(),
			_id: docSnapshot.id

	}

		setData(data);
		setLoading(false)
	}
  return {getTodo, todoId, data, error, loading}
}

export default useGetTodo
