import { useContext } from 'react';
import Button from './Button';
import Container from './Container';
import { playerContext } from '../PlayerContext';
import { PICKAXES, UPGRADE_PICKAXE } from '../Engine/Engine';

const Blacksmith = () => {
    const { playerData, setPlayerData, notify } = useContext(playerContext);

    const nextPickaxe = PICKAXES[playerData.pickaxe + 1] ? PICKAXES[playerData.pickaxe + 1] : null;
    const nextPickaxeCostString = () => {
        if (nextPickaxe) {
            return Object.keys(nextPickaxe.cost).map((resource) => {
                return ` ${resource}: ${nextPickaxe.cost[resource]} `;
            });
        } else {
            return false;
        }
    };

    return (
        <Container title={'blacksmith'}>
            {nextPickaxe && (
                <Button text={`Upgrade pickaxe to ${nextPickaxe.name} (${nextPickaxeCostString()})`} func={() => {
                    UPGRADE_PICKAXE(setPlayerData, playerData, notify);
                }} />
            )}
        </Container>
    );
};

export default Blacksmith;
