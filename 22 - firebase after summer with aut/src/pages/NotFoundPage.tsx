import Image from "react-bootstrap/Image";
import SadKittyCat from "../assets/images/sad-kitten.gif";
import Container from "react-bootstrap/Container";

const NotFoundPage = () => {
	return (
		<Container className="py-3">
			<h1>Sorry, that page could not be found 😔</h1>

			<Image src={SadKittyCat} fluid />
		</Container>
	);
};

export default NotFoundPage;
