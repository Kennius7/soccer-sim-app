import React, { useState, useEffect } from "react";
import { Text, View, ImageBackground, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import { GameEngine } from "react-native-game-engine";
import Matter from "matter-js";
import { Ball, BottomBoundary, TopBoundary, LeftBoundary, RightBoundary } from "../components";


export default function Index() {
  const [moveX, setMoveX] = useState(-1);
  const [moveY, setMoveY] = useState(-1);
  const [running, setRunning] = useState(true);
  const boundaryColor = "black";
  const { width, height } = Dimensions.get("screen");
  const boxSize = Math.trunc(Math.max(width, height) * 0.075);
  const initialBall = Matter.Bodies.rectangle(width / 2, height / 2, boxSize, boxSize);
  const bottomBoundary = Matter.Bodies.rectangle(width / 2, height - boxSize / 2, width, boxSize, { isStatic: true });
  const topBoundary = Matter.Bodies.rectangle(width / 2, height - boxSize / 2, width, boxSize, { isStatic: true });
  const leftBoundary = Matter.Bodies.rectangle(width / 2, height - boxSize / 2, width, boxSize, { isStatic: true });
  const rightBoundary = Matter.Bodies.rectangle(width / 2, height - boxSize / 2, width, boxSize, { isStatic: true });
  const engine = Matter.Engine.create({ enableSleeping: false });
  const world = engine.world;
  world.gravity.y = 0;
  world.gravity.x = 0;
  Matter.World.add(world, [initialBall, BottomBoundary, TopBoundary, LeftBoundary, RightBoundary]);

  const Physics = (entities, { touches, time, dispatch }) => {
    let engine = entities["physics"].engine;
    Matter.Engine.update(engine, time.delta);
    touches.filter(t => t.type === "press").forEach(t => {
      if (moveX === -1 && moveY === -1) {
        setMoveX(prev => prev * -1);
        Matter.Body.setVelocity(entities["initialBall"].body, { x: moveX, y: moveY });
      }
      if (moveX === 1 && moveY === -1) {
        setMoveY(prev => prev * -1);
        Matter.Body.setVelocity(entities["initialBall"].body, { x: moveX, y: moveY });
      }
      if (moveX === 1 && moveY === 1) {
        setMoveX(prev => prev * -1);
        Matter.Body.setVelocity(entities["initialBall"].body, { x: moveX, y: moveY });
      }
      if (moveX === -1 && moveY === 1) {
        setMoveY(prev => prev * -1);
        Matter.Body.setVelocity(entities["initialBall"].body, { x: moveX, y: moveY });
      }
      // Matter.Body.setVelocity(entities["initialBall"].body, { x: moveX, y: moveY });
    });
    return entities;
  };


  return (
    <ImageBackground 
      source={require("../assets/images/footballPitch.jpg")} 
      style={{ flex: 1, width: "100%", height: "100%", position: "relative" }}
    >
      <GameEngine 
        systems={[Physics]}
        running={running}
        entities={{ 
          physics: { 
            engine: engine, 
            world: world 
          },
          initialBall: { 
            body: initialBall,
            renderer: Ball
          },
          bottomBoundary: { 
            body: bottomBoundary,
            color: 'black', 
            renderer: BottomBoundary
          },
          topBoundary: { 
            body: topBoundary,
            color: boundaryColor, 
            renderer: TopBoundary
          },
          leftBoundary: { 
            body: leftBoundary,
            color: boundaryColor, 
            renderer: LeftBoundary
          },
          rightBoundary: { 
            body: rightBoundary,
            color: boundaryColor, 
            renderer: RightBoundary
          }
        }}
        style={{ position: "absolute", zIndex: 2, top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <StatusBar style="auto" hidden={true} />
      </GameEngine>
    </ImageBackground>
  );
}


