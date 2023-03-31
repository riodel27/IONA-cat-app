import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import CatCard from '../components/SingleCatCard/CatCard';
import useCatById from '../hooks/useCatById';

const CatPageContainer = styled.div`
	padding: 20px;

	@media (max-width: 768px) {
		padding: 10px;
	}
`;

function CatPage() {
	const { id } = useParams();

	const cat = useCatById(id || null);

	return (
		<CatPageContainer>
			<CatCard cat={cat} />
		</CatPageContainer>
	);
}

export default CatPage;
