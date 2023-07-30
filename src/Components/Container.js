import { styled } from 'styled-components';
import { useContext } from 'react';
import { playerContext } from '../PlayerContext';
import { isMobile } from 'react-device-detect';

const Container = ({ children, title }) => {
    const { playerData, setPlayerData } = useContext(playerContext);
    const minimize = () => {
        const minimized = playerData.minimized;
        minimized[title] = true;
        setPlayerData({ ...playerData, minimized: minimized });
    };

        return (
                <Wrapper
                    className="window"
                >
                    <div className="title-bar">
                        <div className="title-bar-text">{title}</div>
                        <div className="title-bar-controls">
                            <button
                                aria-label="Minimize"
                                onClick={() => {
                                    minimize();
                                }}
                            />
                        </div>
                    </div>
                    <div className="window-body">{children}</div>
                </Wrapper>
            
        );  
};

const Wrapper = styled.div`
    text-transform: capitalize;
    font-size: larger;
    resize: both !important;
    max-width: ${isMobile ? "85dvw" : "700px"};


    button {
        cursor: pointer;
    }
`;

export default Container;
