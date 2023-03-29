import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import HomePage from '../../src/pages/HomePage';
import { Cat } from '../../src/types/types';

describe('<HomePage />', () => {
	const mockData = [
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

	test('HomePage mounts properly', () => {
		render(<HomePage />);

		const selectInput = screen.getByLabelText('Breed');
		expect(selectInput).toBeInTheDocument();

		const catsList = screen.getAllByRole('cat');
		expect(catsList.length).toBe(mockData.length);

		catsList.forEach((cat) => {
			const catImage = screen.getByAltText(cat.id);
			expect(catImage).toBeInTheDocument();
			expect(catImage).toHaveAttribute('src', cat.url);
		});

		const viewDetailsButton = screen.getAllByRole('button', {
			name: 'Load more',
		});
		expect(viewDetailsButton.length).toBe(mockData.length);

		// expect button with load more
		const loadMoreButton = screen.getByRole('button', { name: 'Load more' });
		expect(loadMoreButton).toBeInTheDocument();
	});
});
