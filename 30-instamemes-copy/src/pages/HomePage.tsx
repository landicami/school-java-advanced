import Container from "react-bootstrap/Container";
import useAuth from "../hooks/useAuth";
import UploadMemes from "../components/UploadMemes";

const HomePage = () => {
	const { currentUser } = useAuth();

	return (
		<Container className="py-3">
			<h1>InstaMemes</h1>
			<h2>Meme-Lord</h2>
			<hr />

			{/* upload memes if logged in */}
			{currentUser && <UploadMemes />}
			<hr />
			<p>Here be memes</p>
		</Container>
	);
};

export default HomePage;
