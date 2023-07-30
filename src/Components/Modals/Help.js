import { styled } from 'styled-components';
import { useState } from 'react';
import Tab0 from './helptabs/Tab0';
import Tab1 from './helptabs/Tab1';

const Help = ({ setHelpOpen }) => {
    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <Wrapper className="window">
            <div className="title-bar">
                <div className="title-bar-text">Help</div>
                <div className="title-bar-controls">
                    <button
                        aria-label="Close"
                        onClick={() => {
                            setHelpOpen(false);
                        }}
                    />
                </div>
            </div>
            <div className="window-body">
                <h1>Credits & stuff</h1>
                <hr />
                        {selectedTab === 0 && <Tab0 />}
                    
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    height: 70dvh;

    .window{
        height: 100%;
    }

    h1 {
        font-size: 2rem;
        font-weight: bold;
        margin: 0 0 1rem 0;
    }

    h2 {
        font-size: 1rem;
        margin: 0 0 1rem 0;
    }

    hr {
        margin: 1rem auto;
        width: 90%;
    }
`;
export default Help;
