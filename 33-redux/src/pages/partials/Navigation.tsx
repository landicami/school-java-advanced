import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from "react-router-dom";

const Navigation = () => {
	return (
		<Navbar bg="dark" variant="dark" expand="sm">
			<Container>
				<Navbar.Brand as={Link} to="/">
					<span role="img" aria-description="A red toolbox">🧰</span>
					{" "}
					Redux Toolkit
				</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link as={NavLink} to="/account">
							<span role="img" aria-description="A bank">🏦</span>
							{" "}
							Account
						</Nav.Link>
						<Nav.Link as={NavLink} to="/todos">
							<span role="img" aria-description="A memo">📝</span>
							{" "}
							Todos
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation;
