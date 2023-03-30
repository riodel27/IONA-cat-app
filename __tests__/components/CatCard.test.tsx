import { describe, test, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import { Cat } from '../../src/types/types';

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

describe('CatCard', () => {
	test('should render the card with cat information', () => {
		render(<CatCard cat={catMockData} />);

		const backButton = screen.getByText('Back');
		expect(backButton).toBeInTheDocument();

		const catImage = screen.getByAltText(catMockData.id);
		expect(catImage).toBeInTheDocument();

		const catBreedName = screen.getByText(catMockData.breeds?.[0]?.name ?? '');
		expect(catBreedName).toBeInTheDocument();

		const catBreedOrigin = screen.getByText(
			catMockData.breeds?.[0]?.origin ?? ''
		);
		expect(catBreedOrigin).toBeInTheDocument();

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
