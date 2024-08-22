import { useCallback } from "react";
import Image from "react-bootstrap/Image";
import { useDropzone } from "react-dropzone";
import imgDrop from "../assets/images/sad-kitten.gif";

const UploadMemes = () => {
	const onDrop = useCallback((acceptedFiles: File[]) => {
		console.log(acceptedFiles);
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
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

	return (
		<div {...getRootProps()} id="dropzone-wrapper">
			<input {...getInputProps()} />
			{isDragActive ? (
				<div className="border drag">
					<p className="m-5">Drop the files here ...</p>
					<Image fluid src={imgDrop} title="Drop it like its hot" />
				</div>
			) : (
				<div className="border drag">
					<p className="m-5">Drag 'n' drop some files here, or click to select files!</p>
				</div>
			)}
		</div>
	);
};

export default UploadMemes;
