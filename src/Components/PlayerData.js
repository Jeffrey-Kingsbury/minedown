import Container from './Container';
import { useContext } from 'react';
import { playerContext } from '../PlayerContext';
import { CHANGE_DEPTH, PICKAXES } from '../Engine/Engine';
import Button from './Button';
const PlayerData = () => {
    const { playerData, setPlayerData } = useContext(playerContext);
    const { wallet, currentDepth, maxDepth, depthProgress } = playerData;
    const pickaxeData = PICKAXES[playerData.pickaxe];

    return (
        <Container title={'Player Data'}>
            <p>Pickaxe: {pickaxeData.name}</p>
            <p>Pickaxe Max Depth: {pickaxeData.digDepth}</p>
            <p>Current Depth: {currentDepth}</p>
            <p>Max Depth: {maxDepth}</p>
            <p>Number of times you've dug at the max depth: {depthProgress.realDigCount}</p>
            <p>
                Chance of unlocking a new depth:{' '}
                {depthProgress.unlockChance <= 0 ? 0 : (depthProgress.unlockChance * 100).toFixed(0)}%
            </p>
            <p>Wallet: {wallet}$</p>
            <Button
            text='Depth UP'
            onClick={() => {
                CHANGE_DEPTH(playerData, setPlayerData, -1);
                
            }}
            disabled={currentDepth - 1 < 1}
            />
                        <Button
            text='Depth DOWN'
            onClick={() => {
                CHANGE_DEPTH(playerData, setPlayerData, 1);
                }}
            disabled={currentDepth + 1 > maxDepth}
            />
        </Container>
    );
};

export default PlayerData;
