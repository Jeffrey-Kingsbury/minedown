import { useState, createContext, useEffect } from 'react';
import ls from 'localstorage-slim';
import { PLAYER, DIGGING, CHECK_DISABLED, BUILD_BUILDING, PICKAXES, BUILDINGS, AUTO_DIGGING, RESOURCES } from './Engine/Engine.js';
import usePersistedState from './usePersistedState';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useInterval from './use-interval.hook';

export const playerContext = createContext();

export const ContextProvider = ({ children }) => {
	const [loaded, setLoaded] = useState(false);
	const [currentProgress, setCurrentProgress] = useState(0);
	const initialDiggableResources = {};
	//FOR PRODUCTION
	const [playerData, setPlayerData] = useState(usePersistedState(PLAYER, 'MDPData')[0]);
	// const [diggableResourceData, setDiggableResourceData] = useState(usePersistedState(initialDiggableResources, 'MDPResources')[0]);
	//FOR TESTING
	// const [playerData, setPlayerData] = useState(PLAYER);
	// const [diggableResourceData, setDiggableResourceData] = useState(initialDiggableResources);

	const notify = (message = '', type = '') => {
		switch (type) {
			case 'success':
				toast.success(message);
				break;
			case 'error':
				toast.error(message);
				break;
			case 'warning':
				toast.warning(message);
				break;
			case 'info':
				toast.info(message);
				break;
			default:
				toast(message);
				break;
		}
	};

	useInterval(() => {
		if (playerData.miners.qty > 0) {
			AUTO_DIGGING(playerData, playerData.diggableResourceData, setPlayerData, notify);
		}
	}, playerData.auto_interval);

	//INITIAL LOAD
	useEffect(() => {
		const playerDataCopy = { ...playerData };

		//Check if version does NOT exist (alpha save data)
		//Start fresh if it doesn't exist
		if (!playerDataCopy.version || playerDataCopy.version === undefined) {
			setPlayerData(PLAYER);
			return;
		}

		//Make sure the version matches the current version
		playerDataCopy.version = PLAYER.version;

		//Checking for new resources that aren't in the saved data.
		Object.keys(RESOURCES.dig).forEach((resource) => {
			if (!playerDataCopy.items[resource]) {
				playerDataCopy.items[resource] = null;
			}
		});

		//Checking for new craftables that aren't in the saved data.
		Object.keys(RESOURCES.craft).forEach((resource) => {
			if (!playerDataCopy.items[resource]) {
				playerDataCopy.items[resource] = null;
			}
		});

		//Checking for items that are no longer in the game.
		Object.keys(playerDataCopy.items).forEach((resource) => {
			if (!RESOURCES.dig[resource] && !RESOURCES.craft[resource]) {
				delete playerDataCopy.items[resource];
			}
		});

		//Checking if there are any new keys in the PLAYER object that aren't in the saved data.
		Object.keys(PLAYER).forEach((key) => {
			if (!playerDataCopy[key]) {
				playerDataCopy[key] = PLAYER[key];
			}
		});

		//Checking if there are any keys in the saved data that are no longer in the PLAYER object.
		Object.keys(playerDataCopy).forEach((key) => {
			if (PLAYER[key] === undefined) {
				delete playerDataCopy[key];
			}
		});

		const resourceDataCopy = playerDataCopy.diggableResourceData;

		// Fill missing depths in resourceDataCopy
		for (let i = 1; i <= playerData.maxDepth + 1; i++) {
			// If the depth doesn't exist in the resourceDataCopy, create it
			if (!resourceDataCopy[i]) {
				resourceDataCopy[i] = [];
				//Go through each diggable resource and add it to the depth if it's within the depth range AND the appearanceRarity is met
				Object.keys(RESOURCES.dig).forEach((key) => {
					const resource = RESOURCES.dig[key];
					const rand = Math.floor(Math.random() * 100) + 1;

					if (i >= resource.depth && (i <= resource.stopDepth || resource.stopDepth === 0)) {
						if ((rand <= resource.appearanceRarity && !resourceDataCopy[i].includes(key)) || resource.depth === i) {
							resourceDataCopy[i].push(key);
						}
					}
				});
			}
		}

		playerDataCopy.diggableResourceData = resourceDataCopy;

		//Set the new data and load the game
		// ls.set('MDPResources', JSON.stringify(resourceDataCopy), { isJSON: true, encrypt: false });
		// setDiggableResourceData(resourceDataCopy);
		setPlayerData(playerDataCopy);
		setLoaded(true);
	}, []);

	//unlocked a new depth
	useEffect(() => {
		//If the game has not yet loaded, return
		if (!loaded) return;

		//Prep the next depths resources
		const resourceDataCopy = playerData.diggableResourceData;
		const depthPlusOne = playerData.maxDepth + 1;
		//If the depth already exists, return
		if (resourceDataCopy[depthPlusOne]) return;

		//Go through each diggable resource and add it to the depth if it's within the depth range AND the appearanceRarity is met
		Object.keys(RESOURCES.dig).forEach((key) => {
			const resource = RESOURCES.dig[key];
			const rand = Math.floor(Math.random() * 100) + 1;

			if (depthPlusOne >= resource.depth && (depthPlusOne <= resource.stopDepth || resource.stopDepth === 0)) {
				if (rand <= resource.appearanceRarity || depthPlusOne === resource.depth) {
					resourceDataCopy[depthPlusOne] ? resourceDataCopy[depthPlusOne].push(key) : (resourceDataCopy[depthPlusOne] = [key]);
				}
			}
		});

		setPlayerData({ ...playerData, diggableResourceData: resourceDataCopy });

		//Save the new data
		//ls.set('MDPResources', JSON.stringify(resourceDataCopy), { isJSON: true, encrypt: false });
		//setDiggableResourceData(resourceDataCopy);
	}, [playerData.maxDepth]);

	//Save the player data to local storage whenever its updated
	useEffect(() => {
		ls.set('MDPData', JSON.stringify(playerData), { isJSON: true, encrypt: false });
	}, [playerData]);

	return (
		<playerContext.Provider
			value={{
				playerData,
				setPlayerData,
				DIGGING,
				currentProgress,
				setCurrentProgress,
				CHECK_DISABLED,
				BUILD_BUILDING,
				BUILDINGS,
				PICKAXES,
				notify,
			}}
		>
			<>
				{!loaded && (
					<p
						style={{
							width: '100vw',
							height: '100vh',
							textAlign: 'center',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							fontFamily: 'monospace',
							fontSize: '2rem',
							color: 'white',
							background: '#008083',
						}}
					>
						Now Loading...
					</p>
				)}
				{loaded && children}
			</>
			<ToastContainer
				position='top-right'
				autoClose={1000}
				hideProgressBar={true}
				newestOnTop={false}
				closeOnClick
				limit={3}
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='light'
			/>
		</playerContext.Provider>
	);
};

export default ContextProvider;
