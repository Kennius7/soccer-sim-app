import Matter from "matter-js";
import BirdBox from "../components/bird";


export default restart = () => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;
    // let worldGravity = engine.gravity;
    // worldGravity.y = 0.4;
    world.gravity.y = 0.4;
    let pos = { x: 200, y: 200 };
    // console.log(pos);

    return {
        physics: { engine, world },
        bird: BirdBox(world, "black", pos, { height: 100, width: 100 }),
    }
}
