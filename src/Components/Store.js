import { useContext } from 'react';
import Button from './Button';
import Container from './Container';
import { playerContext } from '../PlayerContext';
import { styled } from 'styled-components';
const Store = () => {
    const { playerData, setPlayerData, notify } = useContext(playerContext);

    return (
        <Container title={'Store'}>
            <Outer>

        <Wrapper>
            <Title>Purchase</Title>
            <Inner>


            </Inner>
        </Wrapper>

        <Wrapper>
            <Title>Sell</Title>
            <Inner></Inner>
        </Wrapper>

            </Outer>
        </Container>
    );
};

const Outer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;
const Wrapper = styled.div`
    width: 90%;
    margin: 1rem;
    height: auto;
    min-height: 200px;
    position: relative;
    text-transform: capitalize;
`;

const Title = styled.p`
    background-color: white;
    top: -10px;
    font-size: large;
    font-family: 'Courier New', Courier, monospace;
    padding: 0 1rem;
    position: absolute;
    text-decoration: underline;
    text-underline-offset: 2px;
`;

const Inner = styled.div`
    width: 100%;
    max-width: 600px;
    height: 100%;
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    border: 1px solid black;
    overflow-y: auto;
    overflow-x: hidden;
    gap: 3px;
    
`;

export default Store;
