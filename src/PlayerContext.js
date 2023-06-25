import { useState, createContext } from "react";
import { PlayerData } from "./Data";

export const PlayerContext = createContext();

export const ContextProvider = ({children}) => {
    const [player, setPlayer] = useState(PlayerData);
    const [inventory, setInventory] = useState(PlayerData.inventory);

    return (
        <PlayerContext.Provider value={[player, setPlayer, inventory, setInventory]}>
            {children}
        </PlayerContext.Provider>
    );
}

export default ContextProvider;