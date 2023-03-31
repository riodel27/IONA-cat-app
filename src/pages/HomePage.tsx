import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

import BreedSelect from '../components/BreedSelect';
import CatList from '../components/CatList/CatList';
import useCatsByBreed from '../hooks/useCatsByBreed';
import { CatBreedsContext } from '../contexts/CatBreedsContext';

const HomePageContainer = styled.div`
	padding: 1rem;

	@media (min-width: 768px) {
		padding: 2rem;
	}

	@media (min-width: 992px) {
		padding: 4rem;
	}

	& > p {
		margin-top: 2rem;
	}
`;

function HomePage() {
	const { catBreeds } = useContext(CatBreedsContext);

	const {
		breed,
		cats,
		handleSelectBreedChange,
		handleLoadMore,
		hasMoreCats,
		isFetchingMoreCats,
	} = useCatsByBreed();

	return (
		<HomePageContainer>
			<div>
				<h1>Cat Browser</h1>

				<BreedSelect
					breed={breed}
					options={catBreeds}
					onChange={handleSelectBreedChange}
				/>
			</div>

			{!breed ? (
				<>
					<p>No cats available</p>
				</>
			) : (
				<>
					<CatList cats={cats} />
					{hasMoreCats && (
						<Button
							variant="success"
							onClick={handleLoadMore}
							aria-label="LoadMore"
						>
							{isFetchingMoreCats ? 'Loading cats...' : 'Load more'}
						</Button>
					)}
				</>
			)}
		</HomePageContainer>
	);
}

export default HomePage;
