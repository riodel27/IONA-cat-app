import { useEffect, useState } from 'react';
import differenceWith from 'lodash/differenceWith';
import isEqual from 'lodash/isEqual';
import { useSearchParams } from 'react-router-dom';

import { fetchCatsByBreed } from '../api';
import { Cat } from '../types/types';

type UseCatsByBreed = () => {
	cats: Cat[];
	hasMoreCats: boolean;
	isFetchingMoreCats: boolean;
	handleSelectBreedChange: (breed: string) => void;
	handleLoadMore: () => void;
	breed: string;
};

const useCatsByBreed: UseCatsByBreed = () => {
	const [searchParams] = useSearchParams();
	const breedParam = searchParams.get('breed') ?? '';

	const [breed, setBreed] = useState(breedParam ?? '');
	const [cats, setCats] = useState<Cat[]>([]);
	const [page, setPage] = useState(1);
	const [hasMoreCats, setHasMoreCats] = useState(true);
	const [isFetchingMoreCats, setIsFetchingMoreCats] = useState(false);

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
					// make sure there is no duplicate data
					setCats((prevCats) => [
						...prevCats,
						...fetchedCats.filter(
							(cat) =>
								prevCats.findIndex((prevCat) => prevCat.id === cat.id) === -1
						),
					]);
				}
			};

			fetchCats()
				.catch((error) => console.log(error))
				.finally(() => {
					setIsFetchingMoreCats(false);
				});
		}
	}, [breed, page]);

	const handleSelectBreedChange = (newBreed: string) => {
		setBreed(newBreed);
		setPage(1);
		setCats([]);
		setHasMoreCats(true);
	};

	const handleLoadMore = () => {
		setPage((prevPage) => prevPage + 1);
	};

	return {
		cats,
		hasMoreCats,
		isFetchingMoreCats,
		handleSelectBreedChange,
		handleLoadMore,
		breed,
	};
};

export default useCatsByBreed;
