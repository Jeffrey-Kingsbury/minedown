import { styled } from 'styled-components';

const Select = ({ children, value }) => {
    return <Wrapper value={value}>{children}</Wrapper>;
};

const Wrapper = styled.select`
    display: block;
    width: 100%;
    max-width: 150px;
    height: 50px;
    margin: 1rem;
`;

export default Select;
