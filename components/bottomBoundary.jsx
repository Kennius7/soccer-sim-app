import { View, Image, Dimensions } from "react-native";
import ballIcon from "../assets/images/soccer-ball.png";


export default BottomBoundary = (props) => {
    const { width } = Dimensions.get("screen");

    const widthBody = width;
    const heightBody = 2;
    const color = props.color;

    return (
        <View 
            style={{
                backgroundColor: color,
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                width: widthBody,
                height: heightBody,
            }} 
        />
    ) 
}


