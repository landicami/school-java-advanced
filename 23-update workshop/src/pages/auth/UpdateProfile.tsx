import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { UpdateProfileFormData } from "../../types/User.types";
import { FirebaseError } from "firebase/app";
import { toast } from "react-toastify";
import { reload } from "firebase/auth";

const UpdateProfile = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const {
		signup,
		currentUser,
		setEmail,
		setDisplayName,
		setPassword,
		setPhotoUrl,
		reloadUser,
		userEmail,
		userName,
		userPhotoUrl,
	} = useAuth();

	const {
		handleSubmit,
		register,
		watch,
		reset,
		formState: { errors, isSubmitSuccessful },
	} = useForm<UpdateProfileFormData>({
		defaultValues: {
			email: userEmail || "",
			name: userName || "",
			photoUrl: userPhotoUrl || "",
		},
	});
	const navigate = useNavigate();

	// Watch the current value of `password` form field
	const passwordRef = useRef("");
	passwordRef.current = watch("password");
	console.log({ currentUser });

	const onUpdateProfile: SubmitHandler<UpdateProfileFormData> = async (data) => {
		// Update user profile
		try {
			// Disable update-button while update is in progress
			setIsSubmitting(true);

			// Update displayName *ONLY* if it has changed
			if (data.name !== (userName ?? "")) {
				try {
					setDisplayName(data.name);
					console.log("Trying to update name");
				} catch (err) {
					console.log(err);
				}
			}

			// Update photoUrl *ONLY* if it has changed
			if (data.photoUrl !== (userPhotoUrl ?? "")) {
				try {
					setPhotoUrl(data.photoUrl);
					console.log("Trying to update photo");
				} catch (err) {
					console.log(err);
				}
			}

			// Update email *ONLY* if it has changed
			if (data.email && (userEmail ?? "")) {
				try {
					setEmail(data.email);
					console.log("Trying to update email");
				} catch (err) {
					console.log(err);
				}
			}
			// Update password *ONLY* if the user has provided a new password to set
			if (data.password) {
				try {
					setPassword(data.password);
					console.log("Trying to update password");
				} catch (err) {
					console.log(err);
				}
			}

			// Show success toast 🥂
			toast.success("Updated user");

			// Reload user data
			reloadUser();
		} catch (err) {
			console.error("Error thrown when updating user profile:", err);

			if (err instanceof FirebaseError) {
				toast.error(err.message);
			} else if (err instanceof Error) {
				toast.error(err.message);
			} else {
				toast.error("Something went wrong. Have you tried turning it off and on again?");
			}
		}

		// Enable update-button again
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
							<Card.Title className="mb-3">Update Profile</Card.Title>
							<Card.Img
								variant="top"
								src={
									currentUser?.photoURL
										? currentUser?.photoURL
										: "https://fotbolldirekt.se/2024/06/08/har-ar-frankrikes-trupp-i-fotbolls-em-2024"
								}
							/>

							<Form onSubmit={handleSubmit(onUpdateProfile)} className="mb-3">
								{/*
									Fill the displayName, photoURL and email form fields with their current value!
								*/}
								<Form.Group controlId="displayName" className="mb-3">
									<Form.Label>Name</Form.Label>
									<Form.Control
										placeholder={currentUser?.displayName ? currentUser?.displayName : "Name"}
										type="text"
										{...register("name", {
											minLength: {
												value: 3,
												message: "If you have a name, it has to be at least 3 characters long",
											},
										})}
									/>
									{/* {errors.name && <p className="invalid">{errors.name.message || "Invalid value"}</p>} */}
								</Form.Group>

								<Form.Group controlId="photoUrl" className="mb-3">
									<Form.Label>Photo URL</Form.Label>
									<Form.Control
										placeholder={currentUser?.photoURL ? currentUser?.photoURL : "PhotoURL"}
										type="url"
										{...register("photoUrl", {
											// required: "Please provide a valid URL",
										})}
									/>
									{/* {errors.photoUrl && (
										<p className="invalid">{errors.photoUrl.message || "Invalid value"}</p>
									)} */}
								</Form.Group>

								<Form.Group controlId="email" className="mb-3">
									<Form.Label>Email</Form.Label>
									<Form.Control
										placeholder={userEmail ? userEmail : "Email"}
										type="email"
										{...register("email", {
											// required: "You have to enter an email 🤦🏼‍♂️",
										})}
									/>
									{/* {errors.email && (
										<p className="invalid">{errors.email.message || "Invalid value"}</p>
									)} */}
								</Form.Group>

								<Form.Group controlId="password" className="mb-3">
									<Form.Label>Password</Form.Label>
									<Form.Control
										type="password"
										autoComplete="new-password"
										{...register("password", {
											// required: "You're kidding, right? Enter a password, stupid",
											minLength: {
												message: "Enter at least a few characters",
												value: 3,
											},
										})}
									/>
									{/* {errors.password && (
										<p className="invalid">{errors.password.message || "Invalid value"}</p>
									)} */}
									<Form.Text>At least 6 characters</Form.Text>
								</Form.Group>

								<Form.Group controlId="confirmPassword" className="mb-3">
									<Form.Label>Confirm Password</Form.Label>
									<Form.Control
										type="password"
										autoComplete="off"
										{...register("confirmPassword", {
											// required: "Enter your password again......",
											minLength: {
												message: "Enter at least a few characters",
												value: 3,
											},
											// validate: (value) => {
											// 	return value === passwordRef.current || "The passwords do not match 🤦🏼‍♂️";
											// },
										})}
									/>
									{/* {errors.confirmPassword && (
										<p className="invalid">{errors.confirmPassword.message || "Invalid value"}</p>
									)} */}
								</Form.Group>

								<Button disabled={isSubmitting} type="submit" variant="primary">
									{isSubmitting ? "Updating profile..." : "Save"}
								</Button>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default UpdateProfile;
