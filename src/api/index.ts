import axios, { AxiosResponse } from 'axios';
import { Cat, CatBreed } from '../types/types';

interface ApiParams {
	breedId: string;
	page?: number;
	limit?: number;
}

//  fake api to simulate error
function fetchSomeData() {
	return new Promise((resolve, reject) => {
		reject('API call failed!');
	});
}

const genericApiErrorMessage =
	'Apologies but we could not load new cats for you at this time! Miau!';

const fetchCatsByBreed = async ({
	breedId,
	page = 1,
	limit = 10,
}: ApiParams): Promise<Cat[]> => {
	try {
		const response: AxiosResponse<Cat[]> = await axios.get(
			`https://api.thecatapi.com/v1/images/search?page=${page}&limit=${limit}&breed_id=${breedId}`
		);

		return response?.data;
	} catch (error) {
		// Handle error here
		console.error('Error fetching cats: ', error);
		throw new Error(genericApiErrorMessage);
	}
};

const fetchCatById = async (catId: string): Promise<Cat> => {
	try {
		const response: AxiosResponse<Cat> = await axios.get(
			`https://api.thecatapi.com/v1/images/${catId}`
		);

		// await fetchSomeData();

		return response?.data;
	} catch (error) {
		// Handle error here
		console.error('Error fetching cat: ', error);
		throw new Error(genericApiErrorMessage);
	}
};

const fetchCatBreeds = async (): Promise<CatBreed[]> => {
	try {
		const response = await axios.get<CatBreed[]>(
			'https://api.thecatapi.com/v1/breeds'
		);

		return response.data;
	} catch (error) {
		console.error('failed to fetch cat breeds: ', error);
		throw new Error(genericApiErrorMessage);
	}
};

export { fetchCatsByBreed, fetchCatById, fetchCatBreeds };
