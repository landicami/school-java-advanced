import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button"
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from "react-router-dom";
import useTheme from "../hooks/useTheme";

const Navigation = () => {
	const { isDarkMode, toggleTheme } = useTheme();

	return (
		<Navbar bg="dark" variant="dark" expand="md">
			<Container>
				<Navbar.Brand as={Link} to="/">🧐 React Query</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link as={NavLink} end to="/dad-joke">😂 Random Dad Joke</Nav.Link>
						<Nav.Link as={NavLink} end to="/random-cat">🐱 Random Cat</Nav.Link>
						<Nav.Link as={NavLink} end to="/hackernews">Hackernews</Nav.Link>

						<Button
						className="me-2"
						variant="outline-secondary"
						onClick={toggleTheme}
						>
						{isDarkMode ? "Light" : "Dark"}
						</Button>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation;
