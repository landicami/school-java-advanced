import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Container from "react-bootstrap/Container";
import { CardChecklist } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

const HomePage = () => {
	const { currentUser, isLoading } = useAuth();

	if (isLoading) {
		return <p>Loading....</p>;
	}

	console.log("Current user is", currentUser);

	return (
		<Container className="py-3 center-y">
			<div>{currentUser ? <p>Welcome, {currentUser.email}</p> : <p>Please log in.</p>}</div>{" "}
			{currentUser && (
				<>
					<h1>Firebase Todos</h1>
					<p>Because when your life is on fire 🔥, you need a todo list.</p>
					<ButtonGroup>
						<Button
							onClick={() => toast("Wow 🤩! Such click 🐭, much toast 🍞, very celebrate 🥂!")}
							variant="primary"
						>
							Celebrate 🎉
						</Button>

						<Button
							onClick={() =>
								toast.success("Wow, such success, very influencer, much money! 💰", {
									icon: () => "🚀",
								})
							}
							variant="success"
						>
							Click me 🤑
						</Button>

						<Button
							onClick={() =>
								toast.warn("Wow, such WARNING, very ALERT!", {
									icon: <CardChecklist />,
								})
							}
							variant="warning"
						>
							Call da police 👮🏻
						</Button>

						<Button onClick={() => toast.error("Wow, such ERROR, very DANGEROUS!")} variant="danger">
							Blow shit up 💣
						</Button>

						<Button onClick={() => toast.info("LIKE && SUBSCRIBE")} variant="info">
							Booooring 🥱
						</Button>
					</ButtonGroup>
				</>
			)}
		</Container>
	);
};

export default HomePage;
