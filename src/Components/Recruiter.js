import { useContext } from 'react';
import Button from './Button';
import Container from './Container';
import { playerContext } from '../PlayerContext';

const Recruiter = () => {
    const { playerData, setPlayerData, notify } = useContext(playerContext);

    return (
        <Container title={'recruiter'}>
           

        </Container>
    );
};

export default Recruiter;
