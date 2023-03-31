import { FC } from 'react';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

import { Cat } from '../../types/types';
import {
	BackButton,
	Description,
	Origin,
	StyledCard,
	StyledImg,
	Temperament,
	Title,
} from './styled';

interface Props {
	cat: Cat | null;
}

const CatCard: FC<Props> = ({ cat }: Props) => {
	const navigate = useNavigate();

	const handleBackButtonClick = (breed: string) => {
		navigate?.(breed ? `/?breed=${breed}` : '/');
	};

	return (
		<StyledCard>
			<Card.Header>
				<BackButton
					onClick={() => handleBackButtonClick(cat?.breeds?.[0].id as string)}
				>
					Back
				</BackButton>
			</Card.Header>
			<StyledImg variant="top" src={cat?.url} alt={cat?.id} />
			<Card.Body>
				<Title>{cat?.breeds?.[0].name}</Title>
				<Origin>Origin: {cat?.breeds?.[0].origin}</Origin>
				<Temperament>{cat?.breeds?.[0].temperament}</Temperament>
				<Description>{cat?.breeds?.[0].description}</Description>
			</Card.Body>
		</StyledCard>
	);
};

export default CatCard;
