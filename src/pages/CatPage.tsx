import { useEffect, useState } from 'react';
import CatCard from '../components/CatCard';
import { useParams } from 'react-router-dom';
import { fetchCatById } from '../api';
import { Cat } from '../types/types';

function CatPage() {
	const { id } = useParams();

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

	return <>{<CatCard cat={cat} />}</>;
}

export default CatPage;
