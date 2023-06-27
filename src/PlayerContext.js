import { useState, createContext } from "react";
import { PLAYER, DIGGING } from "./Engine/Engine.js";

export const playerContext = createContext();

export const ContextProvider = ({ children }) => {
  const [playerData, setPlayerData] = useState(PLAYER);
  const [currentProgress, setCurrentProgress] = useState(0);

  return (
    <playerContext.Provider value={{ playerData, setPlayerData, DIGGING, currentProgress, setCurrentProgress }}>
      {children}
    </playerContext.Provider>
  );
};

export default ContextProvider;
