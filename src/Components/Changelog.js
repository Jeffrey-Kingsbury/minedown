import { styled } from 'styled-components';
import ReactMarkdown from 'react-markdown';
import changelog from '../Engine/changelog.md';
import { useEffect, useState } from 'react';

const Changelog = ({setChangelogOpen}) => {
    const [changelogText, setChangelogText] = useState('');

    useEffect(() => {
        fetch(changelog)
            .then((response) => response.text())
            .then((text) => {
                setChangelogText(text);
            });
    }, []);

    return (
        <Wrapper onClick={()=>{setChangelogOpen(false)}}>
            <Title>Changelog</Title>
            <ReactMarkdown>{changelogText}</ReactMarkdown>
        </Wrapper>
    );
};

const Title = styled.h1`
    width: 100%;
    font-size: 55px;
    font-family: 'Press Start', cursive;
    margin: 1rem 0 3rem 0;
    text-align: center;
`;

const Wrapper = styled.div`
font-family: monospace;
padding: 1rem;
box-sizing: border-box;
width: 100%;
height: 100%;
display: flex;
flex-direction: column;

li{
    margin: 0 0 .25rem 0;
    list-style: circle;
}
h3{
    font-size: larger;
    font-weight: bold;
    margin: 0 0 1rem 0;
}

hr{
    margin: 1rem 0;
    width: 600px;
}
`;
export default Changelog;
