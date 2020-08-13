import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    FlatList,
    TouchableOpacity,
    ImageBackground,
    CheckBox
} from 'react-native';
import {Card, Title} from "react-native-paper";
import colors from "../../assets/colors";
import CustomActionButton from "../../components/CustomActionButton";
import List from "../../components/accordion/List";
import Colors from "react-native/Libraries/NewAppScreen/components/Colors";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {connect} from "react-redux";
import {stringify} from "javascript-stringify";

const list1 =  {
    name: "MENU",
    items: [
        { name: "BEST OF", points: "$3.45", checked:false },
        { name: "MAXI BEST OF", points: "$3.45", checked:false }
    ]
};
const list2 =  {
    name: "ACCOMPAGNEMENT",
    items: [
        { name: "FRITE", points: "$3.45", checked:false },
        { name: "POTATOS", points: "$3.45", checked:true },
        { name: "PETITE SALADE", points: "$3.45", checked:false }
    ]
};
const list3 =  {
    name: "BOISSON",
    items: [
        { name: "COCA-COLA", points: "$3.45", checked:false },
        { name: "COCA-COLA ZERO", points: "$3.45", checked:false },
        { name: "SPRITE", points: "$3.45", checked:false },
        { name: "LIPTON ICE-TEA", points: "$3.45", checked:false },
        { name: "EVIAN", points: "$3.45", checked:false },
        { name: "JUS D'ORANGE", points: "$3.45", checked:false }
    ]
};

class OrderScreen extends Component {

    constructor() {
        super();
        this.state ={
            count: 1,
            price: 35,
            menu: {
                count: 1,
                price: 35,
                elements: [
                    {
                        name: "MENU",
                        items: [
                            { name: "BEST OF", points: "$3.45", checked:false },
                            { name: "MAXI BEST OF", points: "$3.45", checked:false }
                        ]
                    },
                    {
                        name: "ACCOMPAGNEMENT",
                        items: [
                            { name: "FRITE", points: "$3.45", checked:false },
                            { name: "POTATOS", points: "$3.45", checked:true },
                            { name: "PETITE SALADE", points: "$3.45", checked:false }
                        ]
                    },
                    {
                        name: "BOISSON",
                        items: [
                            { name: "COCA-COLA", points: "$3.45", checked:false },
                            { name: "COCA-COLA ZERO", points: "$3.45", checked:false },
                            { name: "SPRITE", points: "$3.45", checked:false },
                            { name: "LIPTON ICE-TEA", points: "$3.45", checked:false },
                            { name: "EVIAN", points: "$3.45", checked:false },
                            { name: "JUS D'ORANGE", points: "$3.45", checked:false }
                        ]
                    }
                ]
            }
        }
    }

    subCount = () => {
        this.setState(oldState =>{
            if(oldState.menu.count >=1){
                return {...oldState ,menu:{...oldState.menu, count:oldState.menu.count - 1}} ;
            }
        })
    };

    addCount = () => {
        this.setState( oldState =>{
            return {...oldState ,menu:{...oldState.menu,count:oldState.menu.count + 1}} ;
        });
    };

    addToCart = () => {
        //let {,qte} = {menuItem.}this.state.menu.count
        let item = {
            title: this.props.route.params.menu.title ,
            imageUrl: this.props.route.params.menu.imageUrl,
            qte: this.state.menu.count
        }
        if(item.qte > 0){
            this.props.addToCartDispatcher(item);
            console.log("Adding to cart " + stringify(item));
        }
        else{ alert('La quantité doit être supérieure à 0');}
    }
    render() {
        const menuItem = this.props.route.params.menu;
        return (
            <View style={styles.container}>
                <View style={{flex:1}}>
                    <View style={{flex:1}}>
                        <ScrollView style={{flex:1, margin: 0}}>
                            <ImageBackground
                                accessibilityRole={'image'}
                                source={{ uri : "https://firebasestorage.googleapis.com/v0/b/illico-bd1e8.appspot.com/o/food_cat%2Fheader.png?alt=media&token=08d707a6-b4a9-498a-8046-5dc61637dd4b"}}
                                style={styles.background}
                                imageStyle={styles.logo}>
                                <Text style={[styles.text, {fontFamily: 'Poppins-Bold'}]}>{menuItem.title}</Text>
                            </ImageBackground>
                            <View style={styles.cardHeader}>
                                <View style={{flex:1, flexDirection: 'row', margin: 5}}>
                                    <View style={{flex:1}}>
                                        <View   style={{flex: 1}}><Text style={{ fontSize: 11, fontFamily: 'Poppins-SemiBold'}}>Prix Unitaire</Text></View>
                                        <View   style={{flex: 1}}><Text style={{ fontSize: 15,fontFamily: 'Poppins-SemiBold', color: colors.bgPrimary}}>{this.state.price} Dh</Text></View>
                                    </View>
                                    <View style={{width:100, flexDirection: 'row', borderWidth: 1, borderColor: '#CCCCCC', borderRadius:5, alignItems: 'center', justifyContent: 'center'}}>
                                        <TouchableOpacity style={{flex:1,alignItems: 'center', justifyContent: 'center'}} onPress={this.subCount} >
                                            <View ><Text>-</Text></View>
                                        </TouchableOpacity>
                                        <View style={{flex:1,alignItems: 'center', justifyContent: 'center'}}><Text>{this.state.menu.count}</Text></View>
                                        <TouchableOpacity style={{flex:1,alignItems: 'center', justifyContent: 'center'}} onPress={this.addCount}>
                                            <View ><Text>+</Text></View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={{margin: 5}}>
                                <View style={{flex: 1}}>
                                </View>
                                <View style={{flex: 1}}><Text style={{ fontFamily: 'Poppins-Regular'}}>Retrouvez sa recette unique : un steak haché 100% pur boeuf*, trois tranches d'emmental fondu, deux rondelles de tomate, de la salade, des oignons frais et une délicieuse sauce au goût grillé.</Text></View>
                                <List list={list1} />
                                <List list={list2} />
                                <List list={list3} />
                            </View>
                        </ScrollView>
                    </View>
                    <View style={{height:110, alignItems: 'center', justifyContent: 'center', marginBottom:50}}>
                        <View style={{flex:1}}><Text style={{ fontSize: 15, padding: 10,fontFamily: 'Poppins-Medium',}}>Total</Text></View>
                        <View style={{flex:1}}><Text style={{ fontSize: 25,fontFamily: 'Poppins-Medium', color: colors.bgPrimary}}>{this.state.menu.count * this.state.menu.price} Dh</Text></View>
                        <View style={{flex:1}}>
                            <CustomActionButton
                                onPress={() => this.addToCart()}
                                style={[styles.loginButtons, { borderColor: colors.bgError }]}
                            >
                                <Text style={{ color: "white",fontFamily: 'Poppins-SemiBold' }}>Add to Cart</Text>
                            </CustomActionButton>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        addressBook: state.addressBook

    };
};

const mapDispatchToProps = dispatch => {
    return {
        addToCartDispatcher: item => dispatch({type: "ADD_TO_CART", item:item})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F2F2F2'
    },
    backgroundContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    backdrop: {
        flex:1,
        flexDirection: 'column'
    },
    headline: {
        fontSize: 18,
        textAlign: 'center',
        backgroundColor: 'black',
        color: 'white'
    },
    cardHeader: {
        flex: 1,
        justifyContent: 'center',
        borderWidth: 0.4,
        borderColor: 'white',
        borderRadius: 8,
        backgroundColor: 'white',
        padding: 15,
        marginLeft: 20,
        marginBottom: 20,
        marginRight: 20,
        marginTop: -20,
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    menuCard: {
        flex: 1,
        justifyContent: 'center',
        borderWidth: 0.4,
        borderColor: 'white',
        borderRadius: 8,
        backgroundColor: 'white',
        padding: 15,
        marginLeft: 20,
        marginBottom: 10,
        marginRight: 20,
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    loginButtons: {
        borderRadius: 8,
        backgroundColor: colors.bgPrimary,
        marginTop: 10,
        marginBottom: 10,
        width: 200
    },
    background: {
        paddingBottom: 40,
            paddingTop: 96,
            paddingHorizontal: 32,
            backgroundColor: Colors.lighter,
    },
    logo: {
        opacity: 0.2,
        overflow: 'visible',
        resizeMode: 'cover',marginLeft: -128,
        marginBottom: -192,
    },
    text: {
        fontSize: 40,
            fontWeight: '600',
            textAlign: 'center',
            color: Colors.black,
    }
});
