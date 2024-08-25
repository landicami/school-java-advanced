import Container from "react-bootstrap/Container";
import useAuth from "../hooks/useAuth";
import UploadMemes from "../components/UploadMemes";
import useGetMemes from "../hooks/useGetMemes";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import MemeCard from "../components/MemeCard";

const HomePage = () => {
	const { currentUser } = useAuth();
	const { data: memes, loading } = useGetMemes();

	return (
		<Container className="py-3">
			<h1>InstaMemes</h1>
			<h2>Meme-Lord</h2>
			<hr />

			{/* upload memes if logged in */}
			{currentUser && <UploadMemes />}
			<hr />
			{loading && <p>Loading memes...</p>}
			{memes && memes.length > 0 && (
				<Row xs={1} sm={2} md={3} lg={4}>
					{memes.map((meme) => (
						<Col key={meme._id} className="d-flex mb-4">
							<MemeCard meme={meme} />
						</Col>
					))}
				</Row>
			)}
		</Container>
	);
};

export default HomePage;
