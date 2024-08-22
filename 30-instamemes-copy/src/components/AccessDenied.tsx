import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import imgAccessDenied from "../assets/images/access-denied-gandalf.jpg";

const AccessDenied = () => {
	return (
		<Container className="py-3">
			<Image
				src={imgAccessDenied}
				fluid
				alt="Gandalf from Lord of the Rings saying 'Access Denied'"
			/>
		</Container>
	)
}

export default AccessDenied
