import useChuckNorrisJoke from '../hooks/useChuckNorrisJoke'
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const ChuckNorrisPage = () => {

const { data, error, execute, isError, isLoading } = useChuckNorrisJoke();
  return (
	<Container className='container'>
		<Container className='row d-flex justify-content-center'>
			<Container className='col-6 col-md-6 col-sm-12 rounded border border-primary p-3'>
				<h1>Chuck Norris says the truth:</h1>
				{isLoading && <p>Loading funny jokes....</p>}
				{isError && (
					<Alert  variant="warning">
					{error}
				  </Alert>
				)}

				<p className='font-italic'>{data && `"${data.value}"`}</p>

				<Button onClick={() => execute()}>Get me another joke!</Button>
			</Container>
		</Container>
	</Container>
  )
}

export default ChuckNorrisPage
