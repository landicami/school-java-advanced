import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from "react-bootstrap/Image";
import { Dog } from '../types/dogAPI';
import Button from 'react-bootstrap/Button';
import useAxiosDog from '../hooks/useAxiosDog';

const RandomDogPage = () => {
// 	const [data, setData] = useState<Dog | null>(null);
// 	const [url, setUrl] = useState<string | null>(null)
// 	const [isLoading, setIsLoading] = useState(false);

// 	const getData = async (resourseURL: string) => {
// 		setData(null);
// 		setUrl(null);
// 		setIsLoading(true)
// 		const res = await axios.get<Dog>(resourseURL);
// 		setData(res.data);
// 		setIsLoading(false)

// 	}


// //här gör vi att det inte hämtas något direkt utan först när vi trycker på knapp
// 	useEffect(() => {
// 		if(!url) {
// 			return;
// 		}

// 		getData(url);
// 	}, [url]);
const { data, isLoading, setUrl } = useAxiosDog();

  return (
	<>
		{isLoading && <p>Loading...</p>}

		<h1>En random dog</h1>

		{data && data.status === "success" && (
			<div>
				<Image src={data.message} alt="A random doggy" fluid />
			</div>
			)
			}

		<Button className='btn btn-warning' onClick={() => setUrl("https://dog.ceo/api/breeds/image/random")}>
			Get new doggman
		</Button>
		<Button className='btn btn-primary' onClick={() => setUrl("https://dog.ceo/api/breed/shiba/images/random")}>
		Get specifik doggman
		</Button>

	</>
  )
}

export default RandomDogPage
