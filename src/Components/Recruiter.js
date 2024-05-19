import { useContext } from 'react';
import Button from './Button';
import Container from './Container';
import { playerContext } from '../PlayerContext';
import { HIRE_MINER } from '../Engine/Engine';
import styled from 'styled-components';

const Recruiter = () => {
	const { playerData, setPlayerData, notify } = useContext(playerContext);
	const minerPrice = playerData.miners.miner > 0 ? (5 * Math.pow(1.07, playerData.miners.miner)).toFixed(0) : 5;
	const excavatorPrice = playerData.miners.excavator > 0 ? (100 * Math.pow(1.07, playerData.miners.excavator)).toFixed(0) : 100;

	return (
		<Container title={'recruiter'}>
			<Wrapper>
				<span>
					Total Miners: {playerData.miners.miner}
					<Button
						text={`Hire Miner (${minerPrice > 99999999999999 ? Number(minerPrice).toExponential(2) : Number(minerPrice).toLocaleString()}$)`}
						onClick={() => {
							if (playerData.wallet >= minerPrice) {
								HIRE_MINER(playerData, setPlayerData, minerPrice, 1, 'miner');
							}
						}}
						disabled={playerData.wallet < minerPrice}
					/>
				</span>
				{playerData.miners.miner >= 50 && (
					<span>
						Total Excavators: {playerData.miners.excavator}
						<Button
							text={`Hire Excavator (${
								excavatorPrice > 99999999999999 ? Number(excavatorPrice).toExponential(2) : Number(excavatorPrice).toLocaleString()
							}$)`}
							onClick={() => {
								if (playerData.wallet >= excavatorPrice) {
									HIRE_MINER(playerData, setPlayerData, excavatorPrice, 1, 'excavator');
								}
							}}
							disabled={playerData.wallet < excavatorPrice}
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
