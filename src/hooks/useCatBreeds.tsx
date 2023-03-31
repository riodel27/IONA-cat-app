import { useState, useEffect } from 'react';

import { fetchCatBreeds } from '../api';
import { CatBreed } from '../types/types';

interface CatBreedsState {
	catBreeds: CatBreed[];
	error: string | null;
}

const useCatBreeds = (): CatBreedsState => {
	const [catBreeds, setCatBreeds] = useState<CatBreed[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetchCatBreeds();
				setCatBreeds(response);
			} catch (err) {
				setError((err as Error)?.message);
			}
		};

		fetchData().catch((err) => console.log(err));
	}, []);

	return {
		catBreeds,
		error,
	};
};

export default useCatBreeds;
