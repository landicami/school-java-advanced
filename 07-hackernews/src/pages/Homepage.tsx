import Container from "react-bootstrap/Container"
import { Link } from "react-router-dom"

const Homepage = () => {

  return (
	<Container>
		<h1>Welcome to home</h1>
		<p>Do you wanna search the internet for hacking news, please <Link to={"/search"}>press me!</Link></p>
	</Container>
  )
}

export default Homepage
