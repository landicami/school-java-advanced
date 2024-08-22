import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../services/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import useAuth from "./useAuth";

const useUploadMeme = () => {};
const { currentUser } = useAuth();
const [error, setError] = useState<string | null>(null); //innehåller felmeddelandet
const [isError, setIsError] = useState<boolean | null>(null);
const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
const [isUploading, setIsUploading] = useState<boolean | null>(null);
const [progress, setIsProgress] = useState<number | null>(null);

const resetStates = () => {
	setError(null);
	setIsError(null);
	setIsSuccess(null);
	setIsUploading(null);
	setIsProgress(null);
};

const upload = async (image: File) => {
	resetStates();

	try {
		const uuid = uuidv4();
		const ext = image.name.substring(image.name.lastIndexOf("." + 1));
		const storageFileName = image.name + "_" + uuid + "." + ext;
		const storageRef = ref(storage, `memes/${storageFileName}`);

		const uploadTask = uploadBytesResumable(storageRef, image);

		uploadTask.on("state_changed", (snapshot) => {
			const progressNumber = ((snapshot.bytesTransferred / snapshot.totalBytes) * 1000) / 10;
			setIsProgress(progressNumber);
		});

		await uploadTask.then();

		const url = await getDownloadURL(storageRef);

		setIsSuccess(true);
		setIsError(false);
		setIsProgress(null);
	} catch (err) {
		console.error("Error from uploading");
		setIsError(true);
		setIsSuccess(false);
		if (err instanceof Error) {
			setError(err.message);
		} else {
			setError("Something went wrong");
		}
	} finally {
		setIsUploading(false);
	}

	return {
		error,
		isError,
		isSuccess,
		isUploading,
		progress,
		upload,
	};
};
export default useUploadMeme;
