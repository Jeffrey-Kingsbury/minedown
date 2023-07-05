import Container from './Container';
import { useContext } from 'react';
import { playerContext } from '../PlayerContext';
import { CHANGE_DEPTH, PICKAXES, RESOURCES, COLOR_PICKER } from '../Engine/Engine';
import Button from './Button';
import { styled } from 'styled-components';
const PlayerData = () => {
    const { playerData, setPlayerData } = useContext(playerContext);
    const { wallet, currentDepth, maxDepth, depthProgress } = playerData;
    const pickaxeData = PICKAXES[playerData.pickaxe];
    const resourcesAtDepth = () => {
        const depth = currentDepth;
        const potentialResources = Object.values(RESOURCES.dig).filter(
            (resource) => resource.depth <= depth && (resource.stopDepth >= depth || resource.stopDepth === 0)
        );
        return potentialResources;
    };

    return (
        <>
        {!playerData.inHell && <Container title={'Player Data'}>
            <p>Pickaxe: {pickaxeData && pickaxeData.name}</p>
            <p>Pickaxe Max Depth: {pickaxeData && pickaxeData.digDepth}</p>
            <p style={{fontFamily:'arial, sans-serif!important'}}>Current Depth: {currentDepth}</p>
            <span>
                Resources at current depth:{' '}
                {resourcesAtDepth().map((e, i) => {
                    if (i === resourcesAtDepth().length - 1) {
                        return <p key={e.name} style={{ display: 'inline', color: COLOR_PICKER(e.name) }}>{e.name}</p>;
                    } else {
                        return <span key={e.name}><p style={{ display: 'inline', color: COLOR_PICKER(e.name) }}>{e.name}</p>, </span>;
                    }
                })}
            </span>
            <p>Max Depth: {maxDepth}</p>
            <p>Number of times you've dug at the max depth: {depthProgress.realDigCount}</p>
            <p>
                Chance of unlocking a new depth:{' '}
                {depthProgress.unlockChance <= 0 ? 0 : (depthProgress.unlockChance * 100).toFixed(0)}%
            </p>
            <p>Wallet: {wallet}$</p>
            <Button
                text="Depth UP"
                onClick={() => {
                    CHANGE_DEPTH(playerData, setPlayerData, -1);
                }}
                disabled={currentDepth - 1 < 1}
                />
            <Button
                text="Depth DOWN"
                onClick={() => {
                    CHANGE_DEPTH(playerData, setPlayerData, 1);
                }}
                disabled={currentDepth + 1 > maxDepth}
                />
        </Container>}
                </>
    );
};

const Dialog = styled.dialog`
width: 100%;
height: 100dvh;
background-color: white;
z-index: 999999;
position: absolute;
::backdrop {
    background-color: white;
}
`;
export default PlayerData;
