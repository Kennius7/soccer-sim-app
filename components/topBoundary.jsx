import { View, Image, Dimensions } from "react-native";


export default TopBoundary = (props) => {
    const { width } = Dimensions.get("screen");

    const widthBody = width;
    const heightBody = 3;
    const color = props.color;

    return (
        <View 
            style={{
                backgroundColor: color,
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                width: widthBody,
                height: heightBody,
            }} 
        />
    ) 
}


