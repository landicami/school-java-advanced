import Container from "react-bootstrap/Container";
import Ratio from 'react-bootstrap/Ratio';

const HomePage = () => {
	return (
		<Container className="py-3">
			<h1>Eins, Zwei, Polizei 🚓💃🏼🚨🕺🔊</h1>

			<Ratio aspectRatio="16x9">
				<iframe width="560" height="315" src="https://www.youtube.com/embed/dSy2DcATYUo?si=F2OJ-AljRIJUEXhD&hd=1&modestbranding=1" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
			</Ratio>
		</Container>
	);
};

export default HomePage;
