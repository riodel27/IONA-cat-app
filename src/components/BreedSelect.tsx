import { ChangeEvent, FC } from 'react';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';

interface BreedSelectProps {
	options: {
		id: string;
		name: string;
	}[];
	onChange: (value: string) => void;
	breed: string;
}

const StyledFormSelect = styled(Form.Select)`
	max-width: 300px; /* set max width for mobile devices */
	width: 100%; /* make sure it takes up full width */
	margin-top: 0.5rem;
`;

const BreedSelect: FC<BreedSelectProps> = ({
	onChange,
	options,
	breed,
	...rest
}) => {
	return (
		<>
			<label htmlFor="">Breed</label>
			<StyledFormSelect
				aria-label="Breed"
				value={breed}
				{...rest}
				onChange={(e: ChangeEvent<HTMLSelectElement>) =>
					onChange(e.target.value)
				}
			>
				<option value="">Select breed</option>
				{options.map((option) => (
					<option key={option.id} value={option.id}>
						{option.name}
					</option>
				))}
			</StyledFormSelect>
		</>
	);
};

export default BreedSelect;
