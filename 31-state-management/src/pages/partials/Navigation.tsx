import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from "react-router-dom";

const Navigation = () => {
	return (
		<Navbar bg="dark" variant="dark" expand="sm">
			<Container>
				<Navbar.Brand as={Link} to="/">👮🏻‍♂️ State Management</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<NavDropdown title={<><span role="img" aria-label="an abacus">🧮</span> Counters</>} id="basic-nav-dropdown">
							<NavDropdown.Item as={NavLink} to="/counter">Counter</NavDropdown.Item>
							<NavDropdown.Item as={NavLink} to="/reducer-counter">Reducer Counter</NavDropdown.Item>
							<NavDropdown.Item as={NavLink} to="/reducer-context-counter">Reducer Context Counter</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation;
