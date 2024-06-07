import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { toast } from "react-toastify"

const HomePage = () => {
	const handleClick = () => {
		toast(
			<div>
				"Wow you have friday! Want to go
				<Link to="/todos"> home?</Link>"
			</div>);
	}
	return (
		<>
			<h1>Welcome to Better Todos!</h1>

			<p>Because when your life is on fire 🔥, you need a <Link to="/lolcats">link that does not exist</Link>.</p>

			<ButtonGroup>
				<Button
					onClick={handleClick}
					variant="primary"
					>Celebrate
				</Button>

				<Button
					onClick={() => toast.success("Success has been done")}
					variant="success">
						Success me
				</Button>

				<Button
					onClick={() => toast.warn("Don't be sad :(")}
					variant="warning">
						Dont shut up
				</Button>
			</ButtonGroup>
		</>
	)
}

export default HomePage;
