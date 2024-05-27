import Spinner from "react-bootstrap/Spinner";


const LoadingSpinner = () => {
  return (
	<div id="loading-spinner">
		<Spinner variant="success" animation="grow">
			<span className="visually-hidden">Loading...</span>
		</Spinner>
		</div>
  )
}

export default LoadingSpinner
