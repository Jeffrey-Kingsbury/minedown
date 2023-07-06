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
    margin: 2rem;
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
    height: 100%;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 1rem;
    gap: 3px;
    --shadow-color: 0deg 0% 64%;
    box-shadow: 0.2px 0.2px hsl(var(--shadow-color) / 0.45),
    0px 0.9px 0.9px -0.5px hsl(var(--shadow-color) / 0.42),
    0px 1.8px 1.8px -1px hsl(var(--shadow-color) / 0.39),
    0.1px 3.2px 3.1px -1.5px hsl(var(--shadow-color) / 0.35),
    0.1px 5.6px 5.5px -2px hsl(var(--shadow-color) / 0.32);`;

export default Container;
