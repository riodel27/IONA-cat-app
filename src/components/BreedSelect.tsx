import { ChangeEvent, FC } from 'react';
import Form from 'react-bootstrap/Form';

interface BreedSelectProps {
	options: {
		id: string;
		name: string;
	}[];
	onChange: (value: string) => void;
}

const BreedSelect: FC<BreedSelectProps> = ({ onChange, options, ...rest }) => {
	return (
		<Form.Select
			aria-label="Breed"
			{...rest}
			onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
		>
			<option>Select breed</option>
			{options.map((option) => (
				<option key={option.id} value={option.id}>
					{option.name}
				</option>
			))}
		</Form.Select>
	);
};

export default BreedSelect;
