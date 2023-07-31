import Container from './Container';
import { useContext, useState } from 'react';
import { playerContext } from '../PlayerContext';
import { COLOR_PICKER } from '../Engine/Engine';
import { styled } from 'styled-components';
import { RESOURCES } from '../Engine/Engine';

const Resources = () => {
    const { playerData } = useContext(playerContext);
    const { items } = playerData;
    const [allNullDug, setAllNullDug] = useState(true);
    const [allNullCrafted, setAllNullCrafted] = useState(true);

    return (
        <Container title='resources'>
            <Title>Raw Resources</Title>
            <Items>
                {allNullDug && <p>None</p>}
                {Object.keys(RESOURCES.dig).map((resource) => {
                    if(items[resource] === null && RESOURCES.dig[resource].depth > playerData.maxDepth) return null;
                    if(allNullDug) setAllNullDug(false);
                    return (
                        <p key={resource} style={{ color: COLOR_PICKER[resource] || 'black' }}>
                            {resource}: {items[resource] === null ? 0 : items[resource]}
                        </p>
                    );
                })}
            </Items>

            <Title>Crafted Resources</Title>
            <Items>
                {allNullCrafted && <p>None</p>}
                {
                Object.keys(RESOURCES.craft).map((resource) => {
                    if (items[resource] === null) return null;
                    if(allNullCrafted) setAllNullCrafted(false);
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
