import { createContext, FC } from 'react';

import { CatBreed } from '../types/types';
import useCatBreeds from '../hooks/useCatBreeds';

interface CatBreedsContextValue {
	catBreeds: CatBreed[];
	error: string | null;
}

interface CatBreedsProviderProps {
	children: React.ReactNode;
}

export const CatBreedsContext = createContext<CatBreedsContextValue>({
	catBreeds: [],
	error: null,
});

const CatBreedsProvider: FC<CatBreedsProviderProps> = ({ children }) => {
	const { catBreeds, error } = useCatBreeds();

	const contextValue: CatBreedsContextValue = {
		catBreeds,
		error,
	};

	return (
		<CatBreedsContext.Provider value={contextValue}>
			{children}
		</CatBreedsContext.Provider>
	);
};

export default CatBreedsProvider;
