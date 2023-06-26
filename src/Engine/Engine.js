const PICKAXES = [
  { name: "Wooden pickaxe", cost: {}, speed: 1, digDepth: 5, reqDepth: 0 },
  { name: "Stone pickaxe", cost: {}, speed: 2, digDepth: 10, reqDepth: 5 },
  { name: "Iron pickaxe", cost: {}, speed: 3, digDepth: 15, reqDepth: 10 },
  { name: "Steel pickaxe", cost: {}, speed: 4, digDepth: 20, reqDepth: 15 },
];

const BUILDINGS = {
  smithy: {},
  smelter: {},
  storeFront: {},
};

const RESOURCES = {
  sand: { name: "Sand", value: 1, depth: 1, rarity: 1 },
  stone: { name: "Stone", value: 10, depth: 3, rarity: 2 },
  iron: { name: "Iron", value: 500, depth: 10, rarity: 10 },
  coal: { name: "Coal", value: 200, depth: 5, rarity: 5 },
  gold: { name: "Gold", value: 5000, depth: 35, rarity: 40 },
  diamond: { name: "Diamond", value: 100000, depth: 100, rarity: 60 },
};

const PLAYER = {
  wallet: 0,
  pickaxe: 0,
  pickaxeData: function(){
    return PICKAXES[this.pickaxe] ? PICKAXES[this.pickaxe] : PICKAXES[0];
  },
  currentDepth: 0,
  maxDepth: 0,
  buffs: {},
  nerfs: {},
  resources: {},
  buildings: {},
};

const DIGGING = (currentPickaxe, depth, buffs = '', nerfs = '') => {

};

const UPGRADE_PICKAXE = (currentPickaxe, resources) => {};

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
  CHANGE_DEPTH,
  HIRE_MINER,
  UPGRADE_MINER,
  SELL_RESOURCE,
};
