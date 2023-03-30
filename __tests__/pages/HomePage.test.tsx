import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios, { AxiosResponse, AxiosHeaders } from 'axios';

import HomePage from '../../src/pages/HomePage';
import { Cat } from '../../src/types/types';

vi.mock('axios');

const headers = new AxiosHeaders({
	'Content-Type': 'application/json',
});

describe('<HomePage />', () => {
	const mockCatsData = [
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

	const mockCatsDataSiameseBreed: Cat[] = [
		{
			id: '__tqyLW91',
			url: 'https://cdn2.thecatapi.com/images/__tqyLW91.jpg',
			width: 937,
			height: 1171,
		},
		{
			id: 'KCJeb66J2',
			url: 'https://cdn2.thecatapi.com/images/KCJeb66J2.jpg',
			width: 735,
			height: 1102,
		},
	];

	test('HomePage mounts properly', () => {
		render(<HomePage />);

		const selectInput = screen.getByLabelText('Breed');
		expect(selectInput).toBeInTheDocument();

		const catsList = screen.getAllByRole('cat');
		expect(catsList.length).toBe(mockCatsData.length);

		expect(catsList[0]).toHaveAttribute(
			'src',
			'https://cdn2.thecatapi.com/images/8pCFG7gCV.jpg'
		);
		expect(catsList[1]).toHaveAttribute(
			'src',
			'https://cdn2.thecatapi.com/images/8ciqdpaO5.jpg'
		);

		const viewDetailsButton = screen.getAllByRole('button', {
			name: 'View details',
		});
		expect(viewDetailsButton.length).toBe(mockCatsData.length);

		// expect button with load more
		const loadMoreButton = screen.getByRole('button', { name: 'Load more' });
		expect(loadMoreButton).toBeInTheDocument();
	});

	it('should show "No cats available" message if "Select breed" is selected', () => {
		const { getByLabelText, queryByText } = render(<HomePage />);
		const selectInput = getByLabelText('Breed');

		fireEvent.change(selectInput, { target: { value: 'Select breed' } });

		expect(queryByText('No cats available')).toBeInTheDocument();

		const catsList = screen.queryAllByRole('cat');
		expect(catsList).toHaveLength(0);
	});

	it('should fetch cat data and display it when a breed is selected', async () => {
		const mockResponse: AxiosResponse<Cat[]> = {
			data: mockCatsDataSiameseBreed,
			status: 200,
			statusText: 'OK',
			headers,
			config: {
				headers,
			},
		};

		(axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce(
			mockResponse
		);

		const { getByLabelText } = render(<HomePage />);

		const selectInput = getByLabelText('Breed');
		fireEvent.change(selectInput, { target: { value: 'siam' } });

		await waitFor(() => {
			const catsList = screen.queryAllByRole('cat');
			expect(catsList).toHaveLength(mockCatsDataSiameseBreed.length);

			expect(catsList[0]).toHaveAttribute(
				'src',
				'https://cdn2.thecatapi.com/images/__tqyLW91.jpg'
			);
			expect(catsList[1]).toHaveAttribute(
				'src',
				'https://cdn2.thecatapi.com/images/KCJeb66J2.jpg'
			);

			const viewDetailsButton = screen.getAllByRole('button', {
				name: 'View details',
			});
			expect(viewDetailsButton.length).toBe(mockCatsData.length);
		});
	});
});
