import { styled } from 'styled-components';

const Container = ({ children, title }) => {
    return (
        <Wrapper className="window">
            <div className="title-bar">
                <div className="title-bar-text">{title}</div>
                <div className="title-bar-controls">
                    <button aria-label="Minimize" />
                    <button aria-label="Maximize" />
                    <button aria-label="Close" />
                </div>
            </div>
            <div className="window-body">{children}</div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 48%;
    min-width: 600px;
    margin: 1rem 0rem;
    position: relative;
    text-transform: capitalize;
    font-size: larger;
`;

export default Container;
