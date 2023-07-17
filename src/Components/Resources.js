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
        <Container title='resources'>
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
        </Container>
    );
};

const Title = styled.p`
    margin: 0% 0 15px 0;
    font-size: larger;
    text-decoration: underline;
    text-underline-offset: 2px;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 48%;
    min-width: 600px;
    min-height: 300px;
    border: 1px solid black;
    padding: 1rem;
    box-sizing: border-box;
    margin: 0 0 1rem 0;

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
