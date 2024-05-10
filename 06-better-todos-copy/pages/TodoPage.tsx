import React from 'react'
import { useParams } from "react-router-dom";


const TodoPage = () => {
	const { id } = useParams();

  return (
	<div>TodoID {id}</div>
  )
}

export default TodoPage
