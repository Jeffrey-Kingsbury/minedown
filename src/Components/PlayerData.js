import { useContext, useEffect, useRef, useState } from 'react';
import { playerContext } from '../PlayerContext';
import { CHANGE_DEPTH, PICKAXES, COLOR_PICKER } from '../Engine/Engine';
import Button from './Button';
import Container from './Container';

const PlayerData = () => {
	const selectRef = useRef(null);
	const { playerData, setPlayerData } = useContext(playerContext);
	const { wallet, currentDepth, maxDepth, depthProgress, upgrades } = playerData;
	const pickaxeData = PICKAXES[playerData.pickaxe];
	const [depthArray, setDepthArray] = useState([]);

	useEffect(() => {
		if (!selectRef.current) return;
		selectRef.current.value = currentDepth;
		let tempDepthArray = [];
		for (let x = 1; x <= maxDepth; x++) {
			tempDepthArray.push(x);
		}
		setDepthArray(tempDepthArray);
	}, [playerData]);

	return (
		<>
			<Container title='player data'>
				<p>Current ⛏: {pickaxeData && pickaxeData.name}</p>
				<p>Pickaxe Max Depth: {pickaxeData && pickaxeData.digDepth}</p>
				<hr />
				<p>Max Depth: {maxDepth}</p>

				<hr />
				<p>Number of times you've dug at the max depth: {depthProgress.realDigCount}</p>
				<p>
					Chance of unlocking a new depth:{' '}
					{depthProgress.unlockChance <= 0
						? 0
						: (depthProgress.unlockChance * 1000).toFixed(0) >= 100
						? 90
						: (depthProgress.unlockChance * 1000).toFixed(0)}
					%
				</p>

				<hr />
				<p>Current Depth: {currentDepth}</p>
				<span>
					Resources at current depth:{' '}
					{playerData.diggableResourceData[currentDepth].map((e, i) => {
						//For some reason the name wasn't capitalizing when unlocking, so im brute forcing it here.
						let name = e.charAt(0).toUpperCase() + e.slice(1);
						return (
							<span key={name + 'atDepth' + currentDepth}>
								<p style={{ display: 'inline', color: COLOR_PICKER[e] }}>{name}</p>
								{i !== playerData.diggableResourceData[currentDepth].length - 1 && ', '}
							</span>
						);
					})}
				</span>
				<br />
				<Button
					text='Depth UP'
					onClick={() => {
						CHANGE_DEPTH(playerData, setPlayerData, currentDepth - 1);
					}}
					disabled={currentDepth <= 1}
				/>
				<Button
					text='Depth DOWN'
					onClick={() => {
						CHANGE_DEPTH(playerData, setPlayerData, currentDepth + 1);
					}}
					disabled={currentDepth >= maxDepth}
				/>

				{upgrades.teleport && (
					<>
						<hr />
						<p className='selectTitle'>Teleport to depth</p>
						<select
							value={currentDepth}
							ref={selectRef}
							onChange={() => {
								if (selectRef.current) {
									CHANGE_DEPTH(playerData, setPlayerData, parseInt(selectRef.current.value));
								}
							}}
						>
							{depthArray.map((e) => {
								return (
									<option
										key={e}
										value={e}
									>
										{e}
									</option>
								);
							})}
						</select>
					</>
				)}
			</Container>
		</>
	);
};

export default PlayerData;
