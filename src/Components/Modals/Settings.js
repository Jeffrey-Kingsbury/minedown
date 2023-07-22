import { styled } from 'styled-components';

const Settings = ({ setSettingsOpen }) => {


    return (
        <Wrapper className="window">
            <div className="title-bar">
                <div className="title-bar-text">Settings</div>
                <div className="title-bar-controls">
                    <button
                        aria-label="Close"
                        onClick={() => {
                            setSettingsOpen(false);
                        }}
                    />
                </div>
            </div>
            <div className="window-body">
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    font-family: monospace;
    width: 100%;
    display: flex;
    flex-direction: column;

    .window-body {
        box-sizing: border-box;
        padding: 0 1rem;
        overflow-y: scroll;
        max-height: 70dvh;
    }

    li {
        margin: 0 0 0.25rem 0;
        list-style: circle;
    }
    h3 {
        font-size: larger;
        font-weight: bold;
        margin: 0 0 1rem 0;
    }

    hr {
        margin: 1rem auto;
        width: 90%;
    }
`;
export default Settings;
