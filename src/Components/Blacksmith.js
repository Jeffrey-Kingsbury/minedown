import { useContext, useMemo } from 'react';
import Button from './Button';
import Container from './Container';
import { playerContext } from '../PlayerContext';
import { PICKAXES, UPGRADE_PICKAXE, SMITH_BARS, CHECK_DISABLED, RESOURCES } from '../Engine/Engine';

const Blacksmith = () => {
    const { playerData, setPlayerData, notify } = useContext(playerContext);

    const nextPickaxe = useMemo(() => PICKAXES[playerData.pickaxe + 1] ?? null, [playerData.pickaxe]);

    const nextPickaxeCostString = useMemo(() => {
        return (
            nextPickaxe?.cost &&
            Object.keys(nextPickaxe.cost).map((resource) => {
                return ` ${resource}: ${nextPickaxe.cost[resource]} `;
            })
        );
    }, [nextPickaxe]);

    const barCostString = useMemo(
        () => (bar) => {
            return (
                RESOURCES.craft[bar]?.cost &&
                Object.keys(RESOURCES.craft[bar].cost).map((resource) => {
                    return ` ${resource}: ${RESOURCES.craft[bar].cost[resource]} `;
                })
            );
        },
        []
    );

    return (
        <Container title={'blacksmith'}>
            {/* Display upgrade pickaxe button if the next pickaxe exists */}
            {nextPickaxe && //prettier-ignore
            <Button
                    text={`Upgrade pickaxe to ${nextPickaxe.name} (${nextPickaxeCostString})`}
                    onClick={() => { UPGRADE_PICKAXE(setPlayerData, playerData, notify);}} // Call upgrade pickaxe function on click
                    disabled={CHECK_DISABLED(playerData, nextPickaxe.cost)} // Disable the button if the upgrade is not affordable
                />}

            {/* Map through all craftable resources and display a button for each if the player has seen the required resources */}
{Object.entries(RESOURCES.craft).map(([bar, craft]) => {
    // Check if the player has seen the required resource(s)
    const hasPlayerSeenResources = Object.keys(craft.cost).every(
        (resource) => playerData.resources[resource] >= 0
    );

    // If player has seen the required resource(s) before, render the craft button
    if (hasPlayerSeenResources) {
        return (
            //prettier-ignore
            <Button
                key={bar}
                text={`Smith ${bar} (${barCostString(bar)})`}
                onClick={() => {SMITH_BARS(bar, playerData, setPlayerData, notify);}} // Call Smith bars function on click
                disabled={CHECK_DISABLED(playerData, craft.cost)} // Disable the button if the bar is not affordable
            />
        );
    }
    return null;
})}

        </Container>
    );
};

export default Blacksmith;
