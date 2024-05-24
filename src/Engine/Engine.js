// This is the pickaxes array. It is used to store all the data about the pickaxes.
//prettier-ignore
const PICKAXES = [
    { name: 'Wooden pickaxe', cost: {}, digDepth: 3, reqDepth: 0, blacksmith: 'blacksmith' },
    { name: 'Stone pickaxe', cost: { stone: 10 }, digDepth: 10, reqDepth: 5, blacksmith: 'blacksmith' },
    { name: 'Iron pickaxe', cost: { 'iron bar': 10 }, digDepth: 15, reqDepth: 10, blacksmith: 'blacksmith' },
    { name: 'Steel pickaxe', cost: { 'steel bar': 15 }, digDepth: 25, reqDepth: 15, blacksmith: 'blacksmith level 2' },
    { name: 'Mithril pickaxe', cost: { 'mithril bar': 25 }, digDepth: 50, reqDepth: 25, blacksmith: 'blacksmith level 3' },
    { name: 'Adamantite pickaxe', cost: { 'adamantite bar': 30 }, digDepth: 90, reqDepth: 50, blacksmith: 'blacksmith level 4' },
    { name: 'Diamond pickaxe', cost: { diamond: 50 }, digDepth: 300, reqDepth: 25, blacksmith: 'blacksmith level 5' },
    { name: 'Crystal pickaxe', cost: { 'crystal shard': 100 }, digDepth: 666, reqDepth: 90, blacksmith: 'blacksmith level 5' },
    { name: 'Infernal pickaxe', cost: { 'demon heart': 1, 'damned soul': 10 }, digDepth: 1000, reqDepth: 125, blacksmith: 'blacksmith level 6' },
];

// This is the buildings object. It is used to store all the data about the buildings.
//prettier-ignore
const BUILDINGS = {
    'blacksmith': { cost: { sand: 25, stone: 10, coal: 5 } },
    'blacksmith level 2': { cost: { 'steel bar': 10, stone: 200, coal: 100, 'bronze bar': 25 }, requires: 'blacksmith' },
    'blacksmith level 3': { cost: { 'mithril bar': 50, stone: 10000, coal: 1000 }, requires: 'blacksmith level 2' },
    'blacksmith level 4': { cost: { 'adamantite bar': 100, stone: 25000, coal: 10000, 'copper bar': 500 }, requires: 'blacksmith level 3' },
    'blacksmith level 5': { cost: { diamond: 100, stone: 75000, coal: 50000, 'copper bar': 5000 }, requires: 'blacksmith level 4' },
    'blacksmith level 6': { cost: { 'damned soul': 100000, stone: 7500000, coal: 5000000, 'copper bar': 500000, 'demon heart': 1 }, requires: 'blacksmith level 5' },
    'store': { cost: { stone: 50, brick: 25, glass: 25 } },

};

// This is the resources object. It is used to store all the data about the resources.
//prettier-ignore
const RESOURCES = {
    dig: {
        sand: { name: 'sand', value: 2, depth: 1, stopDepth: 2, rarity: 5, appearanceRarity: 100},
        clay: { name: 'clay', value: 2, depth: 1, stopDepth: 3, rarity: 15, appearanceRarity: 100},
        stone: { name: 'stone', value: 5, depth: 2, stopDepth: 0, rarity: 10, appearanceRarity: 100},
        coal: { name: 'coal', value: 10, depth: 3, stopDepth: 300, rarity: 15, appearanceRarity: 85},
        iron: { name: 'iron', value: 15, depth: 9, stopDepth: 0, rarity: 15, appearanceRarity: 85},
        tin: { name: 'tin', value: 10, depth: 12, stopDepth: 0, rarity: 10, appearanceRarity: 85 },
        copper: { name: 'copper', value: 10, depth: 11, stopDepth: 0, rarity: 10, appearanceRarity: 85 },
        gold: { name: 'gold', value: 25, depth: 11, stopDepth: 700, rarity: 40, appearanceRarity: 85 },
        mithril: { name: 'mithril', value: 150, depth: 22, stopDepth: 60, rarity: 40, appearanceRarity: 80 },
        adamantite: { name: 'adamantite', value: 300, depth: 45, stopDepth: 90, rarity: 40, appearanceRarity: 80 },
        diamond: { name: 'diamond', value: 500, depth: 70, stopDepth: 0, rarity: 50, appearanceRarity: 20 },
        'crystal shard': { name: 'crystal shard', value: 900, depth: 150, stopDepth: 0, rarity: 50, appearanceRarity: 2 },
        'damned soul': { name: 'damned soul', value: 0, depth: 450, stopDepth: 0, rarity: 100, appearanceRarity: 25 },
        'demon heart': { name: 'demon heart', value: 0, depth: 666, stopDepth: 0, rarity: 5000, appearanceRarity: 1 },
    },
    craft: {
        glass: { name: 'glass', value: 10, cost: { sand: 1 } },
        brick: { name: 'brick', value: 20, cost: { clay: 1, sand: 1 } },
        'bronze bar': { name: 'bronze bar', value: 50, cost: { copper: 1, tin: 1 } },
        'copper bar': { name: 'copper bar', value: 50, cost: { copper: 5, coal: 2 } },
        'iron bar': { name: 'iron bar', value: 50, cost: { iron: 2 } },
        'steel bar': { name: 'steel bar', value: 100, cost: { iron: 5, coal: 2 } },
        'gold bar': { name: 'gold bar', value: 250, cost: { gold: 5, coal: 2 } },
        'mithril bar': { name: 'mithril bar', value: 500, cost: { mithril: 5, coal: 2 } },
        'adamantite bar': { name: 'adamantite bar', value: 500, cost: { adamantite: 5, coal: 2 } },
    },
};

// This is the player data object. It is used to store all the data about the player.
const PLAYER = {
	version: 'ALPHA 0.8',
	wallet: 0,
	pickaxe: 0,
	currentDepth: 1,
	maxDepth: 1,
	digSpeed: 35,
	auto_interval: 1000,
	totalDigs: 0,
	inHell: false,
	inPurgatory: false,
	inHeaven: false,
	diggableResourceData: {},
	depthProgress: {
		realDigCount: 0,
		digCount: 0,
		unlockChance: 0,
	},
	hellItems: {},
	purgatoryItems: {},
	heavenItems: {},
	buffs: {},
	nerfs: {},
	items: {},
	buildings: {},
	upgrades: {},
	minimized: {},
	miners: {},
};

//Populate the player data object with the resources and craftables.
Object.keys(RESOURCES.dig).forEach((resource) => {
	if (!PLAYER.items[resource]) {
		PLAYER.items[resource] = null;
	}
});

Object.keys(RESOURCES.craft).forEach((resource) => {
	if (!PLAYER.items[resource]) {
		PLAYER.items[resource] = null;
	}
});

const DIGGING = (depth, playerData, diggableResourceData, setPlayerData, notify) => {
	const diggablesAtDepth = {};
	diggableResourceData[depth].forEach((resource) => {
		diggablesAtDepth[resource] = RESOURCES.dig[resource];
	});

	const potentialResources = Object.values(diggablesAtDepth).map((resource) => ({
		...resource,
		effectiveness: (1 / resource.rarity) * Math.log(depth / resource.depth + 1),
	}));

	// Calculate the total effectiveness of all potential resources.
	const totalEffectiveness = potentialResources.reduce((sum, resource) => sum + resource.effectiveness, 0);

	// Function to pick a resource randomly, with weighting based on their effectiveness.
	const randomResource = () => {
		const randomNum = Math.random() * totalEffectiveness;
		let currentEffectiveness = 0;

		for (let resource of potentialResources) {
			currentEffectiveness += resource.effectiveness;
			if (randomNum < currentEffectiveness) {
				return resource;
			}
		}
	};

	const gainedResource = randomResource();

	// Update resources count
	let gainNum = 1;
	if (playerData.upgrades['speed3']) {
		gainNum *= 2;
	}

	if (playerData.upgrades['speed4']) {
		gainNum *= 2;
	}

	if (playerData.upgrades['speed5']) {
		gainNum *= 5;
	}

	if (playerData.upgrades['speed6']) {
		gainNum = Math.pow(gainNum, 3);
	}

	if (playerData.upgrades['speed7']) {
		gainNum = Math.pow(gainNum, 3);
	}

	const updatedResources = {
		...playerData.items,
		[gainedResource.name]: playerData.items[gainedResource.name] ? playerData.items[gainedResource.name] + gainNum : gainNum,
	};
	const updatedWallet = parseInt(playerData.wallet + (gainedResource.value * gainNum) / 2);

	let updatedDepthProgress = playerData.depthProgress;

	// Only calculate unlock chance if at max depth and current pickaxe allows for further depth.
	if (playerData.currentDepth === playerData.maxDepth) {
		let digcount = playerData.depthProgress.digCount;
		let realDigCount = playerData.depthProgress.realDigCount + 1;
		let unlockChance = (digcount - 10) / (playerData.currentDepth * 100);
		if (PICKAXES[playerData.pickaxe].digDepth > playerData.currentDepth) {
			digcount++;
			if (Math.random() < unlockChance) {
				digcount = 0;
				unlockChance = 0;
				realDigCount = 0;
				notify('New depth unlocked', 'success');
				updatedDepthProgress = { digCount: digcount, unlockChance: unlockChance, realDigCount: realDigCount };
				setPlayerData({
					...playerData,
					items: updatedResources,
					wallet: updatedWallet,
					depthProgress: updatedDepthProgress,
					maxDepth: playerData.maxDepth + 1,
					currentDepth: playerData.currentDepth + 1,
					totalDigs: playerData.totalDigs + 1,
				});
				return;
			}
		}

		// Update depth progress
		updatedDepthProgress = {
			...playerData.depthProgress,
			digCount: digcount,
			realDigCount: realDigCount,
			unlockChance: unlockChance,
		};
	}

	// Update player's resources and depthProgress
	setPlayerData({
		...playerData,
		items: updatedResources,
		wallet: updatedWallet,
		depthProgress: updatedDepthProgress,
		totalDigs: playerData.totalDigs + 1,
	});
};

const AUTO_DIGGING = (playerData, diggableResourceData, setPlayerData, notify) => {
	const updatedResources = { ...playerData.items };
	const depth = playerData.currentDepth;
	const minerQty = playerData.miners.miner;
	const excavatorQty = playerData.miners.excavator;
	const earthmoverQty = playerData.miners.earthmover;
	const diggablesAtDepth = {};
	diggableResourceData[depth].forEach((resource) => {
		diggablesAtDepth[resource] = RESOURCES.dig[resource];
	});

	const potentialResources = Object.values(diggablesAtDepth).map((resource) => ({
		...resource,
		effectiveness: (1 / resource.rarity) * Math.log(depth / resource.depth + 1),
	}));

	// Calculate the total effectiveness of all potential resources.
	const totalEffectiveness = potentialResources.reduce((sum, resource) => sum + resource.effectiveness, 0);

	// Function to pick a resource randomly, with weighting based on their effectiveness.
	const randomResource = () => {
		const randomNum = Math.random() * totalEffectiveness;
		let currentEffectiveness = 0;

		for (let resource of potentialResources) {
			currentEffectiveness += resource.effectiveness;
			if (randomNum < currentEffectiveness) {
				return resource;
			}
		}
	};

	let gainedMoney = 0;
	for (let x = 0; x < minerQty; x++) {
		const gainedResource = randomResource();
		updatedResources[gainedResource.name] = updatedResources[gainedResource.name] ? updatedResources[gainedResource.name] + 1 : 1;
		gainedMoney += parseInt(gainedResource.value / 4);
	}

	for (let x = 0; x < excavatorQty; x++) {
		const gainedResource = randomResource();
		updatedResources[gainedResource.name] = updatedResources[gainedResource.name] ? updatedResources[gainedResource.name] + 100 : 100;
		gainedMoney += parseInt((gainedResource.value / 4) * 100);
	}

	for (let x = 0; x < earthmoverQty; x++) {
		const gainedResource = randomResource();
		updatedResources[gainedResource.name] = updatedResources[gainedResource.name] ? updatedResources[gainedResource.name] + 1000 : 1000;
		gainedMoney += parseInt((gainedResource.value / 4) * 1000);
	}

	const updatedWallet = playerData.wallet + gainedMoney;
	let updatedDepthProgress = playerData.depthProgress;

	if (playerData.upgrades.autodepth) {
		let digcount = playerData.depthProgress.digCount;
		let realDigCount = playerData.depthProgress.realDigCount + 1;
		let unlockChance = (digcount - 10) / (playerData.currentDepth * 100);
		if (playerData.currentDepth === playerData.maxDepth && PICKAXES[playerData.pickaxe].digDepth > playerData.currentDepth) {
			digcount++;
			if (Math.random() < unlockChance) {
				digcount = 0;
				unlockChance = 0;
				realDigCount = 0;
				notify('New depth unlocked', 'success');
				updatedDepthProgress = { digCount: digcount, unlockChance: unlockChance, realDigCount: realDigCount };
				setPlayerData({
					...playerData,
					items: updatedResources,
					wallet: updatedWallet,
					depthProgress: updatedDepthProgress,
					maxDepth: playerData.maxDepth + 1,
					currentDepth: playerData.currentDepth + 1,
					totalDigs: playerData.totalDigs + 1,
				});
				return;
			}

			updatedDepthProgress = {
				...playerData.depthProgress,
				digCount: digcount,
				realDigCount: realDigCount,
				unlockChance: unlockChance,
			};
		}
	}
	setPlayerData({
		...playerData,
		items: updatedResources,
		wallet: updatedWallet,
		depthProgress: updatedDepthProgress,
	});
};

const UPGRADE_PICKAXE = (setPlayerData, playerData, notify) => {
	// Get next pickaxe in the list
	const nextPickaxe = PICKAXES[playerData.pickaxe + 1];
	const cost = nextPickaxe.cost;
	const currentResources = playerData.items;
	let resourceCheck = true;

	// Check if player has enough resources for the upgrade
	Object.entries(cost).forEach(([resource, amount]) => {
		if (currentResources[resource] < amount || !currentResources[resource]) {
			notify(`You don't have enough ${resource} to upgrade your pickaxe.`, 'error');
			if (resourceCheck) {
				resourceCheck = false;
			}
			return;
		}
		currentResources[resource] -= amount;
	});

	// If player has enough resources, upgrade pickaxe and update resources
	if (resourceCheck) {
		setPlayerData({ ...playerData, pickaxe: playerData.pickaxe + 1, items: currentResources });
	}
};

// Function to craft an item
const CRAFT_ITEM = (bar, playerData, setPlayerData, notify, qty = 1) => {
	const cost = RESOURCES.craft[bar].cost;
	const currentItems = playerData.items;
	let resourceCheck = true;

	Object.entries(cost).forEach(([resource, amount]) => {
		if (currentItems[resource] < amount || !currentItems[resource]) {
			notify(`You don't have enough ${resource} to craft ${bar}.`, 'error');
			if (resourceCheck) {
				resourceCheck = false;
			}
			return;
		}
		currentItems[resource] -= amount;
	});

	if (resourceCheck) {
		currentItems[bar] = currentItems[bar] ? currentItems[bar] + qty : qty;
		setPlayerData({ ...playerData, items: currentItems });
	}
};

// Function to change the player's current depth.
const CHANGE_DEPTH = (playerData, setPlayerData, depth) => {
	if (depth < 1 || depth > playerData.maxDepth) return;
	setPlayerData({ ...playerData, currentDepth: depth });
};

const HIRE_MINER = (playerData, setPlayerData, price, qty, type) => {
	setPlayerData({
		...playerData,
		miners: {
			...playerData.miners,
			[type]: playerData.miners[type] ? playerData.miners[type] + qty : qty,
		},
		wallet: playerData.wallet - price,
	});
};

const SELL_RESOURCE = (playerData, setPlayerData, resource, qty, notify) => {
	if (!RESOURCES.dig[resource] && !RESOURCES.craft[resource]) {
		notify(`Error: Resource '${resource}' does not exist.`, 'error');
		return;
	}
	const type = RESOURCES.dig[resource] ? 'dig' : 'craft';
	const value = RESOURCES[type][resource].value;
	const currentResources = playerData.items;
	let currentWallet = playerData.wallet;

	if (currentResources[resource] - qty < 0) {
		notify(`You don't have enough ${resource} to sell.`, 'error');
		return;
	}
	if (currentResources[resource] < qty) {
		currentWallet += currentResources[resource] * value;
		notify(`Sold ${currentResources[resource]}x ${resource} for ${currentResources[resource] * value}$`, 'success');
		currentResources[resource] = 0;
	} else {
		currentWallet += qty * value;
		currentResources[resource] -= qty;
	}

	setPlayerData({
		...playerData,
		wallet: currentWallet,
		items: currentResources,
	});
};

// Function to check if the player has enough resources for a specific cost. Disable button if true.
const CHECK_DISABLED = (playerData, cost, qty = 1) => {
	let disabled = false;
	Object.entries(cost).forEach(([resource, amount]) => {
		if (disabled) return;
		if (!playerData.items[resource] || playerData.items[resource] < amount * qty) {
			disabled = true;
			return;
		}
	});
	return disabled;
};

const BUILD_BUILDING = (playerData, setPlayerData, building, notify) => {
	const cost = BUILDINGS[building].cost;
	const currentItems = playerData.items;
	const currentBuildings = playerData.buildings;
	let resourceCheck = true;

	Object.entries(cost).forEach(([resource, amount]) => {
		if (currentItems[resource]) {
			if (currentItems[resource] - amount < 0) {
				notify(`You don't have enough ${resource} to build ${building}.`, 'error');
				resourceCheck = false;
			} else {
				currentItems[resource] -= amount;
			}
		} else {
			notify(`You don't have enough ${resource} to build ${building}.`, 'error');
			resourceCheck = false;
		}
	});

	if (resourceCheck) {
		currentBuildings[building] = true;
		notify(`You built a ${building}.`, 'success');
		setPlayerData({
			...playerData,
			buildings: currentBuildings,
			items: currentItems,
		});
		return;
	}
};

const COLOR_PICKER = {
	glass: '#d1fff2',
	brick: '#a30000',
	sand: '#948801',
	clay: '#947332',
	stone: '#707070',
	coal: 'black',
	'iron bar': '#404040',
	iron: '#404040',
	'steel bar': '#f0f0f0',
	'bronze bar': '#a67d3d',
	'gold bar': '#b59b33',
	gold: '#b59b33',
	diamond: '#609bd1',
	tin: 'white',
	'copper bar': '#bf5306',
	copper: '#bf5306',
	'mithril bar': '#00396e',
	mithril: '#00396e',
	'adamantite bar': '#0e5227',
	adamantite: '#0e5227',
	'crystal shard': '#077858',
	'damned soul': '#a30000',
	'demon heart': '#520d0d',
};

const PLAYER_UPGRADES = {
	speed1: {
		name: 'Speed up',
		description: '⛏️ Increase your dig speed, allowing you to dig in 2 clicks instead of 3.',
		priceString: '1000$',
		cost: { wallet: 1000 },
		isDisabled: (playerData, upgrade) => {
			let check = false;
			if (PLAYER_UPGRADES[upgrade].cost.wallet > playerData.wallet) {
				check = true;
			}

			if (PLAYER_UPGRADES[upgrade].cost.resource && check === false) {
				Object.keys(PLAYER_UPGRADES[upgrade].cost.resource).forEach((resource) => {
					if (check) return;
					if (playerData.items[resource] < PLAYER_UPGRADES[upgrade].cost.resource[resource]) {
						check = true;
					}
				});
			}
			return check;
		},
		unlockRequirement: (playerData) => {
			if (playerData.totalDigs >= 0) return true;
			return false;
		},
		upgradeFunction: (playerData, setPlayerData, upgrade, notify) => {
			if (playerData.digSpeed >= 51) return;
			const cost = PLAYER_UPGRADES[upgrade].cost;
			const currentItems = { ...playerData.items };
			let wallet = playerData.wallet;
			let check = false;

			if (cost.wallet > wallet) return;
			if (PLAYER_UPGRADES[upgrade].cost.resource && check === false) {
				Object.keys(PLAYER_UPGRADES[upgrade].cost.resource).forEach((resource) => {
					if (check) return;
					if (currentItems[resource] < PLAYER_UPGRADES[upgrade].cost.resource[resource]) {
						check = true;
					}
					currentItems[resource] -= PLAYER_UPGRADES[upgrade].cost.resource[resource];
				});
			}
			if (check) return;
			wallet -= cost.wallet;
			notify('Gotta go fast! 🏃‍♂️', 'success');
			setPlayerData({
				...playerData,
				digSpeed: 51,
				upgrades: { ...playerData.upgrades, speed1: true },
				wallet: wallet,
				items: currentItems,
			});
		},
	},
	speed2: {
		name: 'Strength up',
		description: '⛏️ Increase your dig strength, allowing you to dig in 1 click instead of 2.',
		priceString: '10,000$',
		cost: { wallet: 10000 },
		isDisabled: (playerData, upgrade) => {
			let check = false;
			if (PLAYER_UPGRADES[upgrade].cost.wallet > playerData.wallet) {
				check = true;
			}

			if (PLAYER_UPGRADES[upgrade].cost.resource && check === false) {
				Object.keys(PLAYER_UPGRADES[upgrade].cost.resource).forEach((resource) => {
					if (check) return;
					if (playerData.items[resource] < PLAYER_UPGRADES[upgrade].cost.resource[resource]) {
						check = true;
					}
				});
			}
			return check;
		},
		unlockRequirement: (playerData) => {
			if (playerData.totalDigs >= 0 && playerData.upgrades.speed1) return true;
			return false;
		},
		upgradeFunction: (playerData, setPlayerData, upgrade, notify) => {
			if (playerData.digSpeed >= 101) return;
			const cost = PLAYER_UPGRADES[upgrade].cost;
			const currentItems = { ...playerData.items };
			let wallet = playerData.wallet;
			let check = false;

			if (cost.wallet > wallet) return;
			if (PLAYER_UPGRADES[upgrade].cost.resource && check === false) {
				Object.keys(PLAYER_UPGRADES[upgrade].cost.resource).forEach((resource) => {
					if (check) return;
					if (currentItems[resource] < PLAYER_UPGRADES[upgrade].cost.resource[resource]) {
						check = true;
					}
					currentItems[resource] -= PLAYER_UPGRADES[upgrade].cost.resource[resource];
				});
			}
			if (check) return;
			wallet -= cost.wallet;
			notify('Strong. Like bull. 💪', 'success');
			setPlayerData({
				...playerData,
				digSpeed: 101,
				upgrades: { ...playerData.upgrades, speed2: true },
				wallet: wallet,
				items: currentItems,
			});
		},
	},
	speed3: {
		name: 'Double up',
		description: '⛏️ Double the amount of resources you gain from manually digging',
		priceString: '100,000$',
		cost: { wallet: 100000 },
		isDisabled: (playerData, upgrade) => {
			let check = false;
			if (PLAYER_UPGRADES[upgrade].cost.wallet > playerData.wallet) {
				check = true;
			}

			if (PLAYER_UPGRADES[upgrade].cost.resource && check === false) {
				Object.keys(PLAYER_UPGRADES[upgrade].cost.resource).forEach((resource) => {
					if (check) return;
					if (playerData.items[resource] < PLAYER_UPGRADES[upgrade].cost.resource[resource]) {
						check = true;
					}
				});
			}
			return check;
		},
		unlockRequirement: (playerData) => {
			if (playerData.totalDigs >= 0 && playerData.upgrades.speed2) return true;
			return false;
		},
		upgradeFunction: (playerData, setPlayerData, upgrade, notify) => {
			const cost = PLAYER_UPGRADES[upgrade].cost;
			const currentItems = { ...playerData.items };
			let wallet = playerData.wallet;
			let check = false;

			if (cost.wallet > wallet) return;
			if (PLAYER_UPGRADES[upgrade].cost.resource && check === false) {
				Object.keys(PLAYER_UPGRADES[upgrade].cost.resource).forEach((resource) => {
					if (check) return;
					if (currentItems[resource] < PLAYER_UPGRADES[upgrade].cost.resource[resource]) {
						check = true;
					}
					currentItems[resource] -= PLAYER_UPGRADES[upgrade].cost.resource[resource];
				});
			}
			if (check) return;
			wallet -= cost.wallet;
			notify("I'll have a Double Double ☕", 'success');
			setPlayerData({
				...playerData,
				upgrades: { ...playerData.upgrades, speed3: true },
				wallet: wallet,
				items: currentItems,
			});
		},
	},
	speed4: {
		name: 'Double up again',
		description: '⛏️ Double the amount of resources you gain from manually digging again',
		priceString: '200,000$',
		cost: { wallet: 200000 },
		isDisabled: (playerData, upgrade) => {
			let check = false;
			if (PLAYER_UPGRADES[upgrade].cost.wallet > playerData.wallet) {
				check = true;
			}

			if (PLAYER_UPGRADES[upgrade].cost.resource && check === false) {
				Object.keys(PLAYER_UPGRADES[upgrade].cost.resource).forEach((resource) => {
					if (check) return;
					if (playerData.items[resource] < PLAYER_UPGRADES[upgrade].cost.resource[resource]) {
						check = true;
					}
				});
			}
			return check;
		},
		unlockRequirement: (playerData) => {
			if (playerData.totalDigs >= 0 && playerData.upgrades.speed3) return true;
			return false;
		},
		upgradeFunction: (playerData, setPlayerData, upgrade, notify) => {
			const cost = PLAYER_UPGRADES[upgrade].cost;
			const currentItems = { ...playerData.items };
			let wallet = playerData.wallet;
			let check = false;

			if (cost.wallet > wallet) return;
			if (PLAYER_UPGRADES[upgrade].cost.resource && check === false) {
				Object.keys(PLAYER_UPGRADES[upgrade].cost.resource).forEach((resource) => {
					if (check) return;
					if (currentItems[resource] < PLAYER_UPGRADES[upgrade].cost.resource[resource]) {
						check = true;
					}
					currentItems[resource] -= PLAYER_UPGRADES[upgrade].cost.resource[resource];
				});
			}
			if (check) return;
			wallet -= cost.wallet;
			notify("I'll have another Double Double ☕", 'success');
			setPlayerData({
				...playerData,
				upgrades: { ...playerData.upgrades, speed4: true },
				wallet: wallet,
				items: currentItems,
			});
		},
	},
	speed5: {
		name: 'multiply it',
		description: '⛏️ multiply the amount of resources you gain from manually digging by 5',
		priceString: '500,000$',
		cost: { wallet: 500000 },
		isDisabled: (playerData, upgrade) => {
			let check = false;
			if (PLAYER_UPGRADES[upgrade].cost.wallet > playerData.wallet) {
				check = true;
			}

			if (PLAYER_UPGRADES[upgrade].cost.resource && check === false) {
				Object.keys(PLAYER_UPGRADES[upgrade].cost.resource).forEach((resource) => {
					if (check) return;
					if (playerData.items[resource] < PLAYER_UPGRADES[upgrade].cost.resource[resource]) {
						check = true;
					}
				});
			}
			return check;
		},
		unlockRequirement: (playerData) => {
			if (playerData.totalDigs >= 0 && playerData.upgrades.speed4) return true;
			return false;
		},
		upgradeFunction: (playerData, setPlayerData, upgrade, notify) => {
			const cost = PLAYER_UPGRADES[upgrade].cost;
			const currentItems = { ...playerData.items };
			let wallet = playerData.wallet;
			let check = false;

			if (cost.wallet > wallet) return;
			if (PLAYER_UPGRADES[upgrade].cost.resource && check === false) {
				Object.keys(PLAYER_UPGRADES[upgrade].cost.resource).forEach((resource) => {
					if (check) return;
					if (currentItems[resource] < PLAYER_UPGRADES[upgrade].cost.resource[resource]) {
						check = true;
					}
					currentItems[resource] -= PLAYER_UPGRADES[upgrade].cost.resource[resource];
				});
			}
			if (check) return;
			wallet -= cost.wallet;
			notify('Lets goooo', 'success');
			setPlayerData({
				...playerData,
				upgrades: { ...playerData.upgrades, speed5: true },
				wallet: wallet,
				items: currentItems,
			});
		},
	},
	speed6: {
		name: 'POWer up',
		description: '⛏️ get ^3 amount of resources you gain from manually digging',
		priceString: '1,000,000$',
		cost: { wallet: 1000000 },
		isDisabled: (playerData, upgrade) => {
			let check = false;
			if (PLAYER_UPGRADES[upgrade].cost.wallet > playerData.wallet) {
				check = true;
			}

			if (PLAYER_UPGRADES[upgrade].cost.resource && check === false) {
				Object.keys(PLAYER_UPGRADES[upgrade].cost.resource).forEach((resource) => {
					if (check) return;
					if (playerData.items[resource] < PLAYER_UPGRADES[upgrade].cost.resource[resource]) {
						check = true;
					}
				});
			}
			return check;
		},
		unlockRequirement: (playerData) => {
			if (playerData.totalDigs >= 0 && playerData.upgrades.speed5) return true;
			return false;
		},
		upgradeFunction: (playerData, setPlayerData, upgrade, notify) => {
			const cost = PLAYER_UPGRADES[upgrade].cost;
			const currentItems = { ...playerData.items };
			let wallet = playerData.wallet;
			let check = false;

			if (cost.wallet > wallet) return;
			if (PLAYER_UPGRADES[upgrade].cost.resource && check === false) {
				Object.keys(PLAYER_UPGRADES[upgrade].cost.resource).forEach((resource) => {
					if (check) return;
					if (currentItems[resource] < PLAYER_UPGRADES[upgrade].cost.resource[resource]) {
						check = true;
					}
					currentItems[resource] -= PLAYER_UPGRADES[upgrade].cost.resource[resource];
				});
			}
			if (check) return;
			wallet -= cost.wallet;
			notify("Now you're playing with POWer", 'success');
			setPlayerData({
				...playerData,
				upgrades: { ...playerData.upgrades, speed6: true },
				wallet: wallet,
				items: currentItems,
			});
		},
	},
	speed7: {
		name: 'MORE',
		description: '⛏️ get an additional ^3 amount of resource gain from manually digging',
		priceString: '100,000,000$',
		cost: { wallet: 100000000 },
		isDisabled: (playerData, upgrade) => {
			let check = false;
			if (PLAYER_UPGRADES[upgrade].cost.wallet > playerData.wallet) {
				check = true;
			}

			if (PLAYER_UPGRADES[upgrade].cost.resource && check === false) {
				Object.keys(PLAYER_UPGRADES[upgrade].cost.resource).forEach((resource) => {
					if (check) return;
					if (playerData.items[resource] < PLAYER_UPGRADES[upgrade].cost.resource[resource]) {
						check = true;
					}
				});
			}
			return check;
		},
		unlockRequirement: (playerData) => {
			if (playerData.totalDigs >= 0 && playerData.upgrades.speed6) return true;
			return false;
		},
		upgradeFunction: (playerData, setPlayerData, upgrade, notify) => {
			const cost = PLAYER_UPGRADES[upgrade].cost;
			const currentItems = { ...playerData.items };
			let wallet = playerData.wallet;
			let check = false;

			if (cost.wallet > wallet) return;
			if (PLAYER_UPGRADES[upgrade].cost.resource && check === false) {
				Object.keys(PLAYER_UPGRADES[upgrade].cost.resource).forEach((resource) => {
					if (check) return;
					if (currentItems[resource] < PLAYER_UPGRADES[upgrade].cost.resource[resource]) {
						check = true;
					}
					currentItems[resource] -= PLAYER_UPGRADES[upgrade].cost.resource[resource];
				});
			}
			if (check) return;
			wallet -= cost.wallet;
			notify('MORE', 'success');
			setPlayerData({
				...playerData,
				upgrades: { ...playerData.upgrades, speed7: true },
				wallet: wallet,
				items: currentItems,
			});
		},
	},
	autodepth: {
		name: 'auto depth',
		description: '🤖 Enables the miners to unlock new depths.',
		priceString: '10,000$',
		cost: { wallet: 10000 },
		isDisabled: (playerData, upgrade) => {
			let check = false;
			if (PLAYER_UPGRADES[upgrade].cost.wallet > playerData.wallet) {
				check = true;
			}

			if (PLAYER_UPGRADES[upgrade].cost.resource && check === false) {
				Object.keys(PLAYER_UPGRADES[upgrade].cost.resource).forEach((resource) => {
					if (check) return;
					if (playerData.items[resource] < PLAYER_UPGRADES[upgrade].cost.resource[resource]) {
						check = true;
					}
				});
			}
			return check;
		},
		unlockRequirement: (playerData) => {
			if (playerData.totalDigs >= 0) return true;
			return false;
		},
		upgradeFunction: (playerData, setPlayerData, upgrade, notify) => {
			const cost = PLAYER_UPGRADES[upgrade].cost;
			const currentItems = { ...playerData.items };
			let wallet = playerData.wallet;
			let check = false;

			if (cost.wallet > wallet) return;
			if (PLAYER_UPGRADES[upgrade].cost.resource && check === false) {
				Object.keys(PLAYER_UPGRADES[upgrade].cost.resource).forEach((resource) => {
					if (check) return;
					if (currentItems[resource] < PLAYER_UPGRADES[upgrade].cost.resource[resource]) {
						check = true;
					}
					currentItems[resource] -= PLAYER_UPGRADES[upgrade].cost.resource[resource];
				});
			}
			if (check) return;
			wallet -= cost.wallet;
			notify('Diggy Diggy Hole', 'success');
			setPlayerData({
				...playerData,
				upgrades: { ...playerData.upgrades, autodepth: true },
				wallet: wallet,
				items: currentItems,
			});
		},
	},
};

export {
	PLAYER,
	PICKAXES,
	BUILDINGS,
	RESOURCES,
	DIGGING,
	AUTO_DIGGING,
	UPGRADE_PICKAXE,
	CRAFT_ITEM,
	CHANGE_DEPTH,
	HIRE_MINER,
	SELL_RESOURCE,
	CHECK_DISABLED,
	BUILD_BUILDING,
	COLOR_PICKER,
	PLAYER_UPGRADES,
};
