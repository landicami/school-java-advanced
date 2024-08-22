import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { UpdateProfileFormData } from "../../types/User.types";
import { FirebaseError } from "firebase/app";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../services/firebase";

const UpdateProfile = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const {
		currentUser,
		reloadUser,
		setDisplayName,
		setEmail,
		setPassword,
		setPhotoUrl,
		userEmail,
		userName,
		userPhotoUrl,
	} = useAuth();
	const {
		handleSubmit,
		register,
		watch,
		formState: { errors },
	} = useForm<UpdateProfileFormData>({
		defaultValues: {
			email: userEmail ?? "",
			name: userName ?? "",
		},
	});

	// Watch the current value of `password` form field
	const passwordRef = useRef("");
	passwordRef.current = watch("password");

	const onUpdateProfile: SubmitHandler<UpdateProfileFormData> = async (data) => {
		// Update user profile
		try {
			// Disable update-button while update is in progress
			setIsSubmitting(true);

			// Update displayName *ONLY* if it has changed
			if (data.name !== (userName ?? "")) {
				console.log("Updating display name...");
				await setDisplayName(data.name);
			}

			// Only upload a photo if one has been selected
			if (data.photoFiles.length) {
				const photo = data.photoFiles[0];
				console.log("📸", photo);

				// create a reference to upload the file to
				// example: "photos/Wa0uTpQsUyg4n9bkaZH8pN8Fj2C3/snel-hest.jpg"
				const fileRef = ref(storage, `users/${currentUser?.uid}/${photo.name}`);

				try {
					// upload photo to fileRef
					const uploadResult = await uploadBytes(fileRef, photo);

					// get download url to uploaded file
					const photoUrl = await getDownloadURL(uploadResult.ref);

					console.log("Photo successfully uploaded, URL is: ", photoUrl);

					// set download url as the user's photoUrl
					await setPhotoUrl(photoUrl);
				} catch (err) {
					console.error("Upload failed!", err);
					toast.error("Upload failed 🥺!");
				}
			}

			// Update email *ONLY* if it has changed
			if (data.email !== (userEmail ?? "")) {
				console.log("Updating email...");
				await setEmail(data.email);
			}

			// Update password *ONLY* if the user has provided a new password to set
			if (data.password) {
				console.log("Updating password...");
				await setPassword(data.password);
			}

			// Reload user data
			reloadUser();

			// Show success toast 🥂
			toast.success("Profile successfully updated");
			console.log("All ok 👍🏻👍🏻👍🏻");
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

	return (
		<Container className="py-3 center-y">
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card className="mb-3">
						<Card.Body>
							<Card.Title className="mb-3">Update Profile</Card.Title>

							<div className="profile-photo-wrapper text-center my-3">
								<div className="d-flex justify-content-center mb-2">
									<Image
										src={
											userPhotoUrl ||
											"https://via.placeholder.com/500?text=Y%20U%20NO%20PHOTO%20HAS"
										}
										fluid
										roundedCircle
										className="img-square w-75"
									/>
								</div>
								{/* Here be button to delete photo when we do the file upload thingy */}
							</div>

							<Form onSubmit={handleSubmit(onUpdateProfile)} className="mb-3">
								{/*
									Fill the displayName, photoURL and email form fields with their current value!
								*/}
								<Form.Group controlId="displayName" className="mb-3">
									<Form.Label>Name</Form.Label>
									<Form.Control
										placeholder="Snel Hest"
										type="text"
										{...register("name", {
											minLength: {
												value: 3,
												message: "If you have a name, it has to be at least 3 characters long",
											},
										})}
									/>
									{errors.name && <p className="invalid">{errors.name.message || "Invalid value"}</p>}
								</Form.Group>

								<Form.Group controlId="photoFiles" className="mb-3">
									<Form.Label>Photo</Form.Label>
									<Form.Control
										accept="image/gif,image/jpeg,image/png,image/webp"
										type="file"
										{...register("photoFiles")}
									/>
									{errors.photoFiles && (
										<p className="invalid">{errors.photoFiles.message || "Invalid value"}</p>
									)}
								</Form.Group>

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

								<Form.Group controlId="password" className="mb-3">
									<Form.Label>Password</Form.Label>
									<Form.Control
										type="password"
										autoComplete="new-password"
										{...register("password", {
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

								<Form.Group controlId="confirmPassword" className="mb-3">
									<Form.Label>Confirm Password</Form.Label>
									<Form.Control
										type="password"
										autoComplete="off"
										{...register("confirmPassword", {
											minLength: {
												message: "Enter at least a few characters",
												value: 3,
											},
											validate: (value) => {
												return (
													!passwordRef.current ||
													value === passwordRef.current ||
													"The passwords do not match 🤦🏼‍♂️"
												);
											},
										})}
									/>
									{errors.confirmPassword && (
										<p className="invalid">{errors.confirmPassword.message || "Invalid value"}</p>
									)}
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
