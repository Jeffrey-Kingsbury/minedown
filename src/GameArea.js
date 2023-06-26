import { styled } from "styled-components";
import { useContext, useState } from "react";
import { playerContext } from "./PlayerContext";
import ProgressBar from "./ProgressBar";

const GameArea = () => {
  const { playerData, setPlayer, DIGGING } = useContext(playerContext);
  const { wallet, pickaxe, currentDepth, maxDepth, buffs, nerfs, resources, buildings } = playerData;
  const [currentProgress, setCurrentProgress] = useState(0);

	
  return (
    <Wrapper>
      <p>Pickaxe: {playerData.pickaxeData().name}</p>
      <p>Depth: {currentDepth}</p>
      <p>Wallet: {wallet}</p>
	  <ProgressBar currentProgress={currentProgress} />
	  <button onClick={()=>{DIGGING(pickaxe, currentDepth)}}>dig</button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  border: 1px solid black;
`;

export default GameArea;
