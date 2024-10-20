import { View } from "react-native";
import Matter from "matter-js";



const Bird = (props) => {
    console.log("Props: ", props);
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;
    const xBody = props.body.position.x - widthBody / 2;
    const yBody = props.body.position.y - heightBody / 2;
    const color = props.color;

    return (
        <View 
            style={{
                borderWidth: 4,
                borderColor: color,
                borderStyle: "solid",
                backgroundColor: color,
                position: "absolute",
                left: xBody,
                top: yBody,
                width: widthBody,
                height: heightBody,
            }} 
        />
    ) 
}

export default BirdBox = ({ world, color, pos, size }) => {
    let initialBird = Matter.Bodies.rectangle(pos.x, pos.y, size.width, size.height, { label: "Bird" });
    Matter.World.add(world, initialBird);

    return {
        body: initialBird,
        color,
        pos,
        renderer: <Bird/>
    }
}

