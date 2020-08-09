import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {TouchableOpacity, Text, StyleSheet} from 'react-native'
import colors from "../../assets/colors";

const CheckBox = ({ selected, onPress, style, textStyle, size = 30, color = '#211f30',checkColor, text = '', ...props}) => (
    <TouchableOpacity style={[styles.checkBox, style]} onPress={onPress} {...props}>
        <MaterialCommunityIcons
            size={size}
            color={selected ? checkColor : color }
            name={ selected ? 'checkbox-marked' : 'checkbox-blank-outline'}
        />
        <Text style={textStyle}> {text} </Text>
    </TouchableOpacity>
    /*<MaterialCommunityIcons size={20} color={colors.bgPrimary} name='circle-outline' />
    <MaterialCommunityIcons size={20} color={colors.bgPrimary} name='circle-slice-8' />*/
);
const styles = StyleSheet.create({
    checkBox: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export default CheckBox;
