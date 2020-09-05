import React, {Component} from "react";
import {Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import CheckBox from '../CheckBox';
import colors from "../../../assets/colors";
import {connect} from "react-redux";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from "react-native-modal";
import ListSubItem from "./ListSubItem";

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
    },
    circle: {
        marginEnd: 2,
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'green'
    }, modalContentView: {
        backgroundColor: '#ffffff',
        width: screen_width * 0.95,
        borderRadius: 5,
        height: screen_height * 0.25,
    }, modalView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }, modalTitle:{
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'Poppins-SemiBold',
        marginBottom: 20,
        paddingTop : 25,
    }, closeBtn: {
        position: 'absolute',
        right: 15,
        top: 15
    }
});
//({ elementKey, item, isLast })
class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            optionList : this.props.menu.subItems.filter(subItem => subItem !== this.props.item.key)
        };
    }

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

    openOptionModal = async (item) => {
        //let optionListData = this.props.menu.subItems.filter(subItem => subItem !== item.key);
        //await this.setState({optionList : optionListData });
        await this.props.openModal(item);
        console.log(this.props.modalItemKey);

    };

    renderOptionModal = () => {
        let optionList = this.props.menu.subItems.filter(subItem => subItem.key === this.props.item.key);
        return (
            <View>
                {optionList.map((item, key) => (
                    <ListSubItem elementKey={this.props.item.key} {...{ item, key }} isLast={key === optionList.length - 1} />
                ))}
            </View>
        );
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
                    <TouchableOpacity onPress={() => this.openOptionModal(this.props.item)}>
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
                <Modal backdropColor='#C4C4C4' isVisible={this.props.modalDisplay && (this.props.modalItemKey === this.props.item.key)}>
                    <View style={styles.modalView}>
                        <View style={styles.modalContentView}>
                            <View>
                                <View>
                                    <Text style={styles.modalTitle}>{this.props.item.name} Choisir une option </Text>
                                </View>
                                <ScrollView>
                                    <View>
                                        {this.renderOptionModal()}
                                    </View>
                                </ScrollView>
                            </View>
                            <TouchableOpacity style={styles.closeBtn}
                                              onPress={() => {this.props.closeModal()}}
                            >
                                <View>
                                    <Image source={require('../../../assets/img/close_pop.png')}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        menu: state.cart.cacheMenu,
        currentUser: state.auth.currentUser,
        modalDisplay: state.cart.modalDisplay,
        modalItemKey: state.cart.modalItemKey
    };
};
const mapDispatchToProps = dispatch => {
    return {
        checkItem: ( elementKey, item) => dispatch({ type: "CHECK_ITEM", payload: {elementKey: elementKey, itemKey: item.key, checked: item.checked} }),
        updatePrice: ( supplements) => dispatch({ type: "UPDATE_PRICE", payload: {supplements: supplements} }),
        closeModal: () => dispatch({ type: "CLOSE_MODAL" }),
        openModal: item => dispatch({ type: "OPEN_MODAL", payload: item })
    };
};
//export default ListItem;
export default connect( mapStateToProps, mapDispatchToProps)(ListItem);
