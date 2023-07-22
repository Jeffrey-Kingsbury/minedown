import {styled} from 'styled-components';
import img1 from '../../../Engine/img/tab1-1.png';
const Tab1 = () => {
    return (
        <Wrapper>
            <span>
                <img src={img1} alt="mouse" />
                <div>
                    <h2>You need a mouse</h2>
                    <hr/>
                <p>Minedown is an incremental idle game where you dig to gain resources, upgrade your pickaxe, build buildings, and watch numbers go up.</p>
                </div>
            </span>
        </Wrapper>
    );
};

const Wrapper = styled.div`
margin-top: 2rem;
span{
    display: flex;

    img{
        height: 50px;
    }

    p{
        margin-left: 1rem;
        font-size: small;
    }

    h2{
        font-size: 1rem;
        margin: 0;
    }
}
`;

export default Tab1;
