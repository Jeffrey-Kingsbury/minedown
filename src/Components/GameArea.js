import { styled } from 'styled-components';
import { useContext } from 'react';
import { playerContext } from '../PlayerContext';
import ProgressBar from './ProgressBar';
import Blacksmith from './Blacksmith';
import Button from './Button';
import Container from './Container';

const GameArea = () => {
    const { playerData, setPlayerData, DIGGING, currentProgress, setCurrentProgress, CHECK_DISABLED, BUILD_BUILDING, PICKAXES, notify } =
        useContext(playerContext);
    const { wallet, currentDepth, maxDepth, depthProgress, resources, buildings } = playerData;

    const digSpeed = PICKAXES[playerData.pickaxe].speed;
    const pickaxeData = PICKAXES[playerData.pickaxe];

    return (
        <Wrapper>
            <ProgressBar currentProgress={currentProgress} />
            <Button
                text={'Dig'}
                func={() => {
                    if (currentProgress + digSpeed <= 100) {
                        setCurrentProgress(currentProgress + digSpeed);
                    } else {
                        setCurrentProgress(0);
                        DIGGING(currentDepth, playerData, setPlayerData, notify);
                    }
                }}
            />
            
            <Container title={'Player Info'}>
                <p>Pickaxe: {pickaxeData.name}</p>
                <p>Pickaxe Max Depth: {pickaxeData.digDepth}</p>
                <p>Current Depth: {currentDepth}</p>
                <p>Max Depth: {maxDepth}</p>
                <p>Number of times you've dug at the max depth: {depthProgress.realDigCount}</p>
                <p>
                    Chance of unlocking a new depth:{' '}
                    {depthProgress.unlockChance <= 0
                        ? 0
                        : (depthProgress.unlockChance * (currentDepth * 100)).toFixed(0)}
                    %
                </p>
                <p>Wallet: {wallet}$</p>
            </Container>

            <Container title={'resources'}>
                {resources &&
                    Object.keys(resources).map((resource) => {
                        return (
                            <p key={resource}>
                                {resource}: {resources[resource]}
                            </p>
                        );
                    })}
            </Container>

            {buildings.blacksmith && <Blacksmith />}

            {!buildings.blacksmith && (
                <Button
                    text={'Build Blacksmith (25 Sand, 10 Stone, 5 Coal)'}
                    disabled={CHECK_DISABLED(playerData, 'blacksmith')}
                    func={() => {
                        BUILD_BUILDING(playerData, setPlayerData, 'blacksmith', notify);
                    }}
                />
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    border: 1px solid black;
    user-select: none;
`;

export default GameArea;
