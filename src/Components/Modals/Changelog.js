import { styled } from 'styled-components';
import ReactMarkdown from 'react-markdown';
import changelog from '../../Engine/changelog.md';
import { useEffect, useState } from 'react';

const Changelog = ({ setChangelogOpen }) => {
    const [changelogText, setChangelogText] = useState('');

    useEffect(() => {
        fetch(changelog)
            .then((response) => response.text())
            .then((text) => {
                setChangelogText(text);
            });
    }, []);

    return (
        <Wrapper className="window">
            <div className="title-bar">
                <div className="title-bar-text">Changelog</div>
                <div className="title-bar-controls">
                    <button
                        aria-label="Close"
                        onClick={() => {
                            setChangelogOpen(false);
                        }}
                    />
                </div>
            </div>
            <div className="window-body">
                <ReactMarkdown>{changelogText}</ReactMarkdown>
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
export default Changelog;
