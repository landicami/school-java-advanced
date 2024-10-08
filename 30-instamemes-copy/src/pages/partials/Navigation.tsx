import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navigation = () => {
	const { currentUser, userEmail, userName, userPhotoUrl } = useAuth();

	return (
		<Navbar bg="dark" variant="dark" expand="sm">
			<Container>
				<Navbar.Brand as={Link} to="/">🤣 InstaMemes</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						{currentUser ? (<>
							{/* User is logged in */}
							<Nav.Link as={NavLink} end to="/">Home</Nav.Link>

							<NavDropdown
								title={userPhotoUrl
									? <Image
										src={userPhotoUrl}
										className="img-square"
										title={(userName || userEmail) ?? ""}
										fluid
										height={30}
										width={30}
										roundedCircle />
									: userName || userEmail
								}
							>
								<NavDropdown.Item as={NavLink} to="/update-profile">Update profile</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item as={NavLink} end to="/logout">Logout</NavDropdown.Item>
							</NavDropdown>

						</>) : (<>
							{/* No user is logged in */}
							<Nav.Link as={NavLink} end to="/signup">Signup</Nav.Link>
							<Nav.Link as={NavLink} end to="/login">Login</Nav.Link>
						</>)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation;
