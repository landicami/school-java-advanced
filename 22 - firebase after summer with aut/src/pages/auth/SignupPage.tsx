import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignUpCredentials } from "../../types/User.types";
import { useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { FirebaseError } from "firebase/app";

const SignupPage = () => {
	const navigate = useNavigate();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const {
		handleSubmit,
		register,
		watch,
		formState: { errors },
	} = useForm<SignUpCredentials>();

	//kommer innehålla värdet som står i passwordfältet
	const passWordRef = useRef("");
	passWordRef.current = watch("password");

	const { signUp } = useAuth();

	const onSignup: SubmitHandler<SignUpCredentials> = async (data) => {
		setIsSubmitting(true);
		try {
			const userCredential = await signUp(data.email, data.password);
			if (userCredential) {
				toast.success("YAY it worked by signing up");
				navigate("/");
			}
		} catch (err) {
			if (err instanceof FirebaseError) {
				toast.error(err.message);
			} else if (err instanceof Error) {
				toast.error(err.message);
			} else {
				toast.error("NAJ");
			}
		}
		setIsSubmitting(false);
	};

	return (
		<Container className="py-3 center-y">
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card>
						<Card.Body>
							<Card.Title className="mb-2">Signup Please!</Card.Title>
							<p>Enter email and password!</p>

							<Form onSubmit={handleSubmit(onSignup)}>
								<Form.Group className="mb-2" controlId="email">
									<Form.Label>Email</Form.Label>
									<Form.Control
										type="email"
										placeholder="example@example.com"
										{...register("email", {
											required: "You have to enter an email",
										})}
									/>
									{errors.email && (
										<p className="invalid">{errors.email.message || "Invalid value"}</p>
									)}
								</Form.Group>

								<Form.Group className="mb-2" controlId="password">
									<Form.Label>Password</Form.Label>
									<Form.Control
										autoComplete="new-password"
										type="password"
										{...register("password", {
											required: "You're kidding, right? Enter a password, stupid",
											minLength: {
												message: "Enter at least a few characters",
												value: 3,
											},
										})}
									/>
									{errors.password && (
										<p className="invalid">{errors.password.message || "Invalid value"}</p>
									)}
									<Form.Text>At least 6 characters</Form.Text>
								</Form.Group>

								<Form.Group className="mb-3" controlId="confirmPassword">
									<Form.Label>Confirm Password</Form.Label>
									<Form.Control
										type="password"
										autoComplete="off"
										{...register("confirmPassword", {
											required: "Enter your password again...",
											minLength: {
												message: "Enter at least a few characters",
												value: 3,
											},
											validate: (value) => {
												return value === passWordRef.current || "No match in psw";
											},
										})}
									/>
									{errors.confirmPassword && (
										<p className="invalid">{errors.confirmPassword.message || "Invalid value"}</p>
									)}
								</Form.Group>

								<Button disabled={isSubmitting} type="submit" variant="primary">
									{isSubmitting ? "Creating account..." : "Create Account"}
								</Button>
							</Form>

							<div className="text-center mt-3">
								<Link to="/forgot-psw">Forgot password?</Link>
							</div>
						</Card.Body>
					</Card>

					<div className="text-center mt-3">
						Already have an account?
						<br />
						<Link to="/login">Log in!</Link>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default SignupPage;
