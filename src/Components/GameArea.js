import { styled } from 'styled-components';
import { useContext, useMemo, useState } from 'react';
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
    return (
        <Wrapper>
            <Dialog open={changelogOpen}>
                <Changelog setChangelogOpen={setChangelogOpen} />
            </Dialog>
            <Title>
                Minedown
                <p
                    onClick={() => {
                        setChangelogOpen(!changelogOpen);
                    }}
                >
                    version {PLAYER.version}
                </p>
            </Title>

            <Dig />

            <WideWrapper>
                {playerData && <PlayerData />}
                <Resources />
            </WideWrapper>

            <WideWrapper>
                {!buildings.blacksmith && <Blacksmith />}
                {!buildings.store && <Store />}
            </WideWrapper>
            <WideWrapper>
                {!buildings.recruiter && <Recruiter />}

                <Container>
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
            </WideWrapper>
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

const Title = styled.h1`
    width: 100%;
    max-width: 600px;
    font-size: 55px;
    font-family: 'Press Start', cursive;
    margin: 1rem;
    text-align: center;
    p {
        font-size: 10px;
        text-align: right;
        width: 100%;
        cursor: pointer;
    }
`;

const Dialog = styled.dialog`
    margin-top: 1rem;
    width: 80%;
    background-color: white;
    z-index: 9999999;
`;

export default GameArea;
