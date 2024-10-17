import { View, Image } from "react-native";
import ballIcon from "../assets/images/soccer-ball.png";


export default Ball = (props) => {

    const widthBody = 20;
    const heightBody = 20;
    const xBody = props.body.position.x - widthBody / 2;
    const yBody = props.body.position.y - heightBody / 2 - 50;

    return (
        <Image 
            source={ballIcon}
            alt="ball"
            style={{
                position: "absolute",
                left: xBody,
                top: yBody,
                width: widthBody,
                height: heightBody,
            }} 
        />
    ) 
}
