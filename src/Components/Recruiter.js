import { useContext } from 'react';
import Button from './Button';
import Container from './Container';
import { playerContext } from '../PlayerContext';
import { HIRE_MINER } from '../Engine/Engine';

const Recruiter = () => {
	const { playerData, setPlayerData, notify } = useContext(playerContext);
	const minerPrice = playerData.miners.qty > 0 ? (5 * Math.pow(1.07, playerData.miners.qty)).toFixed(0) : 5;

	return (
		<Container title={'recruiter'}>
			Total Miners: {playerData.miners.qty}
			<Button
				text={`Hire Miner (${minerPrice}$)`}
				onClick={() => {
					if (playerData.wallet >= minerPrice) {
						HIRE_MINER(playerData, setPlayerData, minerPrice);
					} else {
						notify("You can't afford to hire a miner", 'error');
					}
				}}
			/>
		</Container>
	);
};

export default Recruiter;
