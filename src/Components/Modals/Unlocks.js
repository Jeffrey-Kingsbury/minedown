import { styled } from 'styled-components';
import { PLAYER_UPGRADES } from '../../Engine/Engine';

const Unlocks = ({ setUnlocksOpen, playerData }) => {
	return (
		<Wrapper className='window'>
			<div className='title-bar'>
				<div className='title-bar-text'>Unlocks</div>
				<div className='title-bar-controls'>
					<button
						aria-label='Close'
						onClick={() => {
							setUnlocksOpen(false);
						}}
					/>
				</div>
			</div>
			<div className='window-body'>
				<h1>Unlocks:</h1>
				<hr />

				{Object.entries(PLAYER_UPGRADES).map((e, i) => {
					if (playerData.upgrades[e[0]]) {
						return (
							<h2>
								{e[1].name} - {e[1].description} <hr />
							</h2>
						);
					}
				})}
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: 100%;
	width: 600px;
	display: flex;
	flex-direction: column;
	max-height: 70dvh;

	.window {
		height: 100%;
	}

	h1 {
		font-size: 2rem;
		font-weight: bold;
		margin: 0 0 1rem 0;
	}

	h2 {
		font-size: 1rem;
		margin: 0 0 1rem 0;
	}

	hr {
		margin: 1rem auto;
		width: 90%;
	}
`;
export default Unlocks;
