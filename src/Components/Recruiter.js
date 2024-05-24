import { useContext, useState } from 'react';
import Button from './Button';
import Container from './Container';
import { playerContext } from '../PlayerContext';
import { HIRE_MINER } from '../Engine/Engine';
import styled from 'styled-components';

const Recruiter = () => {
	const { playerData, setPlayerData, notify } = useContext(playerContext);

	const [qty, setQty] = useState(1);
	const minerPrice = playerData.miners.miner > 0 ? (5 * Math.pow(1.07, playerData.miners.miner)).toFixed(0) : 5;
	const excavatorPrice = playerData.miners.excavator > 0 ? (100 * Math.pow(1.07, playerData.miners.excavator)).toFixed(0) : 100;
	const earthmoverPrice = playerData.miners.earthmover > 0 ? (20000 * Math.pow(1.07, playerData.miners.earthmover)).toFixed(0) : 20000;
	const calcPrice = (onePrice, ownedQty, baseMultiplier) => {
		const owned = ownedQty || 0; // Use 0 if ownedQty is undefined

		let totalCost = 0;
		for (let i = 0; i < qty; i++) {
			const itemCost = baseMultiplier * Math.pow(1.07, owned + i);
			totalCost += Math.round(itemCost); // Round each item's cost individually
		}

		return totalCost;
	};

	return (
		<Container title={'recruiter'}>
			<Wrapper>
				<span>
					Hire:
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
					<hr />
				</span>
				<span>
					Total Miners: {playerData.miners.miner ? playerData.miners.miner : 0}
					<Button
						text={`Hire ${qty} Miner${qty > 1 ? 's' : ''} (${
							calcPrice(minerPrice, playerData.miners.miner, 5) > 99999999999999
								? Number(calcPrice(minerPrice, playerData.miners.miner, 5)).toExponential(2)
								: Number(calcPrice(minerPrice, playerData.miners.miner, 5)).toLocaleString()
						}$)`}
						onClick={() => {
							if (playerData.wallet >= calcPrice(minerPrice, playerData.miners.miner, 5)) {
								HIRE_MINER(playerData, setPlayerData, calcPrice(minerPrice, playerData.miners.miner, 5), qty, 'miner');
							}
						}}
						disabled={playerData.wallet < calcPrice(minerPrice, playerData.miners.miner, 5)}
					/>
				</span>
				{playerData.miners.miner >= 50 && (
					<span>
						Total Excavators: {playerData.miners.excavator ? playerData.miners.excavator : 0}
						<Button
							text={`Hire ${qty} Excavator${qty > 1 ? 's' : ''} (${
								calcPrice(minerPrice, playerData.miners.excavator, 100) > 99999999999999
									? Number(calcPrice(minerPrice, playerData.miners.excavator, 100)).toExponential(2)
									: Number(calcPrice(minerPrice, playerData.miners.excavator, 100)).toLocaleString()
							}$)`}
							onClick={() => {
								if (playerData.wallet >= calcPrice(minerPrice, playerData.miners.excavator, 100)) {
									HIRE_MINER(playerData, setPlayerData, calcPrice(minerPrice, playerData.miners.excavator, 100), qty, 'excavator');
								}
							}}
							disabled={playerData.wallet < calcPrice(minerPrice, playerData.miners.excavator, 100)}
						/>
					</span>
				)}

				{playerData.miners.excavator >= 150 && (
					<span>
						Total Earth movers: {playerData.miners.earthmover ? playerData.miners.earthmover : 0}
						<Button
							text={`Hire ${qty} Earth mover${qty > 1 ? 's' : ''} (${
								calcPrice(minerPrice, playerData.miners.earthmover, 1000) > 99999999999999
									? Number(calcPrice(minerPrice, playerData.miners.earthmover, 1000)).toExponential(2)
									: Number(calcPrice(minerPrice, playerData.miners.earthmover, 1000)).toLocaleString()
							}$)`}
							onClick={() => {
								if (playerData.wallet >= calcPrice(minerPrice, playerData.miners.earthmover, 1000)) {
									HIRE_MINER(playerData, setPlayerData, calcPrice(minerPrice, playerData.miners.earthmover, 1000), qty, 'earthmover');
								}
							}}
							disabled={playerData.wallet < calcPrice(minerPrice, playerData.miners.earthmover, 1000)}
						/>
					</span>
				)}
			</Wrapper>
		</Container>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

export default Recruiter;
