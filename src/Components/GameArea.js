import { styled } from 'styled-components';
import { useContext, useEffect, useMemo, useState } from 'react';
import { playerContext } from '../PlayerContext';
import Blacksmith from './Blacksmith';
import Button from './Button';
import Store from './Store';
import Recruiter from './Recruiter';
import PlayerData from './PlayerData';
import Resources from './Resources';
import Dig from './Dig';
import { PLAYER } from '../Engine/Engine';
import WideWrapper from './WideWrapper';
import Changelog from './Modals/Changelog';
import Container from './Container';
import Minimized from './Minimized';
import settingsIcon from '../Engine/img/settings.png';
import keysIcon from '../Engine/img/keys-4.png';
import helpIcon from '../Engine/img/help.png';
import Settings from './Modals/Settings';
import Help from './Modals/Help';
import Unlocks from './Modals/Unlocks';

const GameArea = () => {
	const { playerData, setPlayerData, CHECK_DISABLED, BUILD_BUILDING, BUILDINGS, notify } = useContext(playerContext);
	const { buildings } = playerData;
	const [changelogOpen, setChangelogOpen] = useState(false);
	const [settingsOpen, setSettingsOpen] = useState(false);
	const [helpOpen, setHelpOpen] = useState(false);
	const [unlocksOpen, setUnlocksOpen] = useState(false);

	const buildingCostString = useMemo(
		() => (building) => {
			return (
				BUILDINGS[building]?.cost &&
				Object.keys(BUILDINGS[building].cost).map((resource) => {
					return ` ${resource}: ${BUILDINGS[building].cost[resource]} `;
				})
			);
		},
		[],
	);

	useEffect(() => {}, [playerData]);

	return (
		<Wrapper>
			<Dialog open={changelogOpen}>
				<Changelog setChangelogOpen={setChangelogOpen} />
			</Dialog>
			<Dialog open={settingsOpen}>
				<Settings setSettingsOpen={setSettingsOpen} />
			</Dialog>
			<Dialog open={helpOpen}>
				<Help setHelpOpen={setHelpOpen} />
			</Dialog>
			<Dialog open={unlocksOpen}>
				<Unlocks
					setUnlocksOpen={setUnlocksOpen}
					playerData={playerData}
				/>
			</Dialog>
			<Title>
				<span>Minedown98</span>
				<p
					onClick={() => {
						setChangelogOpen(!changelogOpen);
					}}
				>
					version {PLAYER.version}
				</p>

				<IconWrapper>
					<Icon
						src={keysIcon}
						alt='Open unlocks'
						onClick={() => {
							setUnlocksOpen(!unlocksOpen);
						}}
					/>

					<Icon
						src={settingsIcon}
						alt='Open settings'
						onClick={() => {
							setSettingsOpen(!settingsOpen);
						}}
					/>
				</IconWrapper>
				<WalletDisplay>
					<hr />
					Cash: {playerData.wallet > 99999999999999 ? Number(playerData.wallet).toExponential(2) : Number(playerData.wallet).toLocaleString()}$
					<hr />
				</WalletDisplay>
			</Title>

			<Dig />

			<WideWrapper>
				{playerData && !playerData.minimized['player data'] && <PlayerData />}
				{!playerData.minimized['resources'] && <Resources />}
				{buildings.blacksmith && !playerData.minimized['blacksmith'] && <Blacksmith />}
				{buildings.store && !playerData.minimized['store'] && <Store />}
				{!playerData.minimized['recruiter'] && <Recruiter />}

				{!playerData.minimized['unlocks'] && (
					<Container title='unlocks'>
						{Object.keys(BUILDINGS).map((building) => {
							if (buildings[building]) return null;
							if (BUILDINGS[building].requires ? !buildings[BUILDINGS[building].requires] : false) return null;
							return (
								<Button
									key={building}
									text={`Build a ${building} (${buildingCostString(building)})`}
									disabled={CHECK_DISABLED(playerData, BUILDINGS[building].cost)}
									onClick={() => {
										BUILD_BUILDING(playerData, setPlayerData, building, notify);
									}}
								/>
							);
						})}
					</Container>
				)}
			</WideWrapper>
			<MinimizedWrapper>
				{Object.keys(playerData.minimized).map((minimized) => {
					if (!playerData.minimized[minimized]) return null;
					return (
						<Minimized
							title={minimized}
							playerData={playerData}
							setPlayerData={setPlayerData}
						/>
					);
				})}
			</MinimizedWrapper>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	height: 100%;
	width: 100%;
	overflow-y: auto;
	overflow-x: hidden;
	border: 1px solid black;
	user-select: none;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const MinimizedWrapper = styled.div`
	position: fixed;
	bottom: 0;
	display: flex;
	flex-direction: row;
	width: 100%;
	flex-wrap: wrap-reverse;
	z-index: 9999;
`;

const Title = styled.h1`
	width: 100%;
	font-size: clamp(2.5rem, 1rem + 6vw, 3.5rem);
	font-family: 'Press Start', cursive;
	margin: 1rem 0 0 0;
	text-align: center;
	position: relative;
	color: white;
	p {
		font-size: xx-small;
		text-align: center;
		width: 100%;
		cursor: pointer;
	}
`;

const WalletDisplay = styled.h1`
	color: white;
	padding-top: 2rem;
	width: auto;
	box-sizing: border-box;
	hr {
		max-width: 50%;
	}
`;

const IconWrapper = styled.div`
	top: 0;
	width: 100px;
	margin: 1rem auto 0 auto;
	display: flex;
	justify-content: space-between;
`;

const Icon = styled.img`
	right: 1rem;
	width: 35px;
	cursor: pointer;

	&:hover {
		transform: scale(1.1);
	}
`;

const Dialog = styled.dialog`
	background-color: transparent;
	border: 0;
	z-index: 9999999;
`;

export default GameArea;
