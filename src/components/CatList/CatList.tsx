import * as React from 'react';
import { Button } from 'react-bootstrap';

import { Cat } from '../../types/types';

interface Props {
	cats: Cat[];
}

const CatList: React.FC<Props> = ({ cats }) => {
	return (
		<div>
			<ul>
				{cats.map((cat) => (
					<li key={cat.id}>
						<img src={cat.url} alt={cat.id} role="cat" />
						<Button>View details</Button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default CatList;
