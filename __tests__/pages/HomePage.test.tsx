import { describe, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios, { AxiosResponse, AxiosHeaders } from 'axios';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

import HomePage from '../../src/pages/HomePage';
import { Cat } from '../../src/types/types';

vi.mock('axios');

const headers = new AxiosHeaders({
	'Content-Type': 'application/json',
});

describe('<HomePage />', () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	it('HomePage mounts properly', () => {
		render(
			<MemoryRouter>
				<HomePage />
			</MemoryRouter>
		);

		const selectInput = screen.getByLabelText('Breed');
		// expect select breed input
		expect(selectInput).toBeInTheDocument();
	});

	it('should show "No cats available" message if "Select breed" is selected', () => {
		const { getByLabelText, queryByText } = render(
			<MemoryRouter>
				<HomePage />
			</MemoryRouter>
		);
		const selectInput = getByLabelText('Breed');

		fireEvent.change(selectInput, { target: { value: '' } });

		expect(queryByText('No cats available')).toBeInTheDocument();

		const catsList = screen.queryAllByRole('cat');
		expect(catsList).toHaveLength(0);
	});

	it('should NOT display the load more button if no breed selected', () => {
		const { getByLabelText } = render(
			<MemoryRouter>
				<HomePage />
			</MemoryRouter>
		);

		const selectInput = getByLabelText('Breed');

		fireEvent.change(selectInput, { target: { value: '' } });

		const loadMoreButton = screen.queryByLabelText('LoadMore');
		expect(loadMoreButton).not.toBeInTheDocument();
	});

	it('should hide the load more button if there are no more data after clicking the load more button', async () => {
		// this will be the page one mock api response
		const mockCatsDataSiameseBreedPageOne: Cat[] = [
			{
				id: '__tqyLW91',
				url: 'https://cdn2.thecatapi.com/images/__tqyLW91.jpg',
				width: 937,
				height: 1171,
			},
			{
				id: 'DFHMMPNcD',
				url: 'https://cdn2.thecatapi.com/images/DFHMMPNcD.jpg',
				width: 1080,
				height: 1319,
			},
		];

		// The page 2 will be the same response with the page one.
		// This is on purpose, this will be the identifier that
		// there is no more data to load
		const mockCatsDataSiameseBreedPageTwo: Cat[] = [
			{
				id: '__tqyLW91',
				url: 'https://cdn2.thecatapi.com/images/__tqyLW91.jpg',
				width: 937,
				height: 1171,
			},
			{
				id: 'DFHMMPNcD',
				url: 'https://cdn2.thecatapi.com/images/DFHMMPNcD.jpg',
				width: 1080,
				height: 1319,
			},
		];

		const mockResponsePageOne: AxiosResponse<Cat[]> = {
			data: mockCatsDataSiameseBreedPageOne,
			status: 200,
			statusText: 'OK',
			headers,
			config: {
				headers,
			},
		};

		(axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce(
			mockResponsePageOne
		);

		const mockResponsePageTwo: AxiosResponse<Cat[]> = {
			data: mockCatsDataSiameseBreedPageTwo,
			status: 200,
			statusText: 'OK',
			headers,
			config: {
				headers,
			},
		};

		(axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce(
			mockResponsePageTwo
		);

		render(
			<MemoryRouter>
				<HomePage />
			</MemoryRouter>
		);

		const loadMoreButton = screen.queryByRole('button', { name: 'Load more' });
		if (loadMoreButton) {
			await act(async () => {
				await userEvent.click(loadMoreButton);
			});
		}

		await waitFor(() => {
			// make sure to hide the load more button if there are no more data

			const getLoadMoreButton = screen.queryByRole('button', {
				name: 'Load more',
			});

			if (getLoadMoreButton) expect(getLoadMoreButton).not.toBeInTheDocument();
		});
	});
});
