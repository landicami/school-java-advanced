import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { memesCol, storage } from "../services/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import useAuth from "./useAuth";

const useUploadMeme = () => {
	const [error, setError] = useState<string | null>(null);
	const [isError, setIsError] = useState<boolean | null>(null);
	const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
	const [isUploading, setIsUploading] = useState<boolean | null>(null);
	const [progress, setProgress] = useState<number | null>(null);

	// new phone who dis? 🍌
	const { currentUser } = useAuth();

	if (!currentUser) {
		throw new Error("Only authenticated users may upload using this hook.");
	}

	const upload = async (image: File) => {
		// reset internal state
		setError(null);
		setIsError(null);
		setIsSuccess(null);
		setIsUploading(null);
		setProgress(null);

		try {
			// generate a uuid for the file
			const uuid = uuidv4(); // "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"

			// extract file extension from filename
			const ext = image.name.substring(image.name.lastIndexOf(".") + 1); // "png"

			// construct filename to save image as
			const storageFilename = `${image.name}_${uuid}.${ext}`; // "lolcat_9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d.png"

			/**
			 * upload file to storage
			 */

			// create reference to the file in storage
			const storageRef = ref(storage, `memes/${storageFilename}`);

			// start dat upload
			const uploadTask = uploadBytesResumable(storageRef, image);

			// 👂🏻 listen for state changes on upload
			uploadTask.on("state_changed", (snapshot) => {
				// 🗣️ update progress
				setProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 1000) / 10);
			});

			// wait for upload to complete
			await uploadTask.then();

			// get download url to uploaded image
			const url = await getDownloadURL(storageRef);

			/**
			 * create document in database for the uploaded file
			 */

			// create reference to document in "memes"-collection
			const docRef = doc(memesCol);

			// create document in db for the uploaded image
			await setDoc(docRef, {
				_id: docRef.id,
				created_at: serverTimestamp(),
				name: image.name,
				path: storageRef.fullPath,
				size: image.size,
				type: image.type,
				uid: currentUser.uid,
				url,
			});

			/**
			 * profit 💰
			 */
			setIsError(false);
			setIsSuccess(true);
			setProgress(null);

			console.log("Phew...");
		} catch (err) {
			// catch! 🎾
			console.error("Error thrown when uploading:", err);
			setIsError(true);
			setIsSuccess(false);

			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("Task failed successfully! Try again?!");
			}
		} finally {
			setIsUploading(false);
		}
	};

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
