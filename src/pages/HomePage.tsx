import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { differenceWith, isEqual } from 'lodash';

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
	const [page, setPage] = useState(1);
	const [hasMoreCats, setHasMoreCats] = useState(true);
	const [isFetchingMoreCats, setIsFetchingMoreCats] = useState(true);

	useEffect(() => {
		if (breed) {
			const fetchCats = async () => {
				setIsFetchingMoreCats(true);

				const fetchedCats = await fetchCatsByBreed({
					breedId: breed,
					page,
					limit: 10,
				});

				// This is to check if the last fetched cats response already exist in the current list of cats state.
				// If it's true, the result will be an empty array.
				const result = differenceWith(fetchedCats, cats, isEqual);

				// This means that there are no more cats to be fetched
				if (!result.length) {
					setHasMoreCats(false);
				} else {
					setCats((prevCats) => [...prevCats, ...fetchedCats]);
				}
			};

			fetchCats()
				.catch((error) => console.log(error))
				.finally(() => {
					setIsFetchingMoreCats(false);
				});
		}
	}, [breed, page]);

	const handleSelectBreedChange = (value: string) => {
		setBreed(value);
		setPage(1);
		setCats([]);
		setHasMoreCats(true);
	};

	const handleLoadMore = () => {
		setPage((prevPage) => prevPage + 1);
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
					{hasMoreCats && (
						<Button onClick={handleLoadMore} aria-label="LoadMore">
							{isFetchingMoreCats ? 'Load cats...' : 'Load more'}
						</Button>
					)}
				</>
			)}
		</div>
	);
}

export default HomePage;
