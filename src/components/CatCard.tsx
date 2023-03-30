import * as React from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

import { Cat } from '../types/types';

interface Props {
	cat: Cat | null;
}

const CatCard: React.FC<Props> = ({ cat }: Props) => {
	const navigate = useNavigate();

	const handleButtonClick = (breed: string) => {
		navigate(`/?breed=${breed}`);
	};

	return (
		<Card>
			<Card.Header>
				<Button
					onClick={() => handleButtonClick(cat?.breeds?.[0].id as string)}
				>
					Back
				</Button>
			</Card.Header>
			<Card.Img variant="top" src={cat?.url} alt={cat?.id} />
			<Card.Body>
				<h4>{cat?.breeds?.[0].name}</h4>
				<h5>Origin:{cat?.breeds?.[0].origin}</h5>
				<h6>{cat?.breeds?.[0].temperament}</h6>
				<p>{cat?.breeds?.[0].description}</p>
			</Card.Body>
		</Card>
	);
};

export default CatCard;
