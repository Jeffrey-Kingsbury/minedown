import { styled } from "styled-components";

const Minimized = ({ title, playerData, setPlayerData }) => {

    const maximize = () => {
        const minimized = playerData.minimized;
        delete minimized[title]
        setPlayerData({ ...playerData, minimized: minimized })
    }

    return (
        <Wrapper className="window">
            <div className="title-bar">
                <div className="title-bar-text">{title}</div>
                <div className="title-bar-controls">
                    <button aria-label="Maximize" onClick={()=>{maximize()}}></button>
                </div>
            </div>
        </Wrapper>
    );
};


const Wrapper = styled.div`
width: 300px;
`;

export default Minimized;