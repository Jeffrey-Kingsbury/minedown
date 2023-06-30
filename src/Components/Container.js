import { styled } from 'styled-components';

const Container = ({ children, title }) => {
    return (
        <Wrapper>
            <Title>{title}</Title>
            <Inner>{children}</Inner>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    max-width: 600px;
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
    flex-direction: column;
    border: 1px solid black;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 1rem;
    gap: 3px;
`;

export default Container;
