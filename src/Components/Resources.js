import Container from './Container';
import { useContext } from 'react';
import { playerContext } from '../PlayerContext';
import { COLOR_PICKER } from '../Engine/Engine';
import { styled } from 'styled-components';

const Resources = () => {
    const { playerData } = useContext(playerContext);
    const { resources, craftables } = playerData;
    return (
        <Container title={'resources'}>
            <Title>Raw Resources</Title>
            {Object.keys(resources).map((resource) => {
                if(resources[resource] === null) return null;
                return (
                    <p key={resource} style={{color:COLOR_PICKER(resource)}}>
                        {resource}: {resources[resource]}
                    </p>
                );
            })}

            <Title>Crafted Resources</Title>
            {Object.keys(craftables).map((resource) => {
                if(craftables[resource] === null) return null;
                return (
                    <p key={resource} style={{color:COLOR_PICKER(resource)}}>
                        {resource}: {craftables[resource]}
                    </p>
                );
            })}
        </Container>
    );
};

const Title = styled.p`
margin: 15px 0 5px 0;
font-size: large;
font-family: 'Courier New', Courier, monospace;
text-decoration: underline;
text-underline-offset: 2px;
`;
export default Resources;