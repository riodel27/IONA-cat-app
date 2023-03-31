/* eslint-disable import/default */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { router } from './router/router';
import CatBreedsProvider from './contexts/CatBreedsContext';
import AlertProvider from './contexts/AlertContext';

// eslint-disable-next-line import/no-named-as-default-member
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<AlertProvider>
			<CatBreedsProvider>
				<RouterProvider router={router} />
			</CatBreedsProvider>
		</AlertProvider>
	</React.StrictMode>
);
