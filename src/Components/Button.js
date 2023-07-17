import { styled } from 'styled-components';

//prettier-ignore
const Button = ({ text='STR MISSING', onClick=()=>{return}, disabled=false }) => {
    return (
        <Wrapper type='button' disabled={disabled} onClick={onClick}>
            {text}
        </Wrapper>
    );
};

const Wrapper = styled.button`
    min-height: 30px;
    margin: .5rem 1rem;
    cursor: pointer;
    text-transform: capitalize;
    font-size: large;
    font-weight: bold;
`;

export default Button;
