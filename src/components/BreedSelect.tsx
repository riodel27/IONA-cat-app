import { FC } from 'react';
import Form from 'react-bootstrap/Form';

interface BreedSelectProps {
	options: {
		id: string;
		name: string;
	}[];
	onChange: (value: string) => void;
}

const BreedSelect: FC<BreedSelectProps> = ({ options, ...rest }) => {
	return (
		<Form.Select aria-label="Breed" {...rest}>
			<option>Select breed</option>
			{/* {options.map((option) => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))} */}
		</Form.Select>
	);
};

export default BreedSelect;
