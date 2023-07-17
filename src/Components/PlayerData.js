import { useContext, useEffect, useRef, useState } from 'react';
import { playerContext } from '../PlayerContext';
import { CHANGE_DEPTH, PICKAXES, RESOURCES, COLOR_PICKER } from '../Engine/Engine';
import Button from './Button';
import Container from './Container';

const PlayerData = () => {
    const selectRef = useRef(null);
    const { playerData, setPlayerData } = useContext(playerContext);
    const { wallet, currentDepth, maxDepth, depthProgress, upgrades } = playerData;
    const pickaxeData = PICKAXES[playerData.pickaxe];
    const [depthArray, setDepthArray] = useState([]);
    const [resources, setResources] = useState([]);

    useEffect(() => {
        if (!selectRef.current) return;
        selectRef.current.value = currentDepth;
        let tempDepthArray = [];
        for (let x = 1; x <= maxDepth; x++) {
            tempDepthArray.push(x);
        }
        setDepthArray(tempDepthArray);
    }, [playerData]);

    useEffect(() => {
        const potentialResources = Object.values(RESOURCES.dig).filter(
            (resource) =>
                resource.depth <= currentDepth && (resource.stopDepth >= currentDepth || resource.stopDepth === 0)
        );
        setResources(potentialResources);
    }, [currentDepth]);

    return (
        <>
            <Container title="player data">
                <p>Wallet: {wallet}$</p>
                <p>Current ⛏: {pickaxeData && pickaxeData.name}</p>
                <p>Pickaxe Max Depth: {pickaxeData && pickaxeData.digDepth}</p>
                <p style={{ fontFamily: 'arial, sans-serif!important' }}>Current Depth: {currentDepth}</p>
                <span>
                    Resources at current depth:{' '}
                    {resources.map((e, i) => {
                        return (
                            <span key={e.name}>
                                <p style={{ display: 'inline', color: COLOR_PICKER[e.name] }}>{e.name}</p>
                                {i !== resources.length - 1 && ', '}
                            </span>
                        );
                    })}
                </span>
                <p>Max Depth: {maxDepth}</p>
                <p>Number of times you've dug at the max depth: {depthProgress.realDigCount}</p>
                <p>
                    Chance of unlocking a new depth:{' '}
                    {depthProgress.unlockChance <= 0 ? 0 : (depthProgress.unlockChance * 1000).toFixed(0) >= 100 ? 90: (depthProgress.unlockChance * 1000).toFixed(0)}%
                </p>

                <Button
                    text="Depth UP"
                    onClick={() => {
                        CHANGE_DEPTH(playerData, setPlayerData, currentDepth - 1);
                    }}
                    disabled={currentDepth <= 1}
                />
                <Button
                    text="Depth DOWN"
                    onClick={() => {
                        CHANGE_DEPTH(playerData, setPlayerData, currentDepth + 1);
                    }}
                    disabled={currentDepth >= maxDepth}
                />

                {!upgrades.teleport && (
                    <>
                        <p className="selectTitle">Select depth</p>
                        <select
                            ref={selectRef}
                            onChange={() => {
                                if (selectRef.current) {
                                    CHANGE_DEPTH(playerData, setPlayerData, parseInt(selectRef.current.value));
                                }
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
                    </>
                )}
            </Container>
        </>
    );
};

export default PlayerData;
