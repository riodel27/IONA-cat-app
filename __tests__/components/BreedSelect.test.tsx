import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';

import BreedSelect from '../../src/components/BreedSelect';
import { Cat, CatBreed } from '../../src/types/types';

const catBreeds: CatBreed[] = [
	{ id: 'abys', name: 'Abyssinian' },
	{ id: 'abob', name: 'American Bobtail' },
	{ id: 'siam', name: 'Siamese' },
];

const mockCatsData: Cat[] = [
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
];

describe('BreedSelect', () => {
	test('should render the select input with options', () => {
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

	test('should call onChange when an option is selected', () => {
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

	it('should show "No cats available" message if "Select breed" is selected', () => {
		const onChange = vi.fn();
		const { getByLabelText, queryByText } = render(
			<>
				<BreedSelect options={catBreeds} onChange={onChange} />
				<div data-testid="cat-list"></div>
			</>
		);
		const selectInput = getByLabelText('Breed');

		fireEvent.change(selectInput, { target: { value: 'Select breed' } });

		expect(queryByText('No cats available')).toBeInTheDocument();

		const catsList = screen.getAllByRole('cat');
		expect(catsList).not.toBeInTheDocument();
	});

	it('should fetch cat data and display it when a breed is selected', async () => {
		const mockCats: Cat[] = [
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
		];

		const mockFetch = vi.fn(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve({ data: mockCats }),
			} as Response)
		);

		global.fetch = mockFetch;

		const onChange = vi.fn();
		const getCatList = () => document.querySelector('[data-testid="cat-list"]');
		const { getByLabelText } = render(
			<>
				<BreedSelect options={catBreeds} onChange={onChange} />
				{/* might need to use the CatList component here instead. */}
				<div data-testid="cat-list"></div>
			</>
		);

		const selectInput = getByLabelText('Breed');
		fireEvent.change(selectInput, { target: { value: 'siam' } });

		await act(async () => {
			await new Promise((resolve) => setTimeout(resolve, 0)); // wait for next tick
		});

		// Make request to get cats
		// await getCats();
		const catList = getCatList();
		expect(mockFetch).toHaveBeenCalledWith(
			' https://api.thecatapi.com/v1/images/search?page=1&limit=10&breed_id=siam'
		);
		expect(catList?.querySelectorAll('img').length).toBe(3);
	});
});
