import React from "react";
import { Meme } from "../types/Meme.types";
import Card from "react-bootstrap/Card";

interface MemeCardProps {
	meme: Meme;
}

const MemeCard: React.FC<MemeCardProps> = ({ meme }) => {
	return (
		<Card>
			<Card.Header>{meme.name}</Card.Header>
			<a href={meme.url} target="_blank" rel="noreferrer nofollow">
				<Card.Img src={meme.url} />
			</a>
			<Card.Footer>{Math.round(meme.size / 1024)} kB</Card.Footer>
			{/* {meme.uid === currentUser.uid && (<Button>Delete</Button>)} */}
		</Card>
	);
};

export default MemeCard;
