import { describe, test, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import axios, { AxiosHeaders, AxiosResponse } from 'axios';
import { Cat } from '../../src/types/types';

vi.mock('axios');

const headers = new AxiosHeaders({
	'Content-Type': 'application/json',
});

const catMockData: Cat = {
	id: 'd55E_KMKZ',
	url: 'https://cdn2.thecatapi.com/images/d55E_KMKZ.jpg',
	breeds: [
		{
			id: 'abob',
			name: 'American Bobtail',
			temperament: 'Intelligent, Interactive, Lively, Playful, Sensitive',
			origin: 'United States',
			description:
				'American Bobtails are loving and incredibly intelligent cats possessing a distinctive wild appearance. They are extremely interactive cats that bond with their human family with great devotion.',
		},
	],
	width: 2160,
	height: 1284,
};

describe('<CatPage />', () => {
	test('renders the correct URL for single cat page', () => {
		const id = 'd55E_KMKZ';

		<MemoryRouter initialEntries={[`/${id}`]}>
			<Routes>
				<Route path="/:id" element={<CatPage />}></Route>
			</Routes>
		</MemoryRouter>;

		const url = window.location.pathname;
		expect(url).toBe(`/${id}`);
	});

	test('should fetch cat data and display it in cat card component', async () => {
		const mockResponse: AxiosResponse<Cat> = {
			data: catMockData,
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

		render(<CatPage />);

		// Wait for the mocked response to resolve and the component to re-render with the fetched cat data displayed
		await waitFor(() => {
			const backButton = screen.getByText('Back');
			expect(backButton).toBeInTheDocument();

			const catImage = screen.getByAltText(catMockData.id);
			expect(catImage).toBeInTheDocument();

			const catBreedName = screen.getByText(
				catMockData.breeds?.[0]?.name ?? ''
			);
			expect(catBreedName).toBeInTheDocument();

			const catBreedOriginElement = screen.getByRole('heading', {
				name: /origin/i,
			});
			expect(catBreedOriginElement).toHaveTextContent(
				catMockData.breeds?.[0]?.origin ?? ''
			);

			const catBreedTemperament = screen.getByText(
				catMockData.breeds?.[0]?.temperament ?? ''
			);
			expect(catBreedTemperament).toBeInTheDocument();

			const catBreedDescription = screen.getByText(
				catMockData.breeds?.[0]?.description ?? ''
			);
			expect(catBreedDescription).toBeInTheDocument();
		});
	});
});
