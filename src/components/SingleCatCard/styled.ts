import styled from 'styled-components';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';

export const StyledCard = styled(Card)`
	width: 90%;
	margin: 0 auto;
	padding: 2rem;
	@media (min-width: 768px) {
		width: 60%;
	}
	box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);

	&.card {
		border-width: 0;
	}
`;

export const StyledImg = styled(Card.Img)`
	margin-top: 1rem;
`;

export const BackButton = styled(Button)`
	margin: 0.5rem 0;
`;

export const Title = styled.h4`
	margin-top: 1rem;
	white-space: normal;
`;

export const Origin = styled.h5`
	margin-top: 1rem;
	white-space: normal;
`;

export const Temperament = styled.h6`
	margin-top: 1rem;
	white-space: normal;
`;

export const Description = styled.p`
	margin-top: 1rem;
	white-space: normal;
`;
