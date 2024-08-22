import { FirebaseError } from "firebase/app";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { ForgotPasswordCredentials } from "../../types/User.types";

const ForgotPasswordPage = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [resetPasswordSent, setResetPasswordSent] = useState(false);
	const { handleSubmit, register, formState: { errors } } = useForm<ForgotPasswordCredentials>();
	const { resetPassword } = useAuth();

	const onForgotPassword: SubmitHandler<ForgotPasswordCredentials> = async (data) => {
		setIsSubmitting(true);

		// Try to send the "forgot password" link to the provided email (if the user exists)
		try {
			await resetPassword(data.email);

			// If successful, tell the user to check their email
			setResetPasswordSent(true);
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
							<Card.Title className="mb-3">Forgot Password?</Card.Title>

							{resetPasswordSent && (
								<Alert variant="success">
									<p>We've sent you a password reset link to the provided email (if the email has an account). Please check your spam-folder if the email hasn't arrived in a few minutes.</p>
								</Alert>
							)}

							<p>Enter your email address and we will send you a password reset link.</p>

							<Form onSubmit={handleSubmit(onForgotPassword)} className="mb-3">
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

								<Button
									disabled={isSubmitting}
									type="submit"
									variant="primary"
								>
									{isSubmitting
										? "Sending email..."
										: "Send password reset email"}
								</Button>
							</Form>
						</Card.Body>
					</Card>

					<div className="text-center">
						Suddenly remembered your password? <Link to="/login">Log In</Link>
					</div>
				</Col>
			</Row>
		</Container>
	)
}

export default ForgotPasswordPage;
