import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ImageBackground, Dimensions } from "react-native";
import Hello from "../components/hello";
import { StatusBar } from "expo-status-bar";
import { GameEngine } from "react-native-game-engine";
import Matter from "matter-js";
// import entities from "../entities";
// import { restart } from "../entities";
// import Physics from "../physics";
import Ball from "../components/ball";
import BottomBoundary from "../components/bottomBoundary";



export default function Index() {
  const [gravityX, setGravityX] = useState(0);
  const [gravityY, setGravityY] = useState(0);
  const [moveX, setMoveX] = useState(-1);
  const [moveY, setMoveY] = useState(-1);
  const [running, setRunning] = useState(true);

  const { width, height } = Dimensions.get("screen");
  const boxSize = Math.trunc(Math.max(width, height) * 0.075);
  const initialBall = Matter.Bodies.rectangle(width / 2, height / 2, boxSize, boxSize);
  const bottomBoundary = Matter.Bodies.rectangle(width / 2, height - boxSize / 2, width, boxSize, { isStatic: true });
  let engine = Matter.Engine.create({ enableSleeping: false });
  let world = engine.world;
  world.gravity.y = gravityY;
  world.gravity.x = gravityX;
  Matter.World.add(world, [initialBall, bottomBoundary]);
  // let pos = { x: 200, y: 200 };
  // let initialBall = Matter.Bodies.rectangle(pos.x, pos.y, size.width, size.height, { label: "Ball" });
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


  // useEffect(() => {
  //   console.log("Looping check...", world.gravity.y, world.gravity.x);
  //   const gameInterval = setInterval(() => {
  //     setRunning(!running);
  //     if (running) {
  //       setGravityX(prev => prev * -1);
  //       setGravityY(prev => prev * -1);
  //     }
  //   }, 6000);

  //   return () => {
  //     clearInterval(gameInterval);
  //   }
  // }, [gravityX, gravityY, setGravityX, setGravityY, running])


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
            size: [boxSize, boxSize], 
            color: 'red', 
            renderer: Ball
          },
          bottomBoundary: { 
            body: bottomBoundary, 
            size: [width, 100], 
            color: 'black', 
            renderer: BottomBoundary
          }
        }}
        style={{ position: "absolute", zIndex: 2, top: 0, left: 0, right: 0, bottom: 0 }}
      >

        <StatusBar style="auto" hidden={true} />
        {/* <Hello contStyle={styles.container} textStyle={styles.helloText}/> */}
      </GameEngine>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  helloText: {
    fontSize: 30,
    color: "blue",
  }
});

