import { styled } from 'styled-components';
import { useContext, useEffect, useMemo, useState } from 'react';
import { playerContext } from '../PlayerContext';
import Blacksmith from './Blacksmith';
import Button from './Button';
import Store from './Store';
import Recruiter from './Recruiter';
import PlayerData from './PlayerData';
import Resources from './Resources';
import Dig from './Dig';
import { PLAYER } from '../Engine/Engine';
import WideWrapper from './WideWrapper';
import Changelog from './Changelog';
import Container from './Container';
import Minimized from './Minimized';
import { isMobile } from 'react-device-detect';
import Settings from '../Engine/img/settings.png';
import Help from '../Engine/img/help.png';

const GameArea = () => {
    const { playerData, setPlayerData, CHECK_DISABLED, BUILD_BUILDING, BUILDINGS, notify } = useContext(playerContext);
    const { buildings } = playerData;
    const [changelogOpen, setChangelogOpen] = useState(false);

    const buildingCostString = useMemo(
        () => (building) => {
            return (
                BUILDINGS[building]?.cost &&
                Object.keys(BUILDINGS[building].cost).map((resource) => {
                    return ` ${resource}: ${BUILDINGS[building].cost[resource]} `;
                })
            );
        },
        []
    );

    useEffect(() => {}, [playerData]);

    return (
        <Wrapper>
            <Dialog open={changelogOpen}>
                <Changelog setChangelogOpen={setChangelogOpen} />
            </Dialog>
            <Title>
                <span>
                    Minedown
                </span>
                <p
                    onClick={() => {
                        setChangelogOpen(!changelogOpen);
                    }}
                >
                    version {PLAYER.version}
                </p>
                <IconWrapper>
                <Icon src={Help} alt='Open settings' />
                <Icon src={Settings} alt='Open Help guide' />
                </IconWrapper>
            </Title>


            <Dig />

            <WideWrapper>
                {playerData && !playerData.minimized['player data'] && <PlayerData />}
                {!playerData.minimized['resources'] && <Resources />}
            </WideWrapper>

            <WideWrapper>
                {buildings.blacksmith && !playerData.minimized['blacksmith'] && <Blacksmith />}
                {buildings.store && !playerData.minimized['store'] && <Store />}
            </WideWrapper>
            <WideWrapper>
                {buildings.recruiter && !playerData.minimized['recruiter'] && <Recruiter />}

                {!playerData.minimized['unlocks'] && (
                    <Container title="unlocks">
                        {Object.keys(BUILDINGS).map((building) => {
                            if (buildings[building]) return null;
                            if (BUILDINGS[building].requires ? !buildings[BUILDINGS[building].requires] : false)
                                return null;
                            return (
                                <Button
                                    key={building}
                                    text={`Build a ${building} (${buildingCostString(building)})`}
                                    disabled={CHECK_DISABLED(playerData, BUILDINGS[building].cost)}
                                    onClick={() => {
                                        BUILD_BUILDING(playerData, setPlayerData, building, notify);
                                    }}
                                />
                            );
                        })}
                    </Container>
                )}
            </WideWrapper>
            <MinimizedWrapper>
                {Object.keys(playerData.minimized).map((minimized) => {
                    if (!playerData.minimized[minimized]) return null;
                    return <Minimized title={minimized} playerData={playerData} setPlayerData={setPlayerData} />;
                })}
            </MinimizedWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    border: 1px solid black;
    user-select: none;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const MinimizedWrapper = styled.div`
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: row;
    width: 100%;
    flex-wrap: wrap-reverse;
    z-index: 9999;
`;

const Title = styled.h1`
    width: 100%;
    font-size: clamp(2.5rem, 1rem + 6vw, 3.5rem);
    font-family: 'Press Start', cursive;
    margin: 1rem 0 0 0;
    text-align: center;
    position: relative;
    color: white;
    p {
        font-size: 10px;
        text-align: center;
        width: 100%;
        cursor: pointer;
    }
`;

const IconWrapper = styled.div`
top: 0;
width: 100px;
margin: 1rem auto 0 auto;
display: flex;
justify-content: space-between;
`;

const Icon = styled.img`
right: 1rem;
width: 35px;
cursor: pointer;

&:hover {
    transform: scale(1.1);
}
`;

const Dialog = styled.dialog`
    margin-top: 1rem;
    width: 80%;
    background-color: white;
    z-index: 9999999;
`;

export default GameArea;
