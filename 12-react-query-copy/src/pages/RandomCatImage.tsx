import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { getRandomBreed, getRandomCat } from '../services/RandomCatAPI';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import LoadingSpinner from '../components/LoadingSpinner';
import { Container } from 'react-bootstrap';

const RandomCatImage = () => {
	const [breed, setBreed] = useState("");

	const getRandomCatFromApi = useQuery({
		queryKey: ["catImage"],
		queryFn: getRandomCat,
	});

	const getRandomBreedFromApi = useQuery({
		queryKey: ["breedImage", breed],
		queryFn: () => getRandomBreed(breed),
	});

	// const breedId1 = "abys";

	// const { data: abysData, isFetching: isFetchingAbys, refetch: refetchAbys } = useQuery({
	// 	queryKey: ["breedImage", breedId1],
	// 	queryFn: () => getRandomBreed(breedId1),
	//   });

	//   const breedId2 = "beng";

	// const { data: bengData, isFetching: isFetchingBeng, refetch: refetchBeng } = useQuery({
	// 	queryKey: ["breedImage", breedId2],
	// 	queryFn: () => getRandomBreed(breedId2),
	//   });



	return (
	  <Container className='row position-relative'>
		<h1>Get me random cat without hair</h1>
		{getRandomCatFromApi.isFetching &&
		<LoadingSpinner />}



		{getRandomCatFromApi.data ? (
			getRandomCatFromApi.data.map(cat =>
		 <div key={cat.id} className='col-4'>
		<Image
		fluid
		roundedCircle
		src={cat.url}
		alt="Cat in a image">

		</Image>
		</div>)
		):
		(
			getRandomBreedFromApi.data && getRandomBreedFromApi.data.map(cat =>
			<div key={cat.id} className='col-4'>
		   <Image
		   fluid
		   roundedCircle
		   src={cat.url}
		   alt="Cat in a image">

		   </Image>
		   </div>))
		   }
		<div className='col-4'>
		<Button
			className="mt-2"
			variant="success"
			onClick={() => {getRandomCatFromApi.refetch()}}
			>New cat pronto!
		</Button>
		</div>
		<ButtonGroup className="ms-2">
					<Button variant="secondary" onClick={() => setBreed("")}>Any</Button>
					<Button variant="secondary" onClick={() => setBreed("ragd")}>Ragdoll</Button>
					<Button variant="secondary" onClick={() => setBreed("sibe")}>Siberian</Button>
					<Button variant="secondary" onClick={() => setBreed("beng")}>Bengal</Button>
					<Button variant="secondary" onClick={() => setBreed("pers")}>Persian</Button>
					<Button variant="secondary" onClick={() => setBreed("norw")}>Norwegian</Button>
					<Button variant="secondary" onClick={() => setBreed("sphy")}>Sphynx</Button>
				</ButtonGroup>


    </Container>






	);
  };

export default RandomCatImage

{/* {abysData && abysData.map(breedCat =>
        <div key={breedCat.id} className='col-4'>
          <Image
            fluid
            roundedCircle
            src={breedCat.url}
            alt="Breed Cat in a image">
          </Image>
        </div>
      )}

		{bengData && bengData.map(breedCat =>
        <div key={breedCat.id} className='col-4'>
          <Image
            fluid
            roundedCircle
            src={breedCat.url}
            alt="Breed Cat in a image">
          </Image>
        </div>
      )} */}


		{/* <div className='col-4'>

			<Button
			className="mt-2"
			variant="primary"
			onClick={() => { refetchAbys() }}
			>
			Abys cat pronto!
			</Button>
		</div>

      {isFetchingAbys && <LoadingSpinner />}


		<div className='col-4'>

			<Button
			className="mt-2"
			variant="warning"
			onClick={() => { refetchBeng() }}
		>
			Beng cat pronto!
			</Button>
			</div>
      {isFetchingBeng && <LoadingSpinner />} */}
