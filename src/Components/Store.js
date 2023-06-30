import { useContext } from 'react';
import Button from './Button';
import Container from './Container';
import { playerContext } from '../PlayerContext';

const Store = () => {
    const { playerData, setPlayerData, notify } = useContext(playerContext);

    return (
        <Container title={'Store'}>
           

        </Container>
    );
};

export default Store;
