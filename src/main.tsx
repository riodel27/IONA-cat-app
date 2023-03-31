/* eslint-disable import/default */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { router } from './router/router';
import CatBreedsProvider from './contexts/CatBreedsContext';

// eslint-disable-next-line import/no-named-as-default-member
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<CatBreedsProvider>
			<RouterProvider router={router} />
		</CatBreedsProvider>
	</React.StrictMode>
);
