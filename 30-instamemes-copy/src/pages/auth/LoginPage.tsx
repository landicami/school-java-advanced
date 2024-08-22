import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginCredentials } from "../../types/User.types";
import useAuth from "../../hooks/useAuth";
import { FirebaseError } from "firebase/app";

const LoginPage = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { handleSubmit, register, formState: { errors } } = useForm<LoginCredentials>();
	const { login } = useAuth();
	const navigate = useNavigate();

	const onLogin: SubmitHandler<LoginCredentials> = async (data) => {
		setIsSubmitting(true);

		// Pass email and password along to login in AuthContext
		try {
			await login(data.email, data.password);

			// Celebrate
			toast.success("🥂 Great success, you remembered your password! Good on you!")
			navigate("/");
		} catch (err) {
			if (err instanceof FirebaseError) {
				toast.error(err.message);
			} else if (err instanceof Error) {
				toast.error(err.message);
			} else {
				toast.error("Something went wrong. Have you tried turning it off and on again?");
			}
		}

		setIsSubmitting(false);
	}

	return (
		<Container className="py-3 center-y">
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card className="mb-3">
						<Card.Body>
							<Card.Title className="mb-3">Log In</Card.Title>

							<Form onSubmit={handleSubmit(onLogin)} className="mb-3">
								<Form.Group controlId="email" className="mb-3">
									<Form.Label>Email</Form.Label>
									<Form.Control
										placeholder="snelhest2000@horsemail.com"
										type="email"
										{...register("email", {
											required: "You have to enter an email 🤦🏼‍♂️",
										})}
									/>
									{errors.email && <p className="invalid">{errors.email.message || "Invalid value"}</p>}
								</Form.Group>

								<Form.Group controlId="password" className="mb-3">
									<Form.Label>Password</Form.Label>
									<Form.Control
										type="password"
										autoComplete="new-password"
										{...register("password", {
											required: "You're kidding, right? Enter a password, stupid",
											minLength: {
												message: "Enter at least a few characters",
												value: 3,
											}
										})}
									/>
									{errors.password && <p className="invalid">{errors.password.message || "Invalid value"}</p>}
								</Form.Group>

								<Button
									disabled={isSubmitting}
									type="submit"
									variant="primary"
								>
									{isSubmitting
										? "Logging in..."
										: "Log In"}
								</Button>
							</Form>

							<div className="text-center">
								<Link to="/forgot-password">Forgot Password?</Link>
							</div>
						</Card.Body>
					</Card>

					<div className="text-center">
						Need an account? <Link to="/signup">Sign Up</Link>
					</div>
				</Col>
			</Row>
		</Container>
	)
}

export default LoginPage;
