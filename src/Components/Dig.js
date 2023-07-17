import Button from './Button';
import { useContext } from 'react';
import { playerContext } from '../PlayerContext';
import { styled } from 'styled-components';

const Dig = () => {
    const { playerData, setPlayerData, DIGGING, currentProgress, setCurrentProgress, notify } =
        useContext(playerContext);
    const { currentDepth, digSpeed} = playerData;

    return (
        <Wrapper>
            <progress value={currentProgress > 0 ? currentProgress : null} max={100} />
            <Button
                text={'Dig'}
                onClick={() => {
                    if (currentProgress + digSpeed <= 100) {
                        setCurrentProgress(currentProgress + digSpeed);
                    } else {
                        setCurrentProgress(0);
                        DIGGING(currentDepth, playerData, setPlayerData, notify);
                    }
                }}
            />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;
    width: 100%;
    max-width: 600px;
    padding: 1rem;
    margin: 1rem;
    justify-content: center;
    align-items: center;
`;

export default Dig;
