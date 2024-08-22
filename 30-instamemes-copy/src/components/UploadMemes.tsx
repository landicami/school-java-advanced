import { useCallback } from "react";
import Image from "react-bootstrap/Image";
import { useDropzone } from "react-dropzone";
import imgDrop from "../assets/images/sad-kitten.gif";
import { clsx } from "clsx";
import { toast } from "react-toastify";

const UploadMemes = () => {
	//const { uploadMeme} = useUploadMeme();
	const onDrop = useCallback((acceptedFiles: File[]) => {
		if (!acceptedFiles.length) {
			toast.warning("Don't add that!");
			return;
		}
		console.log(acceptedFiles);
	}, []);

	const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
		accept: {
			"image/png": [],
			"image/jpeg": [],
			"image/gif": [],
			"image/webp": [],
		},
		maxFiles: 1,
		maxSize: 4 * 1024 * 1024, // 4 mb
		onDrop,
	});

	const dropzoneWrapperClasses = clsx({
		"drag-accept": isDragAccept,
		"drag-reject": isDragReject,
	});

	return (
		<div {...getRootProps()} id="dropzone-wrapper" className={dropzoneWrapperClasses}>
			<input {...getInputProps()} />
			{isDragActive ? (
				<div className="">
					{/* <Image fluid src={imgDrop} title="Drop it like its hot" /> */}
					<p>Drop your files here</p>
				</div>
			) : (
				<div className="">
					<p className="m-5">Drag 'n' drop some files here, or click to select files!</p>
				</div>
			)}

			{isDragReject && <p>Please choose another file that is jpeg, gif, osv</p>}
			{isDragAccept && <p>That's workis</p>}

			{/* Upload Progress Bar */}
			{/* {uploadMeme.progress !== null && (
			<ProgressBar
				animated
				label={`${uploadMeme.progress}%`}
				now={uploadMeme.progress}
				variant="success"
			/>
		)}

		{uploadMeme.isError && <Alert variant="danger">😳 {uploadMeme.error}</Alert>}
		{uploadMeme.isSuccess && <Alert variant="success">😂 that was a funny meme!</Alert>} */}
		</div>
	);
};

export default UploadMemes;
