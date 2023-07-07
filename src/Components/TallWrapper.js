import { styled } from "styled-components";

const TallWrapper = ({ children }) => {
    return (
        <Wrapper>
            {children}
        </Wrapper>
    );
}

const Wrapper = styled.div`

`;

export default TallWrapper;