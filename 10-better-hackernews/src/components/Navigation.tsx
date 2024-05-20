import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from "react-router-dom";
import  Button  from "react-bootstrap/Button";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContextProvider";

const Navigation = () => {
	const themeContextfromUseContext = useContext(ThemeContext)

	if(!themeContextfromUseContext){
		throw new Error("Trying to use ThemeContext outside of ThemeContextProvider.");
	}

	const { isDarkMode, toggleTheme } = themeContextfromUseContext;

	return (
		<Navbar bg="dark" variant="dark" expand="md">
			<Container>
				<Navbar.Brand as={Link} to="/">🕵🏻‍♂️ Hacker News</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link as={NavLink} end to="/search">Search</Nav.Link>
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
