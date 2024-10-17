import { View, Image, Dimensions } from "react-native";


export default LeftBoundary = (props) => {
    const { height } = Dimensions.get("screen");

    const widthBody = 3;
    const heightBody = height;
    const color = props.color;

    return (
        <View 
            style={{
                backgroundColor: color,
                position: "absolute",
                right: 0,
                width: widthBody,
                height: heightBody,
            }} 
        />
    ) 
}


