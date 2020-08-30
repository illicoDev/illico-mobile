import React, {Component} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import CheckBox from '../CheckBox';
import colors from "../../../assets/colors";
import {connect} from "react-redux";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
        fontFamily: "Poppins-Medium",
        color: "#474747"
    },
    pointsContainer: {
        flexDirection: "row",
        borderRadius: 8,
        backgroundColor: colors.bgPrimary,
        padding: 8
    },
    points: {
        color: "white",
        fontFamily: "Poppins-SemiBold"
    }
});
//({ elementKey, item, isLast })
class ListItem extends Component {

    checkItem = async (elementKey, item) => {
        await this.props.checkItem(elementKey, item);
        this.renderPrice();
    };
    renderPrice = () => {
        let supplements = 0;
        this.props.menu.elements.map( element => {
            element.items.map( item => {
                if(item.checked && item.supp > 0){
                    supplements += item.supp;
                }
            })
        });
        this.props.updatePrice(supplements);
        console.log(supplements);
        console.log(this.props.menu);
    };

    render() {
        const bottomRadius = this.props.isLast ? 8 : 0;
        return (
            <View>
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
                            selected={this.props.item.checked}
                            onPress={() => this.checkItem(this.props.elementKey, this.props.item)}
                            text={this.props.item.name}
                            subItem={this.props.item.subItem}
                            textStyle={styles.name}
                            checkColor={colors.bgPrimary}
                        />
                    </View>
                    { (this.props.item.hasOption && this.props.item.checked) &&
                    <TouchableOpacity>
                        <View style={styles.pointsContainer}>
                            <Text style={styles.points}>Options </Text>
                            <MaterialCommunityIcons size={20} color="white" name={"playlist-edit"}/>
                        </View>
                    </TouchableOpacity>
                    }
                    { this.props.item.supp > 0 && <View style={styles.pointsContainer}>
                        <Text style={styles.points}>+ {this.props.item.supp} Dh</Text>
                    </View>
                    }
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        menu: state.cart.cacheMenu,
        currentUser: state.auth.currentUser
    };
};
const mapDispatchToProps = dispatch => {
    return {
        checkItem: ( elementKey, item) => dispatch({ type: "CHECK_ITEM", payload: {elementKey: elementKey, itemKey: item.key, checked: item.checked} }),
        updatePrice: ( supplements) => dispatch({ type: "UPDATE_PRICE", payload: {supplements: supplements} })
    };
};
//export default ListItem;
export default connect( mapStateToProps, mapDispatchToProps)(ListItem);
