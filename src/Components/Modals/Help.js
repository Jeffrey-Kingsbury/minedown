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
                <h1>The Minedown User-guide™</h1>
                <hr />

                <menu role="tablist">
                    <li role="tab" aria-selected={selectedTab === 0} onClick={() => setSelectedTab(0)}>
                        <a href="#tabs">What is Minedown?</a>
                    </li>
                    <li role="tab" aria-selected={selectedTab === 1} onClick={() => setSelectedTab(1)}>
                        <a href="#tabs">Getting started</a>
                    </li>
                    <li role="tab" aria-selected={selectedTab === 2} onClick={() => setSelectedTab(2)}>
                        <a href="#tabs">Pickaxes</a>
                    </li>
                    <li role="tab"  aria-selected={selectedTab === 3} onClick={() => setSelectedTab(3)}>
                        <a href="#tabs">Resources</a>
                    </li>
                    <li role="tab"  aria-selected={selectedTab === 4} onClick={() => setSelectedTab(4)}>
                        <a href="#tabs">Automation</a>
                    </li>
                    <li role="tab"  aria-selected={selectedTab === 5} onClick={() => setSelectedTab(5)}>
                        <a href="#tabs">The store</a>
                    </li>
                    <li role="tab"  aria-selected={selectedTab === 6} onClick={() => setSelectedTab(6)}>
                        <a href="#tabs">Credits</a>
                    </li>
                </menu>
                <div class="window" role="tabpanel">
                    <div class="window-body">
                        {selectedTab === 0 && <Tab0 />}
                        {selectedTab === 1 && <Tab1 />}
                    </div>
                </div>
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
