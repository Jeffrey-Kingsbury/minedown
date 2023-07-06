import { styled } from 'styled-components';
import { useContext, useMemo } from 'react';
import { playerContext } from '../PlayerContext';
import Blacksmith from './Blacksmith';
import Button from './Button';
import Store from './Store';
import Recruiter from './Recruiter';
import PlayerData from './PlayerData';
import Resources from './Resources';
import Dig from './Dig';
import { PLAYER } from '../Engine/Engine';

const GameArea = () => {
    const { playerData, setPlayerData, CHECK_DISABLED, BUILD_BUILDING, BUILDINGS, notify } = useContext(playerContext);
    const { buildings } = playerData;
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
            <Title>Minedown
                <p>version {PLAYER.version}</p>
            </Title>
            
            <Dig />

            {playerData && <PlayerData />}

            <Resources />

            {buildings.blacksmith && <Blacksmith />}
            {buildings.store && <Store />}
            {buildings.recruiter && <Recruiter />}



            {Object.keys(BUILDINGS).map((building) => {
                if(buildings[building]) return null;
                if(BUILDINGS[building].requires ? !buildings[BUILDINGS[building].requires] : false) return null;
                return (
                    <Button
                        key={building}
                        text={`Build a ${building} (${buildingCostString(building)})`}
                        disabled={CHECK_DISABLED(playerData, BUILDINGS[building].cost)}
                        onClick={() => {

                            BUILD_BUILDING(playerData, setPlayerData, building, notify);
                        }}
                    />
                )
            })
            }
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
p{
    font-size: 10px;
    text-align: right;
    width: 100%;
}
`;

export default GameArea;
