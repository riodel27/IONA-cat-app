import * as React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { Cat } from '../../types/types';

interface Props {
	cats: Cat[];
}

const CatList: React.FC<Props> = ({ cats }) => {
	const navigate = useNavigate();

	const handleButtonClick = (id: string) => {
		navigate(`/${id}`);
	};

	return (
		<div>
			<ul>
				{cats.map((cat) => (
					<li key={cat.id}>
						<img src={cat.url} alt={cat.id} role="cat" />
						<Button onClick={() => handleButtonClick(cat.id)}>
							View details
						</Button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default CatList;
