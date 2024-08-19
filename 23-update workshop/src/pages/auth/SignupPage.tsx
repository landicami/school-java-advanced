import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { SignupCredentials } from "../../types/User.types";
import { FirebaseError } from "firebase/app";
import { toast } from "react-toastify";

const SignupPage = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { handleSubmit, register, watch, formState: { errors } } = useForm<SignupCredentials>();
	const { signup } = useAuth();
	const navigate = useNavigate();

	// Watch the current value of `password` form field
	const passwordRef = useRef("");
	passwordRef.current = watch("password");

	const onSignup: SubmitHandler<SignupCredentials> = async (data) => {
		setIsSubmitting(true);

		// Pass email and password along to signup in AuthContext
		try {
			await signup(data.email, data.password);

			// If successful, toast the user and redirect to the home page
			toast.success("Yayyy, you gots account!");
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
							<Card.Title className="mb-3">Sign Up</Card.Title>

							<Form onSubmit={handleSubmit(onSignup)} className="mb-3">
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
									<Form.Text>At least 6 characters</Form.Text>
								</Form.Group>

								<Form.Group controlId="confirmPassword" className="mb-3">
									<Form.Label>Confirm Password</Form.Label>
									<Form.Control
										type="password"
										autoComplete="off"
										{...register("confirmPassword", {
											required: "Enter your password again......",
											minLength: {
												message: "Enter at least a few characters",
												value: 3,
											},
											validate: (value) => {
												return value === passwordRef.current || "The passwords do not match 🤦🏼‍♂️";
											}
										})}
									/>
									{errors.confirmPassword && <p className="invalid">{errors.confirmPassword.message || "Invalid value"}</p>}
								</Form.Group>

								<Button
									disabled={isSubmitting}
									type="submit"
									variant="primary"
								>
									{isSubmitting
										? "Creating account..."
										: "Create Account"}
								</Button>
							</Form>

							<div className="text-center">
								<Link to="/forgot-password">Forgot Password?</Link>
							</div>
						</Card.Body>
					</Card>

					<div className="text-center">
						Already have an account? <Link to="/login">Log In</Link>
					</div>
				</Col>
			</Row>
		</Container>
	)
}

export default SignupPage;
