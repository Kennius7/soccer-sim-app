import { View, Image } from "react-native";
import ballIcon from "../assets/images/soccer-ball.png";


export default Ball = (props) => {

    const widthBody = 30;
    const heightBody = 30;
    const xBody = props.body.position.x - widthBody / 2;
    const yBody = props.body.position.y - heightBody / 2;
    const color = props.color;

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
