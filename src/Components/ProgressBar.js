import { styled } from 'styled-components';

const ProgressBar = ({ currentProgress = 0 }) => {
    return (
        <Wrapper>
            <Outer>
                <Inner currentprogress={currentProgress}></Inner>
            </Outer>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    max-width: 600px;

`;
const Outer = styled.div`
    width: 100%;
    height: 30px;
    border: 1px solid black;
`;
const Inner = styled.div`
    height: 100%;
    background-color: green;
    width: ${(props) => (props.currentprogress ? props.currentprogress : 0)}%;
    transition: all 0.2s ease-in-out;
`;

export default ProgressBar;
