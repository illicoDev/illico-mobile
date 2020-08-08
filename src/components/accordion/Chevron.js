import React from "react";
import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { mix, interpolateColor } from "react-native-redash";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from "../../../assets/colors";

const size = 30;
const styles = StyleSheet.create({
    container: {
        height: size,
        width: size,
        borderRadius: size / 2,
        justifyContent: "center",
        alignItems: "center"
    }
});

const Chevron = ({ transition }) => {
    const rotateZ = mix(transition, Math.PI, 0);
    const backgroundColor = interpolateColor(
        transition,{
            inputRange: [0, 100],
            outputRange: [{ r: 82, g: 82, b: 81 },{ r: 228, g: 86, b: 69 }]
        }
    );
    return (
        <Animated.View
            style={[styles.container, { transform: [{ rotateZ }], backgroundColor }]}
        >
            <MaterialCommunityIcons name="arrow-down-drop-circle" color={colors.bgPrimary} size={24} />
        </Animated.View>
    );
};

export default Chevron;
