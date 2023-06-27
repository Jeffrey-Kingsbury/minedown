import { styled } from "styled-components";
import { useContext, useState } from "react";
import { playerContext } from "./PlayerContext";
import ProgressBar from "./ProgressBar";

const GameArea = () => {
  const {
    playerData,
    setPlayerData,
    DIGGING,
    currentProgress,
    setCurrentProgress,
  } = useContext(playerContext);
  const {
    wallet,
    pickaxe,
    currentDepth,
    maxDepth,
    buffs,
    nerfs,
    resources,
    buildings,
  } = playerData;

  const digSpeed = playerData.pickaxeData().speed;
  const pickaxeData = playerData.pickaxeData();
  console.log(playerData.resources);
  return (
    <Wrapper>
      <p>Pickaxe: {playerData.pickaxeData().name}</p>
      <p>Depth: {currentDepth}</p>
      <p>Wallet: {wallet}</p>
      <ProgressBar currentProgress={currentProgress} />
      <button
        onClick={() => {
          if (currentProgress + digSpeed <= 100) {
            setCurrentProgress(currentProgress + digSpeed);
          } else {
            setCurrentProgress(0);
            DIGGING(currentDepth, playerData, setPlayerData);
          }
        }}
      >
        dig
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  border: 1px solid black;
`;

export default GameArea;
