import React, {Component} from "react";
import {Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import CheckBox from '../CheckBox';
import colors from "../../../assets/colors";
import {connect} from "react-redux";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from "react-native-modal";

const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;

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
class ListSubItem extends Component {
    constructor(props) {
        super(props);
    }

    checkSubItem = async (item) => {
        console.log("hada item");
        console.log(item);
        await this.props.addSubItem(item);
        await this.props.subItemChangeState(item);
        //this.renderPrice();
    };
    /*renderPrice = () => {
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
    };*/

    render() {
        //const bottomRadius = this.props.isLast ? 8 : 0;
        return (
            <View>
                <View style={styles.container}>
                    <View>
                        <CheckBox
                            selected={this.props.item.checked}
                            onPress={() => this.checkSubItem(this.props.item)}
                            text={this.props.item.name}
                            textStyle={styles.name}
                            checkColor={colors.bgPrimary}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        menu: state.cart.cacheMenu,
        currentUser: state.auth.currentUser,
        modalDisplay: state.cart.modalDisplay
    };
};
const mapDispatchToProps = dispatch => {
    return {
        subItemChangeState: item => dispatch({ type: "CHECK_SUB_ITEM", payload: item }),
        addSubItem: item => dispatch({ type: "ADD_SUB_ITEM", payload: item })
    };
};
export default connect( mapStateToProps, mapDispatchToProps)(ListSubItem);
