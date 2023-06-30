// prettier-ignore
const PICKAXES = [
  { name: 'Wooden pickaxe', cost: {}, speed: 25, digDepth: 2, reqDepth: 0 },
  { name: 'Stone pickaxe', cost: {stone:10}, speed: 35, digDepth: 10, reqDepth: 5 },
  { name: 'Iron pickaxe', cost: {ironBar:10}, speed: 45, digDepth: 15, reqDepth: 10 },
  { name: 'Steel pickaxe', cost: {}, speed: 55, digDepth: 20, reqDepth: 15 },
  { name: 'Diamond pickaxe', cost: {}, speed: 65, digDepth: 30, reqDepth: 25 },
  { name: 'Mithril pickaxe', cost: {}, speed: 70, digDepth: 50, reqDepth: 30 },
  { name: 'Adamantite pickaxe', cost: {}, speed: 80, digDepth: 90, reqDepth: 50 },
  { name: 'Crystal pickaxe', cost: {}, speed: 90, digDepth: 125, reqDepth: 90 },
  { name: 'Infernal pickaxe', cost: {}, speed: 101, digDepth: 300, reqDepth: 125 },
];

// prettier-ignore
const BUILDINGS = {
  blacksmith: {},
  storeFront: {},
};

// prettier-ignore
const RESOURCES = {
    dig:{
    sand: { name: 'sand', value: 1, depth: 1, stopDepth: 15, rarity: 5},
    stone: { name: 'stone', value: 10, depth: 1, stopDepth: 0, rarity: 10},
    coal: { name: 'coal', value: 200, depth: 2, stopDepth: 300, rarity: 15},
    iron: { name: 'iron', value: 500, depth: 3, stopDepth: 0, rarity: 25},
    gold: { name: 'gold', value: 5000, depth: 300, stopDepth: 700, rarity: 40},
    diamond: { name: 'diamond', value: 100000, depth: 500, stopDepth: 0, rarity: 50},
    },
    craft:{
    ironBar: { name: 'iron bar', value: 1000, cost: {iron: 1, coal: 2}},
    },
};

// prettier-ignore
const PLAYER = {
  wallet: 0,
  pickaxe: 0,
  currentDepth: 1,
  maxDepth: 1,
  depthProgress: {
    realDigCount: 0,
    digCount: 0,
    unlockChance: 0,
  },
  buffs: {},
  nerfs: {},
  resources: {},
  buildings: {},
};


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
                });
                return;
            }
        }

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

const UPGRADE_PICKAXE = (setPlayerData, playerData, notify) => {
    const nextPickaxe = PICKAXES[playerData.pickaxe + 1];
    const cost = nextPickaxe.cost;
    const currentResources = playerData.resources;
    let resourceCheck = true;

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

    if (resourceCheck) {
        setPlayerData({ ...playerData, pickaxe: playerData.pickaxe + 1, resources: currentResources });
    }
};

const SMITH_BARS = (bar, resources) => {};

const CHANGE_DEPTH = (currentDepth, direction, depthUnlocks) => {};

const HIRE_MINER = (currentMiners, resources, depthUnlocks) => {};

const UPGRADE_MINER = (currentMiners, resources) => {};

const SELL_RESOURCE = (resource) => {};

const CHECK_DISABLED = (playerData, building) => {
    switch (building) {
        case 'blacksmith':
            if (!playerData.resources.sand || !playerData.resources.stone || !playerData.resources.coal) {
                return true;
            }
            if (playerData.resources.sand < 25 || playerData.resources.stone < 10 || playerData.resources.coal < 5) {
                return true;
            }
            return false;

        default:
            return true;
    }
};

const BUILD_BUILDING = (playerData, setPlayerData, building, notify) => {
    switch (building) {
        case 'blacksmith':
            if (!playerData.resources.sand || !playerData.resources.stone || !playerData.resources.coal) {
                return;
            }
            if (playerData.resources.sand < 25 || playerData.resources.stone < 10 || playerData.resources.coal < 5) {
                return;
            }
            setPlayerData({
                ...playerData,
                resources: {
                    ...playerData.resources,
                    sand: playerData.resources.sand - 25,
                    stone: playerData.resources.stone - 10,
                    coal: playerData.resources.coal - 5,
                },
                buildings: {
                    ...playerData.buildings,
                    blacksmith: true,
                },
            });
            notify('Blacksmith built', 'success');
            return;

        default:
            return;
    }
};

export {
    PLAYER,
    PICKAXES,
    BUILDINGS,
    RESOURCES,
    DIGGING,
    UPGRADE_PICKAXE,
    SMITH_BARS,
    CHANGE_DEPTH,
    HIRE_MINER,
    UPGRADE_MINER,
    SELL_RESOURCE,
    CHECK_DISABLED,
    BUILD_BUILDING,
};
