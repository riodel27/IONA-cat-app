import { useState, useEffect } from 'react';

import { fetchCatBreeds } from '../api';
import { CatBreed } from '../types/types';
import { useAlert } from '../contexts/AlertContext';

interface CatBreedsState {
	catBreeds: CatBreed[];
	error: string | null;
}

const useCatBreeds = (): CatBreedsState => {
	const { addAlert } = useAlert();

	const [catBreeds, setCatBreeds] = useState<CatBreed[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetchCatBreeds();
				setCatBreeds(response);
			} catch (err) {
				setError((err as Error)?.message);
				console.log('ERROR fetchCatBreeds: ', error);
				addAlert((err as { message: string }).message, 'danger');
			}
		};

		fetchData().catch((err: string) => {
			console.log(err);
		});
	}, []);

	return {
		catBreeds,
		error,
	};
};

export default useCatBreeds;
