import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    FlatList,
    TouchableOpacity,
    TouchableHighlight,
    ImageBackground,
    Dimensions,
    Alert
} from 'react-native';
import Modal from "react-native-modal";
import colors from "../../assets/colors";
import CustomActionButton from "../../components/CustomActionButton";
import List from "../../components/accordion/List";
import Colors from "react-native/Libraries/NewAppScreen/components/Colors";
import {connect} from "react-redux";
import {elementsToOrderList} from "../../helpers/firebaseHelpers";
import uuid from 'react-native-uuid';

const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;

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
        this.state = {
            modalVisible: false,
            menuItem: {},
            menu: {
            }
        };
    }

    componentDidMount() {
    this.setState({menuItem : this.props.menu })
}

    addToCart = async (selectedItem) => {
        try {
            let generatedUUID = uuid.v1();
            let elementsToCart = elementsToOrderList(selectedItem.elements);
            let newPrice = selectedItem.price + selectedItem.supp;
            await this.props.addToCart({...selectedItem, uid : generatedUUID, elements: elementsToCart, price: newPrice });
            this.props.navigation.pop();
        } catch (error) {
            console.log(error);
        }
    };

    subCount = () => {
        if(this.state.menuItem.qte > 0){
            let oldCount = this.state.menuItem.qte;
            let oldPrice = this.state.menuItem.price;
            let priceAdded = this.state.menuItem.UnitPrice;
            this.setState(state => ({
                menuItem : {...state.menuItem, qte: oldCount - 1, price:  oldPrice - priceAdded },
            }));
        }
    };
    addCount = () => {
        let oldCount = this.state.menuItem.qte;
        let oldPrice = this.state.menuItem.price;
        let priceAdded = this.state.menuItem.UnitPrice;
            this.setState(state => ({
                menuItem : {...state.menuItem, qte: oldCount + 1,price:  oldPrice + priceAdded },
            }));
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
        this.setState(state => ({
            menuItem : {...state.menuItem, supp: supplements },
        }));
    };*/
    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    };
    render() {
        //console.log(this.props.menu);
        //console.log(this.state.menuItem);
        const { modalVisible } = this.state;
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
                                <Text style={[styles.text, {fontFamily: 'Poppins-Bold'}]}>{this.state.menuItem.title}</Text>
                            </ImageBackground>
                            <View style={styles.cardHeader}>
                                <View style={{flex:1, flexDirection: 'row', margin: 5}}>
                                    <View style={{flex:1}}>
                                        <View   style={{flex: 1}}><Text style={{ fontSize: 11, fontFamily: 'Poppins-SemiBold'}}>Prix Unitaire</Text></View>
                                        <View   style={{flex: 1}}><Text style={{ fontSize: 15,fontFamily: 'Poppins-SemiBold', color: colors.bgPrimary}}>{this.state.menuItem.UnitPrice} Dh</Text></View>
                                    </View>
                                    <View style={{width:100, flexDirection: 'row', borderWidth: 1, borderColor: '#CCCCCC', borderRadius:5, alignItems: 'center', justifyContent: 'center'}}>
                                        <TouchableOpacity style={{flex:1,alignItems: 'center', justifyContent: 'center'}} onPress={this.subCount}>
                                            <View ><Text>-</Text></View>
                                        </TouchableOpacity>
                                        <View style={{flex:1,alignItems: 'center', justifyContent: 'center'}}><Text>{this.state.menuItem.qte}</Text></View>
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
                                {/*<List list={list1} />
                                <List list={list2} />
                                <List list={list3} />*/}
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    data={this.props.menu.elements}
                                    keyExtractor={item => item.key}
                                    renderItem={({ item }) => {
                                        return (
                                            <List list={item} />
                                        );
                                    }}
                                />
                            </View>
                        </ScrollView>
                    </View>
                    <View style={{height:110, alignItems: 'center', justifyContent: 'center', marginBottom:50}}>
                        <View style={{flex:1}}><Text style={{ fontSize: 15, padding: 10,fontFamily: 'Poppins-Medium',}}>Total</Text></View>
                        <View style={{flex:1}}><Text style={{ fontSize: 25,fontFamily: 'Poppins-Medium', color: colors.bgPrimary}}>{this.props.menu.price + this.props.menu.supp} Dh</Text></View>
                        <View style={{flex:1}}>
                            <CustomActionButton
                                onPress={() => this.addToCart(this.state.menuItem)}
                                style={[styles.loginButtons, { borderColor: colors.bgError }]}
                            >
                                <Text style={{ color: "white",fontFamily: 'Poppins-SemiBold' }}>Ajouter au Panier</Text>
                            </CustomActionButton>
                        </View>
                    </View>

                    <Modal backdropColor='#C4C4C4' isVisible={this.state.modalVisible}>
                        <View style={styles.modalView}>
                            <View style={styles.modalContentView}>
                                <View>
                                    <ScrollView>
                                        <View>
                                            <Text style={styles.modalTitle}> Choisir l'option </Text>
                                        </View>
                                    </ScrollView>
                                    <View>
                                        <Text>THIS IS SPARTA !</Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={styles.closeBtn}
                                                    onPress={() => {
                                                        this.setModalVisible(!modalVisible);
                                                    }}
                                >
                                    <View>
                                        <Image source={require('../../../assets/img/close_pop.png')}/>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                </View>
            </View>
        );
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
        addToCart: item => dispatch({ type: "ADD_TO_CART", payload: item })
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
    },circle: {
        marginEnd: 2,
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'green'
    }, modalContentView: {
        backgroundColor: '#ffffff',
        width: screen_width * 0.95,
        borderRadius: 5,
        height: screen_height * 0.30,
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
