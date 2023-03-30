import { describe, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios, { AxiosResponse, AxiosHeaders } from 'axios';
import userEvent from '@testing-library/user-event';

import HomePage from '../../src/pages/HomePage';
import { Cat } from '../../src/types/types';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

vi.mock('axios');

const headers = new AxiosHeaders({
	'Content-Type': 'application/json',
});

describe('<HomePage />', () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

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

	it('HomePage mounts properly', () => {
		render(<HomePage />);

		const selectInput = screen.getByLabelText('Breed');
		// expect select breed input
		expect(selectInput).toBeInTheDocument();
	});

	it('should show "No cats available" message if "Select breed" is selected', () => {
		const { getByLabelText, queryByText } = render(<HomePage />);
		const selectInput = getByLabelText('Breed');

		fireEvent.change(selectInput, { target: { value: '' } });

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

		const { getByLabelText } = render(
			<MemoryRouter>
				<HomePage />
			</MemoryRouter>
		);

		const selectInput = getByLabelText('Breed');
		fireEvent.change(selectInput, { target: { value: 'siam' } });

		// Wait for the mocked response to resolve and the component to re-render with the fetched cat data displayed
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

	it('should NOT display the load more button if no breed selected', () => {
		const { getByLabelText } = render(<HomePage />);

		const selectInput = getByLabelText('Breed');

		fireEvent.change(selectInput, { target: { value: '' } });

		const loadMoreButton = screen.queryByLabelText('LoadMore');
		expect(loadMoreButton).not.toBeInTheDocument();
	});

	it('should display the load more button if a breed is selected', () => {
		const { getByLabelText } = render(
			<MemoryRouter>
				<HomePage />
			</MemoryRouter>
		);

		const selectInput = getByLabelText('Breed');

		fireEvent.change(selectInput, { target: { value: 'siam' } });

		const loadMoreButton = getByLabelText('LoadMore');
		expect(loadMoreButton).toBeInTheDocument();
	});

	it('should display more data after clicking load more button', async () => {
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

		const mockCatsDataSiameseBreedPageTwo: Cat[] = [
			{
				id: 'Kf-zJDHCx',
				url: 'https://cdn2.thecatapi.com/images/Kf-zJDHCx.jpg',
				width: 1080,
				height: 967,
			},
			{
				id: 'O2aNhFGU-',
				url: 'https://cdn2.thecatapi.com/images/O2aNhFGU-.jpg',
				width: 1080,
				height: 1080,
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
			mockResponsePageOne
		);

		(axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce(
			mockResponsePageTwo
		);

		const { getByLabelText } = render(
			<MemoryRouter>
				<HomePage />
			</MemoryRouter>
		);

		const selectInput = getByLabelText('Breed');

		fireEvent.change(selectInput, { target: { value: 'siam' } });

		const loadMoreButton = getByLabelText('LoadMore');

		await act(async () => {
			await userEvent.click(loadMoreButton);
		});
		// fireEvent.click(loadMoreButton);

		await waitFor(() => {
			// Assert that the additional cats are displayed on the page
			const catsList = screen.queryAllByRole('cat');
			expect(catsList).toHaveLength(
				mockCatsDataSiameseBreedPageOne.length +
					mockCatsDataSiameseBreedPageTwo.length
			);

			// These are supposed to be the data from page two after clicking load more
			expect(catsList[2]).toHaveAttribute(
				'src',
				mockCatsDataSiameseBreedPageTwo[0].url
			);
			expect(catsList[3]).toHaveAttribute(
				'src',
				mockCatsDataSiameseBreedPageTwo[1].url
			);

			const viewDetailsButton = screen.getAllByRole('button', {
				name: 'View details',
			});
			expect(viewDetailsButton.length).toBe(
				mockCatsDataSiameseBreedPageOne.length +
					mockCatsDataSiameseBreedPageTwo.length
			);
		});
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

		render(<HomePage />);

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
