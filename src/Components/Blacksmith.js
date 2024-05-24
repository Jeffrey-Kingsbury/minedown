import { useContext, useMemo, useState } from 'react';
import Button from './Button';
import Container from './Container';
import { playerContext } from '../PlayerContext';
import { PICKAXES, UPGRADE_PICKAXE, CRAFT_ITEM, CHECK_DISABLED, RESOURCES } from '../Engine/Engine';

const Blacksmith = () => {
	const { playerData, setPlayerData, notify } = useContext(playerContext);
	const [qty, setQty] = useState(1);
	const nextPickaxe = useMemo(() => PICKAXES[playerData.pickaxe + 1] ?? null, [playerData.pickaxe]);
	const calcCost = (resource) => {
		return resource * qty;
	};
	const nextPickaxeCostString = useMemo(() => {
		return (
			nextPickaxe?.cost &&
			Object.keys(nextPickaxe.cost).map((resource) => {
				return ` ${resource}: ${nextPickaxe.cost[resource]} `;
			})
		);
	}, [nextPickaxe]);

	const getBarCost = (bar) => {
		return Object.keys(RESOURCES.craft[bar].cost).map((resource) => {
			return ` ${resource}: ${RESOURCES.craft[bar].cost[resource] * qty} `;
		});
	};

	return (
		<Container title={'blacksmith'}>
			{/* Display upgrade pickaxe button if the next pickaxe exists */}
			{nextPickaxe &&
				playerData.buildings[nextPickaxe.blacksmith] && ( //prettier-ignore
					<Button
						text={`Upgrade pickaxe to ${nextPickaxe.name} (${nextPickaxeCostString})`}
						onClick={() => {
							UPGRADE_PICKAXE(setPlayerData, playerData, notify);
						}} // Call upgrade pickaxe function on click
						disabled={CHECK_DISABLED(playerData, nextPickaxe.cost)} // Disable the button if the upgrade is not affordable
					/>
				)}

			{/* Map through all craftable resources and display a button for each if the player has seen the required resources */}
			<hr />
			<span>
				craft:
				<Button
					text={'1x'}
					onClick={() => {
						setQty(1);
					}}
				/>
				<Button
					text={'25x'}
					onClick={() => {
						setQty(25);
					}}
				/>
				<Button
					text={'100x'}
					onClick={() => {
						setQty(100);
					}}
				/>
			</span>
			<hr />
			<div>
				{Object.entries(RESOURCES.craft).map(([bar, craft]) => {
					// Check if the player has seen the required resource(s)
					const hasPlayerSeenResources = Object.keys(craft.cost).every((resource) => playerData.items[resource] != null);

					// If player has seen the required resource(s) before, render the craft button
					if (hasPlayerSeenResources) {
						return (
							//prettier-ignore
							<Button
                        key={bar}
                        text={`Smith ${qty} ${bar} (${getBarCost(bar)})`}
                        onClick={() => {CRAFT_ITEM(bar, playerData, setPlayerData, notify, qty);}} // Call Smith bars function on click
                        disabled={CHECK_DISABLED(playerData, craft.cost, qty)} // Disable the button if the bar is not affordable
                        />
						);
					}
					return null;
				})}
			</div>
		</Container>
	);
};

export default Blacksmith;
