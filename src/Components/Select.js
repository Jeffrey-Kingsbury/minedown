import { styled } from "styled-components";

const Select = ({children}) => {

    return (<Wrapper>
        {children}
    </Wrapper>)
}

const Wrapper = styled.select`

`;

export default Select;