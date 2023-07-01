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
    max-height: 50px;
    padding: 0 1rem;
    margin: .25rem 1rem;
    border: 1px solid black;
    border-radius: 3px;
    cursor: pointer;
    transition: all 0.1s ease-in-out;
    text-transform: capitalize;

    &&:active:not([disabled]) {
        transform: scale(0.98);
    }

    &:hover:not([disabled]) {
        transform: scale(1.02);
    }
`;

export default Button;
