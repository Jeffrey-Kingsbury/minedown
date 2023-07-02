// This is the pickaxes array. It is used to store all the data about the pickaxes.
const PICKAXES = [
    { name: 'Wooden pickaxe', cost: {}, digDepth: 3, reqDepth: 0 },
    { name: 'Stone pickaxe', cost: { stone: 10 }, digDepth: 10, reqDepth: 5 },
    { name: 'Iron pickaxe', cost: { 'iron bar': 10 }, digDepth: 15, reqDepth: 10 },
    { name: 'Steel pickaxe', cost: { 'steel bar': 5}, digDepth: 20, reqDepth: 15 },
    { name: 'Diamond pickaxe', cost: {}, digDepth: 30, reqDepth: 25 },
    { name: 'Mithril pickaxe', cost: {}, digDepth: 50, reqDepth: 30 },
    { name: 'Adamantite pickaxe', cost: {}, digDepth: 90, reqDepth: 50 },
    { name: 'Crystal pickaxe', cost: {}, digDepth: 125, reqDepth: 90 },
    { name: 'Infernal pickaxe', cost: {}, digDepth: 300, reqDepth: 125 },
];

// This is the buildings object. It is used to store all the data about the buildings.
const BUILDINGS = {
    blacksmith: { cost: { sand: 25, stone: 10, coal: 5 } },
    store: { cost: { stone: 50, 'iron bar': 10, glass: 25 } },
    recruiter: { cost: { stone: 50, 'steel bar': 10, glass: 50, 'gold bar': 10 } },
};

// This is the resources object. It is used to store all the data about the resources.
const RESOURCES = {
    dig: {
        sand: { name: 'sand', value: 1, depth: 1, stopDepth: 2, rarity: 5 },
        clay: { name: 'clay', value: 1, depth: 1, stopDepth: 2, rarity: 5 },
        stone: { name: 'stone', value: 10, depth: 2, stopDepth: 0, rarity: 10 },
        coal: { name: 'coal', value: 200, depth: 3, stopDepth: 300, rarity: 15 },
        tin: { name: 'tin', value: 10, depth: 5, stopDepth: 0, rarity: 10 },
        copper: { name: 'copper', value: 10, depth: 5, stopDepth: 0, rarity: 10 },
        iron: { name: 'iron', value: 500, depth: 9, stopDepth: 0, rarity: 20 },
        gold: { name: 'gold', value: 5000, depth: 11, stopDepth: 700, rarity: 40 },
        mithril: { name: 'mithril', value: 5000, depth: 15, stopDepth: 700, rarity: 40 },
        adamantite: { name: 'adamantite', value: 5000, depth: 25, stopDepth: 700, rarity: 40 },
        diamond: { name: 'diamond', value: 100000, depth: 30, stopDepth: 0, rarity: 50 },
        
    },
    craft: {
        glass: { name: 'glass', value: 10, cost: { sand: 1 } },
        brick: { name: 'brick', value: 10, cost: { clay: 1, sand: 1 } },
        'bronze bar': { name: 'bronze bar', value: 100, cost: { copper: 1, tin: 1 } },
        'copper bar': { name: 'copper bar', value: 200, cost: { copper: 5, coal: 2 } },
        'iron bar': { name: 'iron bar', value: 500, cost: { iron: 2 } },
        'steel bar': { name: 'steel bar', value: 1000, cost: { iron: 5, coal: 2 } },
        'gold bar': { name: 'gold bar', value: 10000, cost: { gold: 1, coal: 2 } },
    },
};

// This is the player data object. It is used to store all the data about the player.
const PLAYER = {
    wallet: 10000000,
    pickaxe: 0,
    currentDepth: 1,
    maxDepth: 1,
    digSpeed: 34,
    totalDigs: 0,
    depthProgress: {
        realDigCount: 0,
        digCount: 0,
        unlockChance: 0,
    },
    buffs: {},
    nerfs: {},
    resources: {},
    craftables: {},
    buildings: {},
    miners: {
        qty: 0,
        gains: 1,
        depth: 1,
        upgrades: {},
    },
};

//Populate the player data object with the resources and craftables.
Object.keys(RESOURCES.dig).forEach((resource) => {
    if(PLAYER.resources[resource]) return;
    PLAYER.resources[resource] = null;
});

Object.keys(RESOURCES.craft).forEach((resource) => {
    if(PLAYER.craftables[resource]) return;
    PLAYER.craftables[resource] = null;
});

const DIGGING = (depth, playerData, setPlayerData, notify) => {
    // Filter and map resources into potential resources array.
    const potentialResources = Object.values(RESOURCES.dig)
        .filter((resource) => resource.depth <= depth && (resource.stopDepth >= depth || resource.stopDepth === 0))
        .map((resource) => ({
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
        ...playerData.resources,
        [gainedResource.name]: playerData.resources[gainedResource.name]
            ? playerData.resources[gainedResource.name] + 1
            : 1,
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
                    resources: updatedResources,
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
        resources: updatedResources,
        depthProgress: updatedDepthProgress,
    });
};

const AUTO_DIGGING = (playerData, setPlayerData) => {
    let gains = 1;
    const updatedResources = { ...playerData.resources };
    const depth = playerData.maxDepth;
    const minerQty = playerData.miners.qty;
    const minerUpgrades = playerData.miners.upgrades;
    const potentialResources = Object.values(RESOURCES.dig)
        .filter((resource) => resource.depth <= depth && (resource.stopDepth >= depth || resource.stopDepth === 0))
        .map((resource) => ({
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
        resources: updatedResources,
    });
};

const UPGRADE_PICKAXE = (setPlayerData, playerData, notify) => {
    // Get next pickaxe in the list
    const nextPickaxe = PICKAXES[playerData.pickaxe + 1];
    const cost = nextPickaxe.cost;
    const currentResources = playerData.resources;
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
        setPlayerData({ ...playerData, pickaxe: playerData.pickaxe + 1, resources: currentResources });
    }
};

// Function to craft an item
const CRAFT_ITEM = (bar, playerData, setPlayerData, notify) => {
    const cost = RESOURCES.craft[bar].cost;
    const currentResources = playerData.resources;
    const currentCraftables = playerData.craftables;
    let resourceCheck = true;

    Object.entries(cost).forEach(([resource, amount]) => {
        if (currentResources[resource] < amount || !currentResources[resource]) {
            notify(`You don't have enough ${resource} to craft ${bar}.`, 'error');
            if (resourceCheck) {
                resourceCheck = false;
            }
            return;
        }
        currentResources[resource] -= amount;
    });

    if (resourceCheck) {
        currentCraftables[bar] = currentCraftables[bar] ? currentCraftables[bar] + 1 : 1;
        setPlayerData({ ...playerData, craftables: currentCraftables, resources: currentResources });
    }
};

// Function to change the player's current depth. 
const CHANGE_DEPTH = (playerData, setPlayerData, diff) => {
    const newDepth = playerData.currentDepth + diff;
    if (newDepth < 1 || newDepth > playerData.maxDepth) return;
    setPlayerData({ ...playerData, currentDepth: newDepth });
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
const SELL_RESOURCE = (resource) => {};

// Function to check if the player has enough resources for a specific cost. Disable button if true.
//WIP{}
const CHECK_DISABLED = (playerData, cost) => {
    let disabled = false;
    Object.entries(cost).forEach(([resource, amount]) => {
        if (disabled) return;

        if (playerData.resources[resource] < amount || !playerData.resources[resource]) {
            disabled = true;
            return;
        }
    });

    return disabled;
};

const BUILD_BUILDING = (playerData, setPlayerData, building, notify) => {
    const cost = BUILDINGS[building].cost;
    const currentResources = playerData.resources;
    const currentBuildings = playerData.buildings;
    let resourceCheck = true;

    Object.entries(cost).forEach(([resource, amount]) => {
        if (currentResources[resource] < amount || !currentResources[resource]) {
            notify(`You don't have enough ${resource} to build ${building}.`, 'error');
            if (resourceCheck) {
                resourceCheck = false;
            }
            return;
        }
        currentResources[resource] -= amount;
    });

    if (resourceCheck) {
        currentBuildings[building] = true;
        notify(`You built a ${building}.`, 'success');
        setPlayerData({ ...playerData, buildings: currentBuildings, resources: currentResources });
    }
};

const COLOR_PICKER = (name) => {
    switch (name) {
        case 'sand':
            return '#e8cb4a';
        case 'stone':
            return '#707070';
        case 'coal':
            return 'black';
        case 'iron':
            return '#404040';
        case 'gold':
            return '#d9b514';
        case 'diamond':
            return '#609bd1';
        case 'tin':
            return '#b7babd';
        case 'copper':
            return '#bf5306';
        case 'mithril':
            return '#00396e';
        case 'adamantite':
            return '#0e5227';
        default:
            return 'black';
    }
};

const PLAYER_UPGRADES = {
    speed1: {
        name: 'Speed up',
        description: 'Increase your dig speed, allowing you to dig in 2 clicks instead of 3.',
        unlockRequirement: {
            totalDigs: 100
        },
        upgradeFunction: (playerData, setPlayerData) => {
            if(playerData.digSpeed >= 51) return;
            setPlayerData({ ...playerData, digSpeed: 51 });
        },
    }
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
