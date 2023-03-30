import axios, { AxiosResponse } from 'axios';
import { Cat } from '../types/types';

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

export { fetchCatsByBreed, fetchCatById };
