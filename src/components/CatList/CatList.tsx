import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Cat } from '../../types/types';
import { GridContainer } from './styled';
import CatCard from './CatCard';

interface Props {
	cats: Cat[];
}

const CatList: FC<Props> = ({ cats }) => {
	const navigate = useNavigate();

	const handleViewCatDetailsClick = (id: string) => {
		navigate(`/${id}`);
	};

	return (
		<GridContainer>
			{cats.map((cat) => (
				<CatCard
					key={cat.id}
					cat={cat}
					handleViewCatDetailsClick={handleViewCatDetailsClick}
				/>
			))}
		</GridContainer>
	);
};

export default CatList;
