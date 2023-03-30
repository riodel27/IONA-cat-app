import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

import fetchCatsByBreed from '../api';
import BreedSelect from '../components/BreedSelect';
import CatList from '../components/CatList/CatList';
import { Cat, CatBreed } from '../types/types';

const catBreeds: CatBreed[] = [
	{ id: 'abys', name: 'Abyssinian' },
	{ id: 'abob', name: 'American Bobtail' },
	{ id: 'siam', name: 'Siamese' },
];

function HomePage() {
	const [breed, setBreed] = useState('');
	const [cats, setCats] = useState<Cat[]>([]);

	useEffect(() => {
		if (breed) {
			const fetchCats = async () => {
				const fetchedCats = await fetchCatsByBreed({ breedId: breed });
				setCats(fetchedCats);
			};
			fetchCats().catch((error) => console.log(error));
		}
	}, [breed]);

	const handleSelectBreedChange = (value: string) => {
		setBreed(value);
	};

	return (
		<div>
			<BreedSelect options={catBreeds} onChange={handleSelectBreedChange} />

			{!breed ? (
				<>
					<p>No cats available</p>
				</>
			) : (
				<>
					<CatList cats={cats} />
				</>
			)}

			<Button>Load more</Button>
		</div>
	);
}

export default HomePage;
