import { createBrowserRouter, Link } from 'react-router-dom';
import CatPage from '../pages/CatPage';
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/HomePage';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />,
		errorElement: <ErrorPage />,
	},
	{
		path: '/:id',
		element: <CatPage />,
		errorElement: <ErrorPage />,
	},
]);
