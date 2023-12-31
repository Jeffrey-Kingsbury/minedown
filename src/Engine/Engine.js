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
    'blacksmith level 3': { cost: { 'mithril bar': 100, stone: 10000, coal: 5000, 'copper bar': 100 }, requires: 'blacksmith level 2' },
    'blacksmith level 4': { cost: { 'adamantite bar': 100, stone: 25000, coal: 10000, 'copper bar': 500 }, requires: 'blacksmith level 3' },
    'blacksmith level 5': { cost: { diamond: 100, stone: 75000, coal: 50000, 'copper bar': 5000 }, requires: 'blacksmith level 4' },
    'blacksmith level 6': { cost: { 'damned soul': 100000, stone: 7500000, coal: 5000000, 'copper bar': 500000, 'demon heart': 1 }, requires: 'blacksmith level 5' },
    'store': { cost: { stone: 50, 'iron bar': 10, glass: 25 } },
    'recruiter': { cost: { stone: 50, 'steel bar': 10, glass: 50, 'gold bar': 2 } },
};

// This is the resources object. It is used to store all the data about the resources.
//prettier-ignore
const RESOURCES = {
    dig: {
        sand: { name: 'sand', value: 0, depth: 1, stopDepth: 2, rarity: 5, appearanceRarity: 100 },
        clay: { name: 'clay', value: 0, depth: 1, stopDepth: 3, rarity: 15, appearanceRarity: 100 },
        stone: { name: 'stone', value: 0, depth: 2, stopDepth: 0, rarity: 10, appearanceRarity: 100 },
        coal: { name: 'coal', value: 10, depth: 3, stopDepth: 300, rarity: 15, appearanceRarity: 60 },
        iron: { name: 'iron', value: 15, depth: 9, stopDepth: 0, rarity: 15, appearanceRarity: 50 },
        tin: { name: 'tin', value: 10, depth: 12, stopDepth: 0, rarity: 10, appearanceRarity: 10 },
        copper: { name: 'copper', value: 10, depth: 11, stopDepth: 0, rarity: 10, appearanceRarity: 10 },
        gold: { name: 'gold', value: 25, depth: 11, stopDepth: 700, rarity: 40, appearanceRarity: 25 },
        mithril: { name: 'mithril', value: 25, depth: 24, stopDepth: 700, rarity: 40, appearanceRarity: 15 },
        adamantite: { name: 'adamantite', value: 30, depth: 49, stopDepth: 700, rarity: 40, appearanceRarity: 15 },
        diamond: { name: 'diamond', value: 150, depth: 87, stopDepth: 0, rarity: 50, appearanceRarity: 5 },
        'crystal shard': { name: 'crystal shard', value: 400, depth: 150, stopDepth: 0, rarity: 50, appearanceRarity: 2 },
        'damned soul': { name: 'damned soul', value: 0, depth: 450, stopDepth: 0, rarity: 100, appearanceRarity: 25 },
        'demon heart': { name: 'demon heart', value: 0, depth: 666, stopDepth: 0, rarity: 5000, appearanceRarity: 1 },
    },
    craft: {
        glass: { name: 'glass', value: 1, cost: { sand: 1 } },
        brick: { name: 'brick', value: 2, cost: { clay: 1, sand: 1 } },
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
    version: 'ALPHA 0.5',
    wallet: 0,
    pickaxe: 0,
    currentDepth: 1,
    maxDepth: 1,
    digSpeed: 35,
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
    miners: {
        qty: 0,
        gains: 1,
        depth: 1,
        upgrades: {},
    },
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
    const updatedResources = {
        ...playerData.items,
        [gainedResource.name]: playerData.items[gainedResource.name] ? playerData.items[gainedResource.name] + 1 : 1,
    };

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
        depthProgress: updatedDepthProgress,
        totalDigs: playerData.totalDigs + 1,
    });
};

const AUTO_DIGGING = (playerData, diggableResourceData, setPlayerData) => {
    let gains = 1;
    const updatedResources = { ...playerData.items };
    const depth = playerData.maxDepth;
    const minerQty = playerData.miners.qty;
    const minerUpgrades = playerData.miners.upgrades;
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

    for (let x = 0; x < minerQty; x++) {
        const gainedResource = randomResource();
        updatedResources[gainedResource.name] = updatedResources[gainedResource.name]
            ? updatedResources[gainedResource.name] + gains
            : 1;
    }

    setPlayerData({
        ...playerData,
        items: updatedResources,
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
const CRAFT_ITEM = (bar, playerData, setPlayerData, notify) => {
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
        currentItems[bar] = currentItems[bar] ? currentItems[bar] + 1 : 1;
        setPlayerData({ ...playerData, items: currentItems });
    }
};

// Function to change the player's current depth.
const CHANGE_DEPTH = (playerData, setPlayerData, depth) => {
    if (depth < 1 || depth > playerData.maxDepth) return;
    setPlayerData({ ...playerData, currentDepth: depth });
};

//WIP
const HIRE_MINER = (playerData, setPlayerData, price) => {
    setPlayerData({
        ...playerData,
        miners: {
            ...playerData.miners,
            qty: playerData.miners.qty + 1,
        },
        wallet: playerData.wallet - price,
    });
};

//WIP
const UPGRADE_MINER = (currentMiners, resources) => {};

//WIP
const SELL_RESOURCE = (playerData, setPlayerData, resource, qty = 1, notify) => {
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
const CHECK_DISABLED = (playerData, cost) => {
    let disabled = false;
    Object.entries(cost).forEach(([resource, amount]) => {
        if (disabled) return;
        if (!playerData.items[resource] || playerData.items[resource] < amount) {
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
        description: '⛏ Increase your dig speed, allowing you to dig in 2 clicks instead of 3.',
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
        description: '⛏ Increase your dig strength, allowing you to dig in 1 click instead of 2.',
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
    UPGRADE_MINER,
    SELL_RESOURCE,
    CHECK_DISABLED,
    BUILD_BUILDING,
    COLOR_PICKER,
    PLAYER_UPGRADES,
};
