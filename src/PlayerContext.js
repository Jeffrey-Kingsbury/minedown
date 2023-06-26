import { useState, createContext } from "react";
import { PLAYER, DIGGING } from "./Engine/Engine.js";

export const playerContext = createContext();

export const ContextProvider = ({ children }) => {
  const [playerData, setPlayer] = useState(PLAYER);

  return (
    <playerContext.Provider value={{ playerData, setPlayer, DIGGING }}>
      {children}
    </playerContext.Provider>
  );
};

export default ContextProvider;
