import { useEffect, useRef, useState } from "react";
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
import { storage } from "../../services/firebase";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import ProgressBar from "react-bootstrap/ProgressBar";

const UpdateProfilewBrowse = () => {
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

	const { handleSubmit, register, watch, reset, resetField } = useForm<UpdateProfileFormData>({
		defaultValues: {
			// email: userEmail || "",
			// name: userName || "",
		},
	});
	const navigate = useNavigate();
	const [photoValues, setPhotoValues] = useState<File | null>(null);
	const [uploadProgress, setUploadProgess] = useState<number | null>(null);

	// Watch the current value of `password` form field
	const passwordRef = useRef("");
	passwordRef.current = watch("password");
	console.log({ currentUser });

	// Watch the current value of `photoFiles` form field
	const photoFilesRef = useRef<FileList | null>(null);
	photoFilesRef.current = watch("photoFiles");

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

			// // Update photoUrl *ONLY* if it has changed
			// if (data.photoFiles !== (userPhotoUrl ?? "")) {
			// 	try {
			// 		setPhotoUrl(data.photoFiles);
			// 		console.log("Trying to update photo");
			// 	} catch (err) {
			// 		console.log(err);
			// 	}
			// }
			console.log("this is photofiles", data.photoFiles);

			if (data.photoFiles.length && data.photoFiles.length) {
				const photo = data.photoFiles[0];
				console.log(photo);
				setPhotoValues(photo);

				const fileRef = ref(storage, `photos/${currentUser!.uid}/${photo.name}`);

				try {
					const uloadresult = await uploadBytes(fileRef, photo);
					console.log("file uploaded");
					const photoURL = await getDownloadURL(uloadresult.ref);
					const uploadTask = uploadBytesResumable(fileRef, photo);
					uploadTask.on(
						"state_changed",
						(snapshot) => {
							// Observe state change events such as progress, pause, and resume
							// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
							const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
							const percentage =
								Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 1000) / 10;
							setUploadProgess(percentage);
							console.log("Upload is " + progress + "% done");
							switch (snapshot.state) {
								case "paused":
									console.log("Upload is paused");
									break;
								case "running":
									console.log("Upload is running");
									break;
							}
						},
						(error) => {
							// Handle unsuccessful uploads
						},
						() => {
							// Handle successful uploads on complete
							// For instance, get the download URL: https://firebasestorage.googleapis.com/...
							getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
								toast.success(`File available at", ${downloadURL}`);
							});
						}
					);

					setPhotoUrl(photoURL);
				} catch (err) {
					console.error("Upload failed");
					toast.error("Upload failed");
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

			reset();
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
		setPhotoValues(null);
		setUploadProgess(null);
	};

	const handleDelete = () => {
		resetField("photoFiles");
	};

	return (
		<Container className="py-3 center-y">
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card className="mb-3">
						<Card.Body>
							<Card.Title className="mb-3">Update Profile</Card.Title>
							<Card.Img
								variant="top"
								// rounded-circle
								src={
									currentUser?.photoURL
										? currentUser?.photoURL
										: "https://fotbolldirekt.se/2024/06/08/har-ar-frankrikes-trupp-i-fotbolls-em-2024"
								}
							/>
							<Button size="sm" onClick={() => setPhotoUrl("")}>
								Delete pic
							</Button>

							<Form onSubmit={handleSubmit(onUpdateProfile)} className="mb-3">
								{/*
									Fill the displayName, photoURL and email form fields with their current value!
								*/}
								<Form.Group controlId="displayName" className="mb-3">
									<Form.Label>Name</Form.Label>
									<Form.Control
										placeholder={userName ? userName : ""}
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

								<Form.Group controlId="photoFiles" className="mb-3">
									<Form.Label>Browse photo</Form.Label>
									<Form.Control
										type="file"
										accept="image/gif,image/jpeg,image/png,image/webp"
										{...register("photoFiles", {
											// required: "Please provide a valid URL",
										})}
									/>
									{/* <span className="mt-2">
										{photoValues && (
											<>
												{photoValues.name} and {Math.floor(photoValues.size / 1024)} kb
											</>
										)}
									</span> */}
									<Form.Text>
										{photoFilesRef.current && photoFilesRef.current.length > 0 && (
											<span>
												{photoFilesRef.current[0].name} ({photoFilesRef.current[0].size} bytes)
											</span>
										)}

										{uploadProgress && (
											<>
												{uploadProgress}% uploaded
												<ProgressBar
													variant={uploadProgress < 100 ? "info" : "success"}
													now={uploadProgress}
												/>
											</>
										)}
									</Form.Text>
									<Button onClick={handleDelete} className="mt-2">
										Delete chosen file
									</Button>
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

export default UpdateProfilewBrowse;
