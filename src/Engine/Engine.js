const PICKAXES = [
  { name: "Wooden pickaxe", cost: {}, speed: 10, digDepth: 5, reqDepth: 0 },
  { name: "Stone pickaxe", cost: {}, speed: 15, digDepth: 10, reqDepth: 5 },
  { name: "Iron pickaxe", cost: {}, speed: 20, digDepth: 15, reqDepth: 10 },
  { name: "Steel pickaxe", cost: {}, speed: 25, digDepth: 20, reqDepth: 15 },
  { name: "Diamond pickaxe", cost: {}, speed: 35, digDepth: 30, reqDepth: 25 },
  { name: "Mithril pickaxe", cost: {}, speed: 40, digDepth: 50, reqDepth: 30 },
  { name: "Adamantite pickaxe", cost: {}, speed: 45, digDepth: 90, reqDepth: 50 },
  { name: "Crystal pickaxe", cost: {}, speed: 60, digDepth: 125, reqDepth: 90 },
  { name: "Infernal pickaxe", cost: {}, speed: 65, digDepth: 300, reqDepth: 125 },
  { name: "Elder pickaxe", cost: {}, speed: 70, digDepth: 600, reqDepth: 300 },
  { name: "Imperial pickaxe", cost: {}, speed: 75, digDepth: 1000, reqDepth: 600 },
  { name: "Divine pickaxe", cost: {}, speed: 101, digDepth: 5000, reqDepth: 1000 },
];

const BUILDINGS = {
  smithy: {},
  smelter: {},
  storeFront: {},
};

const RESOURCES = {
  sand: { name: "Sand", value: 1, depth: 1, stopDepth:15, rarity: 10 },
  stone: { name: "Stone", value: 10, depth: 3, stopDepth: 0, rarity: 20 },
  iron: { name: "Iron", value: 500, depth: 20, stopDepth:0, rarity: 25 },
  coal: { name: "Coal", value: 200, depth: 100, stopDepth:300, rarity: 30 },
  gold: { name: "Gold", value: 5000, depth: 300, stopDepth:700, rarity: 40 },
  diamond: { name: "Diamond", value: 100000, depth: 500, stopDepth:0, rarity: 50 },
};

const PLAYER = {
  wallet: 0,
  pickaxe: 11,
  pickaxeData: function(){
    return PICKAXES[this.pickaxe] ? PICKAXES[this.pickaxe] : PICKAXES[0];
  },
  currentDepth: 1000,
  maxDepth: 0,
  buffs: {},
  nerfs: {},
  resources: {},
  buildings: {},
};

const DIGGING = (depth, playerData, setPlayerData, buffs = '', nerfs = '') => {
  const potentialResources = new Map();

  //Go through everything in RESOURCES and check if it's in the range of the current depth
  Object.keys(RESOURCES).forEach((resource) => {
    if (RESOURCES[resource].depth <= depth && (RESOURCES[resource].stopDepth >= depth || RESOURCES[resource].stopDepth === 0)) {
      const effectiveness = (1 / RESOURCES[resource].rarity) * Math.log((depth / RESOURCES[resource].depth) + 1);
      potentialResources.set(RESOURCES[resource], effectiveness);
    }
  });

  // Calculate the total effectiveness of all potential resources.
  const totalEffectiveness = Array.from(potentialResources.values()).reduce((a, b) => a + b, 0);

  // Now, pick a resource randomly, weighted by their effectiveness.
  const randomResource = () => {
    const randomNum = Math.random() * totalEffectiveness;
    let currentEffectiveness = 0;
    for (let [resource, effectiveness] of potentialResources) {
      currentEffectiveness += effectiveness;
      if (randomNum < currentEffectiveness) {
        return resource;
      }
    }
  };
  

  const gainedResource = randomResource();
  //set the playerData.inventory to add the new resource
  setPlayerData({ ...playerData, resources: { ...playerData.resources, [gainedResource.name]: playerData.resources[gainedResource.name] ?  playerData.resources[gainedResource.name] + 1 : playerData.resources[gainedResource.name] = 1 }});


};


const UPGRADE_PICKAXE = (currentPickaxe, resources) => {};

const SMITH_BARS = (bar, resources) => {};

const CHANGE_DEPTH = (currentDepth, direction, depthUnlocks) => {};

const HIRE_MINER = (currentMiners, resources, depthUnlocks) => {};

const UPGRADE_MINER = (currentMiners, resources) => {};

const SELL_RESOURCE = (resource) => {};

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
};
