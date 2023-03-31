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

// This function is used to fetch cat images by breed using the Cat API
// It takes an object with optional page and limit parameters and a breedId string as input
// It returns a promise that resolves to an array of Cat objects
const fetchCatsByBreed = async ({
	breedId,
	page = 1,
	limit = 10,
}: ApiParams): Promise<Cat[]> => {
	try {
		// Make a GET request to the Cat API to fetch cat images by breed using the provided parameters
		const response: AxiosResponse<Cat[]> = await axios.get(
			`${
				import.meta.env.VITE_REACT_APP_BASE_URL
			}/images/search?page=${page}&limit=${limit}&breed_id=${breedId}`
		);

		// Return the response data as an array of Cat objects
		return response?.data;
	} catch (error) {
		// Handle errors that may occur during the GET request
		console.error('Error fetching cats: ', error);

		// Throw a new Error object with a generic error message
		throw new Error(genericApiErrorMessage);
	}
};

// Async function that fetches a single cat by ID
const fetchCatById = async (catId: string): Promise<Cat> => {
	try {
		// Make a GET request to the API to fetch the cat with the given ID
		const response: AxiosResponse<Cat> = await axios.get(
			`${import.meta.env.VITE_REACT_APP_BASE_URL}/images/${catId}`
		);

		// Uncomment the following line to simulate an error
		// await fetchSomeData();

		// Return the data from the response object
		return response?.data;
	} catch (error) {
		// If an error occurs, log it and throw a new error with a generic message
		console.error('Error fetching cat: ', error);
		throw new Error(genericApiErrorMessage);
	}
};

// This function fetches a list of cat breeds from the external API.
// It uses Axios to perform a GET request to the API's "breeds" endpoint
// and returns a Promise that resolves with an array of CatBreed objects,
// or rejects with an error message in case of failure.
const fetchCatBreeds = async (): Promise<CatBreed[]> => {
	try {
		const response = await axios.get<CatBreed[]>(
			`${import.meta.env.VITE_REACT_APP_BASE_URL}/breeds`
		);

		return response.data;
	} catch (error) {
		console.error('failed to fetch cat breeds: ', error);
		throw new Error(genericApiErrorMessage);
	}
};

export { fetchCatsByBreed, fetchCatById, fetchCatBreeds };
