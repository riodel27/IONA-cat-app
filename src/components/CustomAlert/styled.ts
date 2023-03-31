import { Alert } from 'react-bootstrap';
import styled from 'styled-components';

export const StyledAlert = styled(Alert)`
	/* Customize the style of the Alert here */
	max-width: 400px;
	margin: 10px auto;
	white-space: normal;

	@media screen and (max-width: 576px) {
		max-width: 100%;
		margin: 10px;
	}
`;
