import { styled } from 'styled-components';
import GameArea from './GameArea';

function App() {
	return <Wrapper>

		<GameArea />
	</Wrapper>;
}

const Wrapper = styled.div`
	height: 100dvh;
	width: 100dvw;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
`;
export default App;