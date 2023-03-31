import { FC } from 'react';
import { Button } from 'react-bootstrap';

import { Cat } from '../../types/types';
import { CardBody, CardImg, CatCardWrapper, StyledCatCard } from './styled';

type CatCardProps = {
	cat: Cat;
	handleViewCatDetailsClick: (id: string) => void;
};

const CatCard: FC<CatCardProps> = ({ cat, handleViewCatDetailsClick }) => {
	return (
		<CatCardWrapper>
			<StyledCatCard>
				<CardImg variant="top" src={cat?.url} alt={cat?.id} />
				<CardBody>
					<Button onClick={() => handleViewCatDetailsClick(cat.id)}>
						View details
					</Button>
				</CardBody>
			</StyledCatCard>
		</CatCardWrapper>
	);
};

export default CatCard;
