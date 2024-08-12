import { useState } from 'react'
import { Todo } from '../types/Todo.types';
import { getDocs } from 'firebase/firestore';
import { todosCol } from '../services/firebase';

const useGetTodos = () => {
	const [data, setData] = useState<Todo[] | null>(null);
	const [loading, setLoading] = useState(true);

	const getTodos = async ()  => {
		setLoading(true)
		setData(null);
		//querysnapshot
		const snapshot = await getDocs(todosCol);

		const data = snapshot.docs.map(doc => {
			return {
				...doc.data(),
				_id: doc.id
			}
		})

		setData(data);
		setLoading(false);
	}
	return { getTodos, loading, data }
}

export default useGetTodos
