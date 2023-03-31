import axios, { AxiosResponse } from 'axios';
import { Cat, CatBreed } from '../types/types';

interface ApiParams {
	breedId: string;
	page?: number;
	limit?: number;
}

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
		throw new Error('Unable to fetch cats. Please try again later.');
	}
};

const fetchCatById = async (catId: string): Promise<Cat> => {
	try {
		const response: AxiosResponse<Cat> = await axios.get(
			`https://api.thecatapi.com/v1/images/${catId}`
		);

		return response?.data;
	} catch (error) {
		// Handle error here
		console.error('Error fetching cat: ', error);
		throw new Error('Unable to fetch cat. Please try again later.');
	}
};

export const fetchCatBreeds = async (): Promise<CatBreed[]> => {
	try {
		const response = await axios.get<CatBreed[]>(
			'https://api.thecatapi.com/v1/breeds'
		);

		return response.data;
	} catch (error) {
		console.error('failed to fetch cat breeds: ', error);
		throw new Error(`Failed to fetch cat breeds`);
	}
};

export { fetchCatsByBreed, fetchCatById };
