import { useContext, useState } from 'react';
import Button from './Button';
import Container from './Container';
import { playerContext } from '../PlayerContext';
import { styled } from 'styled-components';
import { PLAYER_UPGRADES, RESOURCES, SELL_RESOURCE } from '../Engine/Engine';
const Store = () => {
	const { playerData, setPlayerData, notify } = useContext(playerContext);
	const [sellQuantity, setSellQuantity] = useState(1);

	return (
		<Container title={'store'}>
			<Outer>
				<Wrapper>
					Updrades
					<Inner>
						{Object.keys(PLAYER_UPGRADES).map((upgrade) => {
							if (playerData.upgrades[upgrade]) return null;
							if (!PLAYER_UPGRADES[upgrade].unlockRequirement(playerData)) return null;

							return (
								<Button
									key={upgrade}
									text={`${PLAYER_UPGRADES[upgrade].name} - ${PLAYER_UPGRADES[upgrade].description} ${PLAYER_UPGRADES[upgrade].priceString}`}
									disabled={PLAYER_UPGRADES[upgrade].isDisabled(playerData, upgrade)}
									onClick={() => {
										PLAYER_UPGRADES[upgrade].upgradeFunction(playerData, setPlayerData, upgrade, notify);
									}}
								/>
							);
						})}
					</Inner>
				</Wrapper>
				Sell
				<Wrapper>
					<Inner>
						{Object.keys(playerData.items).map((item) => {
							if (playerData.items[item] < 1) return null;
							if (RESOURCES.dig[item] && RESOURCES.dig[item].value <= 0) return null;
							if (RESOURCES.dig[item]) {
								return (
									<Button
										key={item}
										text={`Sell ${sellQuantity}x ${item} for $${Number(RESOURCES.dig[item].value).toLocaleString('en')}`}
										disabled={false}
										onClick={() => {
											SELL_RESOURCE(playerData, setPlayerData, item, 1, notify);
										}}
									/>
								);
							} else {
								return (
									<Button
										key={item}
										text={`Sell ${sellQuantity}x ${item} for $${Number(RESOURCES.craft[item].value).toLocaleString('en')}`}
										disabled={false}
										onClick={() => {
											SELL_RESOURCE(playerData, setPlayerData, item, 1, notify);
										}}
									/>
								);
							}
						})}
					</Inner>
				</Wrapper>
			</Outer>
		</Container>
	);
};

const Outer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
`;
const Wrapper = styled.div`
	width: 90%;
	margin: 1rem;
	height: auto;
	min-width: 700px;
	position: relative;
	text-transform: capitalize;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Title = styled.p`
	background-color: white;
	top: -10px;
	font-size: large;
	font-family: 'Courier New', Courier, monospace;
	padding: 0 1rem;
	position: absolute;
	text-decoration: underline;
	text-underline-offset: 2px;
`;

const Inner = styled.div`
	width: 100%;
	max-width: 600px;
	height: 100%;
	min-height: 200px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: row;
	flex-wrap: wrap;
	border: 1px solid black;
	overflow-y: auto;
	overflow-x: hidden;
	gap: 3px;
`;

export default Store;
