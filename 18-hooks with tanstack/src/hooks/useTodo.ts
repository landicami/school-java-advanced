import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getTodo } from '../services/TodosAPI';
import { useParams } from 'react-router-dom';

const useTodo = () => {
  const { id } = useParams();
  const todoId = Number(id);
  const [queryEnabled, setQueryEnabled] = useState(true);

  const query = useQuery({
    queryKey: ["todo", { id: todoId }],
    queryFn: () => getTodo(todoId),
    enabled: !!queryEnabled,
  });

  return {
    ...query,
    setQueryEnabled,
    id: todoId,
  };
}

export default useTodo;
