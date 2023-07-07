import Container from './Container';
import { useContext } from 'react';
import { playerContext } from '../PlayerContext';
import { COLOR_PICKER } from '../Engine/Engine';
import { styled } from 'styled-components';
import { RESOURCES } from '../Engine/Engine';

const Resources = () => {
    const { playerData } = useContext(playerContext);
    const { items } = playerData;
    return (
        <Wrapper>
            <Title>Raw Resources</Title>
            <Items>
                {Object.keys(RESOURCES.dig).map((resource) => {
                    if (items[resource] === null) return null;
                    return (
                        <p key={resource} style={{ color: COLOR_PICKER[resource] || 'black' }}>
                            {resource}: {items[resource]}
                        </p>
                    );
                })}
            </Items>

            <Title>Crafted Resources</Title>
            <Items>
                {Object.keys(RESOURCES.craft).map((resource) => {
                    if (items[resource] === null) return null;
                    return (
                        <p key={resource} style={{ color: COLOR_PICKER[resource] || 'black' }}>
                            {resource}: {items[resource]}
                        </p>
                    );
                })}
            </Items>
        </Wrapper>
    );
};

const Title = styled.p`
    margin: 0% 0 15px 0;
    font-size: larger;
    font-weight: bold;
    font-family: 'Courier New', Courier, monospace;
    text-decoration: underline;
    text-underline-offset: 2px;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 300px;
    max-width: 600px;
    margin: 0 2rem;
    box-sizing: border-box;
`;

const Items = styled.div`
    display: flex;
    width: 80%;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 25px;
    text-transform: capitalize;
    font-size: large;
    font-weight: bold;
    margin: 0 0 25px 0;
`;
export default Resources;
