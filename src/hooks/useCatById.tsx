import { useState, useEffect } from 'react';

import { Cat } from '../types/types';
import { fetchCatById } from '../api';
import { useAlert } from '../contexts/AlertContext';

const useCatById = (id: string | null) => {
	const { addAlert } = useAlert();

	const [cat, setCat] = useState<Cat | null>(null);

	useEffect(() => {
		if (id) {
			const fetchData = async () => {
				try {
					const catData = await fetchCatById(id);

					setCat(catData);
				} catch (error: any) {
					console.log('ERROR fetchCatById: ', error);
					addAlert((error as { message: string }).message, 'danger');
				}
			};
			fetchData().catch((error: string) => {
				console.log(error);
			});
		}
	}, [id]);

	return cat;
};

export default useCatById;
