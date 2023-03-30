import { describe, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';

import BreedSelect from '../../src/components/BreedSelect';
import { CatBreed } from '../../src/types/types';

const catBreeds: CatBreed[] = [
	{ id: 'abys', name: 'Abyssinian' },
	{ id: 'abob', name: 'American Bobtail' },
	{ id: 'siam', name: 'Siamese' },
];

describe('BreedSelect', () => {
	it('should render the select input with options', () => {
		const onChange = vi.fn();
		const { getByLabelText, getByText } = render(
			<BreedSelect options={catBreeds} onChange={onChange} />
		);

		const selectInput = getByLabelText('Breed') as HTMLSelectElement;
		expect(selectInput).toBeInTheDocument();

		const selectBreedOption = getByText('Select breed');
		expect(selectBreedOption).toBeInTheDocument();

		catBreeds.forEach((option) => {
			const optionElement = getByText(option.name) as HTMLOptionElement;
			expect(optionElement).toBeInTheDocument();
			expect(optionElement.value).toBe(option.id);
		});
	});

	it('should call onChange when an option is selected', () => {
		const onChange = vi.fn();
		const { getByLabelText } = render(
			<BreedSelect options={catBreeds} onChange={onChange} />
		);

		const selectInput = getByLabelText('Breed') as HTMLSelectElement;
		expect(selectInput).toBeInTheDocument();

		const optionToSelect = catBreeds[0];
		fireEvent.change(selectInput, { target: { value: optionToSelect.id } });

		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onChange).toHaveBeenCalledWith(optionToSelect.id);

		fireEvent.change(selectInput, { target: { value: 'Select breed' } });

		expect(onChange).toHaveBeenCalledWith('Select breed');
	});
});
