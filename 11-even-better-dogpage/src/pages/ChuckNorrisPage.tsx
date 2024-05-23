import useChuckNorrisJoke from '../hooks/useChuckNorrisJoke'
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const ChuckNorrisPage = () => {

const { data, error, execute, isError, isLoading } = useChuckNorrisJoke();
  return (
	<Container>
		<Container className='row d-flex justify-content-center'>
			<Container className='col-6 col-md-6 col-sm-12 rounded border border-primary p-3'>
				<h1>Chuck Norris says the truth:</h1>
				{isLoading && <p>Loading funny jokes....</p>}
				{isError && (
					<Alert  variant="warning">
					{error}
				  </Alert>
				)}

				{ data && (<p className='fst-italic'>{`"${data.value}"`}</p>)}

				<Button
				disabled={isLoading}
				onClick={() => execute()}>{isLoading ? "Joke coming..." : "Get me joke!"}</Button>
			</Container>
		</Container>
	</Container>
  )
}

export default ChuckNorrisPage
