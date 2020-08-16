import React, {useState} from "react";
import { StyleSheet, Text, View } from "react-native";
import CheckBox from '../CheckBox';
import colors from "../../../assets/colors";
import {connect, useDispatch} from "react-redux";

export const LIST_ITEM_HEIGHT = 54;
const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderColor: "#f4f4f6",
        height: LIST_ITEM_HEIGHT
    },
    name: {
        fontSize: 16,
        fontFamily: "Poppins-Regular"
    },
    pointsContainer: {
        borderRadius: 8,
        backgroundColor: "#44c282",
        padding: 8
    },
    points: {
        color: "white",
        fontWeight: "bold"
    }
});

const ListItem = ({ elementKey, item, isLast }) => {

    const bottomRadius = isLast ? 8 : 0;
    const dispatch = useDispatch();
    return (
        <View
            style={[
                styles.container,
                {
                    borderBottomLeftRadius: bottomRadius,
                    borderBottomRightRadius: bottomRadius
                }
            ]}
        >
            <View>
                <CheckBox
                    selected={item.checked}
                    onPress={() => dispatch({ type: "CHECK_ITEM", payload: { elementKey : elementKey, itemKey : item.key, checked : item.checked} })}
                    text={item.name}
                    textStyle={styles.name}
                    checkColor={colors.bgPrimary}
                />
            </View>
        </View>
    );
};

/*const mapDispatchToProps = dispatch => {
    return {
        checkItem: ( elementKey, itemKey) => dispatch({ type: "CHECK_ITEM", payload: { elementKey : elementKey, itemKey : itemKey} })
    };
};*/
export default ListItem;
//export default connect(null, mapDispatchToProps)(ListItem);
