import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const Navigation = () => {
	const { signOutUser } = useAuth();

	const handleSignout = () => {
		signOutUser();
		toast.info("User has signed out");
	};

	return (
		<Navbar bg="dark" variant="dark" expand="sm">
			<Container>
				<Navbar.Brand as={Link} to="/">
					🔥 Firebase Todos
				</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link as={NavLink} end to="/todos">
							Todos
						</Nav.Link>
						<Nav.Link as={NavLink} className="cta" end to="/signup">
							Sign up
						</Nav.Link>
						<Nav.Link as={NavLink} end to="/login">
							Login
						</Nav.Link>
					</Nav>
					<Button onClick={handleSignout}>Sign out</Button>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Navigation;
