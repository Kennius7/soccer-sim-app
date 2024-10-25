import React, { useState, useEffect } from "react";
import { Text, View, ImageBackground, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import { GameEngine } from "react-native-game-engine";
import Matter from "matter-js";
import { Ball, BottomBoundary, TopBoundary, LeftBoundary, RightBoundary } from "../components";


export default function Index() {
  const multiplier = 3;
  const [moveX, setMoveX] = useState(-multiplier);
  const [moveY, setMoveY] = useState(-multiplier);
  const [running, setRunning] = useState(true);
  const boundaryColor = "green";
  const { width, height } = Dimensions.get("screen");
  const boundaryHeightOrWidth = 3;
  const boxSize = 18;

  const initialBall = Matter.Bodies.rectangle(width / 2, height / 2, boxSize, boxSize);
  const bottomBoundary = Matter.Bodies.rectangle(width / 2, height - 25, width, boundaryHeightOrWidth, { isStatic: true });
  const topBoundary = Matter.Bodies.rectangle(width / 2, 35, width, boundaryHeightOrWidth, { isStatic: true });
  const leftBoundary = Matter.Bodies.rectangle(25, height / 2, boundaryHeightOrWidth, height, { isStatic: true });
  const rightBoundary = Matter.Bodies.rectangle(width + 25, height / 2, boundaryHeightOrWidth, height, { isStatic: true });

  const engine = Matter.Engine.create({ enableSleeping: false });
  const world = engine.world;
  world.gravity.y = 0;
  world.gravity.x = 0;

  Matter.World.add(world, [initialBall, bottomBoundary, topBoundary, leftBoundary, rightBoundary]);

  const Physics = (entities, { touches, time, dispatch }) => {
    let engine = entities["physics"].engine;
    Matter.Engine.update(engine, time.delta);
    touches.filter(t => t.type === "press").forEach(t => {
      if (moveX === -multiplier && moveY === -multiplier) {
        setMoveX(prev => prev * -1);
        Matter.Body.setVelocity(entities["initialBall"].body, { x: moveX, y: moveY });
      }
      if (moveX === multiplier && moveY === -multiplier) {
        setMoveY(prev => prev * -1);
        Matter.Body.setVelocity(entities["initialBall"].body, { x: moveX, y: moveY });
      }
      if (moveX === multiplier && moveY === multiplier) {
        setMoveX(prev => prev * -1);
        Matter.Body.setVelocity(entities["initialBall"].body, { x: moveX, y: moveY });
      }
      if (moveX === -multiplier && moveY === multiplier) {
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
            ballSize: boxSize,
            renderer: Ball
          },
          bottomBoundary: { 
            body: bottomBoundary,
            color: boundaryColor, 
            height: boundaryHeightOrWidth,
            renderer: BottomBoundary
          },
          topBoundary: { 
            body: topBoundary,
            color: boundaryColor, 
            height: boundaryHeightOrWidth,
            renderer: TopBoundary
          },
          leftBoundary: { 
            body: leftBoundary,
            color: boundaryColor, 
            width: boundaryHeightOrWidth,
            renderer: LeftBoundary
          },
          rightBoundary: { 
            body: rightBoundary,
            color: boundaryColor, 
            width: boundaryHeightOrWidth,
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


