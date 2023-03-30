import { createBrowserRouter, Link } from 'react-router-dom';
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
		element: (
			<>
				<h1>Single Cat Page</h1>
				<Link to={`/`}>Back</Link>
			</>
		),
		errorElement: <ErrorPage />,
	},
]);
