import { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import isEqual from 'lodash/isEqual';
import differenceWith from 'lodash/differenceWith';

import { fetchCatsByBreed } from '../api';
import BreedSelect from '../components/BreedSelect';
import CatList from '../components/CatList/CatList';
import { Cat } from '../types/types';
import { CatBreedsContext } from '../contexts/CatBreedsContext';

function HomePage() {
	const { catBreeds } = useContext(CatBreedsContext);

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

				// This code is used to verify wether the most recent response
				// received for cats already present in the current list of
				// cat data. If this is the case, the outcome of the code
				// will be an empty array.
				const result = differenceWith(fetchedCats, cats, isEqual);

				// This code block checks if there are more cats to be fetched.
				// If the result array is empty, which indicates that there are no
				// more cats to be fetched, then the setHasMoreCats function
				// is called to set the hasMoreCats state to false. Otherwise,
				// the setCats function is called to append the newly fetched
				// cat data (fetchedCats) to the previous cat data (prevCats)
				// using the spread operator.
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
			<h1>Cat Browser</h1>

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
