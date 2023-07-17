import { styled } from 'styled-components';
import Draggable from 'react-draggable';
import { useRef, useContext } from 'react';
import { playerContext } from '../PlayerContext';

const Container = ({ children, title }) => {
    const { playerData, setPlayerData } = useContext(playerContext);
    const windowRef = useRef(null);
    const setZIndex = () => {
        //set all other windows to z-index 1
        const windows = document.querySelectorAll('.window');
        windows.forEach((window) => {
            window.style.zIndex = 100;
        });
        windowRef.current.style.zIndex = 200;
    };
    const minimize = () => {
        const minimized = playerData.minimized;
        minimized[title] = true;
        setPlayerData({ ...playerData, minimized: minimized });
    };

    const isMobileDevice = () => {
        return typeof window.orientation !== 'undefined' || navigator.userAgent.indexOf('IEMobile') !== -1;
    };
    if (isMobileDevice())
        return (
            <Wrapper
                className="window"
                ref={windowRef}
                onClick={() => {
                    setZIndex();
                }}
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
    else {
        return (
            <Draggable handle=".title-bar" defaultPosition={{ x: 0, y: 0 }} position={null} scale={1}>
                <Wrapper
                    className="window"
                    ref={windowRef}
                    onClick={() => {
                        setZIndex();
                    }}
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
            </Draggable>
        );
    }
};

const Wrapper = styled.div`
    margin: 1rem 0rem;
    text-transform: capitalize;
    font-size: larger;
    resize: both !important;
    max-width: 1000px;
    min-width: 600px;
    .title-bar {
        cursor: grab;
    }

    .title-bar-text {
        cursor: default;
    }
`;

export default Container;
