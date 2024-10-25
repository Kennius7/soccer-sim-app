import { View, Image } from "react-native";
import ballIcon from "../assets/images/soccer-ball.png";


export default Ball = (props) => {

    const widthBody = props.ballSize;
    const heightBody = props.ballSize;
    const xBody = props.body.position.x - widthBody / 2 - 22;
    const yBody = props.body.position.y - heightBody / 2 - 45;

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
