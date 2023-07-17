import { styled } from 'styled-components';
import GameArea from './Components/GameArea';
import "98.css";
function App() {
    return (
        <Wrapper>
            <GameArea />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    height: 100dvh;
    width: 100dvw;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`;
export default App;
