import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import CatList from '../components/CatList/CatList';
import { Cat } from '../types/types';

function HomePage() {
	const mockData = [
		{
			id: '8pCFG7gCV',
			url: 'https://cdn2.thecatapi.com/images/8pCFG7gCV.jpg',
			width: 750,
			height: 937,
		},
		{
			id: '8ciqdpaO5',
			url: 'https://cdn2.thecatapi.com/images/8ciqdpaO5.jpg',
			width: 1080,
			height: 809,
		},
	] as Cat[];

	return (
		<div>
			<Form.Select aria-label="Breed">
				<option>Select breed</option>
			</Form.Select>

			<CatList cats={mockData} />

			<Button>Load more</Button>
		</div>
	);
}

export default HomePage;
