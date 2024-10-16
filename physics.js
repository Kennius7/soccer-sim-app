import Matter from 'matter-js';


export default Physics = (entities, { touches, time, dispatch }) => {
    let engine = entities.Physics.engine;
    Matter.Engine.update(engine, time.delta);
    return entities;
}
