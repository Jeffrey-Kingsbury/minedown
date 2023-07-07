import { styled } from "styled-components";

const WideWrapper = ({children}) => {

    return(<Wrapper>
        {children}
    </Wrapper>)
};

const Wrapper = styled.div`
width: 100%;
flex-wrap: wrap;
display: flex;
flex-direction: row;
justify-content: center;
align-items: flex-start;
`;

export default WideWrapper;