import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { getRandomBreed, getRandomCat } from '../services/RandomCatAPI';
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import LoadingSpinner from '../components/LoadingSpinner';

const RandomCatImage = () => {
	const {
		data,
		isFetching,
		refetch
	} = useQuery({
		queryKey: ["catImage"],
		queryFn: getRandomCat,
	});

	const breedId = "abys";

	const { data: breedData, isFetching: isFetchingBreed, refetch: refetchBreed } = useQuery({
		queryKey: ["breedImage", breedId],
		queryFn: () => getRandomBreed(breedId),
	  });

console.log(data)

	return (
	  <>
		<h1>Get me random cat without hair</h1>
		{isFetching &&
		<LoadingSpinner />}

		{data && data.map(cat =>
		 <div key={cat.id} className='col-4'>
		<Image
		fluid
		roundedCircle
		src={cat.url}
		alt="Cat in a image">

		</Image>
		</div>)}

		<Button
			className="mt-2"
			variant="success"
			onClick={() => {refetch()}}
			>New cat pronto!
		</Button>

		<Button
        className="mt-2"
        variant="primary"
        onClick={() => { refetchBreed() }}
      >
        Abys cat pronto!
      </Button>

      {isFetchingBreed && <LoadingSpinner />}

      {breedData && breedData.map(breedCat =>
        <div key={breedCat.id} className='col-4'>
          <Image
            fluid
            roundedCircle
            src={breedCat.url}
            alt="Breed Cat in a image">
          </Image>
        </div>
      )}
    </>


	);
  };

export default RandomCatImage
