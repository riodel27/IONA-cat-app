import './App.css';

import styled from 'styled-components';
import { Button } from 'react-bootstrap';

const StyledButton = styled(Button)`
	background-color: #007bff;
	border-color: #007bff;
	&:hover {
		background-color: #0069d9;
		border-color: #0062cc;
	}
`;

function App() {
	return (
		<div className="App">
			<h1>IONA Test exercise cat application</h1>

			<Button variant="danger">React Bootstrap Button</Button>

			<StyledButton>Styled Button</StyledButton>
		</div>
	);
}

export default App;
