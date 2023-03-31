import { useState, useEffect } from 'react';

import { Cat } from '../types/types';
import { fetchCatById } from '../api';

const useCatById = (id: string | null) => {
	const [cat, setCat] = useState<Cat | null>(null);

	useEffect(() => {
		if (id) {
			const fetchData = async () => {
				try {
					const catData = await fetchCatById(id);

					setCat(catData);
				} catch (error) {
					console.error(error);
				}
			};
			fetchData().catch((error) => console.log(error));
		}
	}, [id]);

	return cat;
};

export default useCatById;
