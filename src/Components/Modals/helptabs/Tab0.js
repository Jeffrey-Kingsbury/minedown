import {styled} from 'styled-components';
import img1 from '../../../Engine/img/tab0-1.png';
const Tab0 = () => {
    return (
        <Wrapper>
            <span>
                <img src={img1} alt="Joystick" />
                <p>Minedown is an incremental idle game where you dig to gain resources, upgrade your pickaxe, build buildings, and watch numbers go up.</p>
            </span>
        </Wrapper>
    );
};

const Wrapper = styled.div`
margin-top: 2rem;
span{
    display: flex;
    p{
        margin-left: 1rem;
        font-size: small;
    }
}
`;

export default Tab0;
