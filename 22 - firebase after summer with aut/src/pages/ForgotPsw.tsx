import { useState } from "react";
import useAuth from "../hooks/useAuth";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { FirebaseError } from "firebase/app";
import { resetPsw } from "../types/User.types";

const ForgotPsw = () => {
	const { forgotPswdUser } = useAuth();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors, isSubmitSuccessful },
	} = useForm<resetPsw>();

	const onReset: SubmitHandler<resetPsw> = async (data) => {
		setIsSubmitting(true);

		// Pass email
		try {
			await forgotPswdUser(data.email);

			// Celebrate
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
	};
	if (isSubmitSuccessful) {
		reset();
	}

	return (
		<Container className="py-3 center-y">
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card className="mb-3">
						<Card.Body>
							<Card.Title className="mb-3">Reset</Card.Title>

							<Form onSubmit={handleSubmit(onReset)} className="mb-3">
								<Form.Group controlId="email" className="mb-3">
									<Form.Label>Email</Form.Label>
									<Form.Control
										placeholder="snelhest2000@horsemail.com"
										type="email"
										{...register("email", {
											required: "You have to enter an email 🤦🏼‍♂️",
										})}
									/>
									{errors.email && (
										<p className="invalid">{errors.email.message || "Invalid value"}</p>
									)}
								</Form.Group>

								<Button disabled={isSubmitting} type="submit" variant="primary">
									{isSubmitting ? "Resetting" : "Reset"}
								</Button>
							</Form>
							<p>
								Om denna e-postadress är registrerad kommer du att få ett mejl för att återställa ditt
								lösenord.
							</p>
						</Card.Body>
					</Card>

					<div className="text-center">
						Need an account? <Link to="/signup">Sign Up</Link>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default ForgotPsw;
