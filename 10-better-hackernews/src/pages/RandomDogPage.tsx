import Image from "react-bootstrap/Image";
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
const { data, isLoading, error, handleSetUrl, lastUrlRef } = useAxiosDog();

  return (
	<>

		<h1>En random dog</h1>

		{isLoading && <h2>Loading...</h2>}


		{error && <h2>{error}</h2>}

		{data && data.status === "success" && (
			<div>
				<Image src={data.message} alt="A random doggy" fluid />
			</div>
			)
			}

		<Button className='btn btn-warning' onClick={() => handleSetUrl("https://dog.ceo/api/breeds/image/random")}>
			Get new doggman
		</Button>
		<Button className='btn btn-primary me-2' onClick={() => handleSetUrl("https://dog.ceo/api/breed/shiba/images/random")}>
		Get specifik doggman
		</Button>
		<Button className='btn btn-info me-2' onClick={() => handleSetUrl(lastUrlRef.current)}>
		Get same shit
		</Button>
		<Button className='btn btn-danger me-2' onClick={() => handleSetUrl("http://google.som")}>
		DOH!
		</Button>

	</>
  )
}

export default RandomDogPage
