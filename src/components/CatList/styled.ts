import styled from 'styled-components';
import Card from 'react-bootstrap/Card';

export const GridContainer = styled.div`
	margin-top: 1rem;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	grid-gap: 1rem;
	justify-items: center;
	width: 100%;

	@media (min-width: 768px) {
		grid-template-columns: repeat(2, minmax(250px, 1fr));
	}

	@media (min-width: 1024px) {
		grid-template-columns: repeat(4, minmax(250px, 1fr));
	}
`;

export const CatCardWrapper = styled.div`
	margin-bottom: 1rem;
	width: 100%;
	box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

export const CardImg = styled(Card.Img)`
	object-fit: cover;
	height: 14rem;

	@media (min-width: 768px) {
		height: 12rem;
	}

	@media (min-width: 1024px) {
		height: 20rem;
	}
`;

export const CardBody = styled(Card.Body)`
	width: 100%;
`;

export const StyledCatCard = styled(Card)`
	&.card {
		border-width: 0;
	}
`;
