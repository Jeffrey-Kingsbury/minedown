import { useContext, useEffect, useRef } from 'react';
import { playerContext } from '../PlayerContext';
import { CHANGE_DEPTH, PICKAXES, RESOURCES, COLOR_PICKER } from '../Engine/Engine';
import Button from './Button';
import { styled } from 'styled-components';
import Select from './Select';

const PlayerData = () => {
    const selectRef = useRef(null);
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

    useEffect(() => {
        selectRef.current.value = currentDepth;
    }, [playerData]);

    const depthArray = [];
    for (let x = 1; x <= playerData.maxDepth; x++) {
        depthArray.push(x);
    }

    return (
        <>
            <Container title="player data">
                <p>Wallet: {wallet}$</p>
                <p>Current ⛏: {pickaxeData && pickaxeData.name}</p>
                <p>Pickaxe Max Depth: {pickaxeData && pickaxeData.digDepth}</p>
                <p style={{ fontFamily: 'arial, sans-serif!important' }}>Current Depth: {currentDepth}</p>
                <span>
                    Resources at current depth:{' '}
                    {resourcesAtDepth().map((e, i) => {
                        if (i === resourcesAtDepth().length - 1) {
                            return (
                                <p key={e.name} style={{ display: 'inline', color: COLOR_PICKER[e.name] || 'black' }}>
                                    {e.name}
                                </p>
                            );
                        } else {
                            return (
                                <span key={e.name}>
                                    <p style={{ display: 'inline', color: COLOR_PICKER[e.name] }}>{e.name}</p>,{' '}
                                </span>
                            );
                        }
                    })}
                </span>
                <p>Max Depth: {maxDepth}</p>
                <p>Number of times you've dug at the max depth: {depthProgress.realDigCount}</p>
                <p>
                    Chance of unlocking a new depth:{' '}
                    {depthProgress.unlockChance <= 0 ? 0 : (depthProgress.unlockChance * 100).toFixed(0)}%
                </p>

                <Button
                    text="Depth UP"
                    onClick={() => {
                        CHANGE_DEPTH(playerData, setPlayerData, currentDepth - 1);
                    }}
                />
                <Button
                    text="Depth DOWN"
                    onClick={() => {
                        CHANGE_DEPTH(playerData, setPlayerData, currentDepth + 1);
                    }}
                />

                <p className="selectTitle">Select depth</p>
                <select
                    ref={selectRef}
                    onChange={() => {
                        CHANGE_DEPTH(playerData, setPlayerData, selectRef.current.value);
                    }}
                >
                    {depthArray.map((e) => {
                        return (
                            <option key={e} value={e}>
                                {e}
                            </option>
                        );
                    })}
                </select>
            </Container>
        </>
    );
};

const Wrapper = styled.div`
    border: 1px solid black;
    width: 48%;
    min-width: 600px;
    padding: 1rem;
    box-sizing: border-box;
    margin: 0 0 1rem 0;
    p,
    span {
        font-size: 20px;
        font-weight: 300;
        margin: 15px 0;
    }
    .selectTitle {
        margin: 1rem 0 0 1rem;
    }
    select {
        display: block;
        width: 100%;
        max-width: 150px;
        height: 50px;
        margin: 1rem;
    }
`;
export default PlayerData;
