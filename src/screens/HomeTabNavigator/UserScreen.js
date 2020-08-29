import React, {Component} from 'react';
import {View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import colors from "../../assets/colors";
import auth from "@react-native-firebase/auth";
import AddressModalRouter from "../../components/AddressModalRouter";
import firestore from "@react-native-firebase/firestore";

class UserScreen extends Component {
    signOut = async () => {
        try {
            await auth().signOut();
            this.props.signOut();
            // this.props.navigation.navigate('WelcomeScreen');
        } catch (error) {
            alert("Erreur : Impossible de se déconnecter");
        }
    };
    constructor() {
        super();
        this.state = {
            currentUser: {},
            addresses: {
                deliveryAddress:{
                    address:null,
                    coords:{latitude:null,longitude:null},
                    additionalInfo:null,
                },
                pickupAddress:{
                    address:null,
                    coords:{latitude:null,longitude:null},
                    additionalInfo:null,
                },
            }
        };
    }

    componentDidMount() {
        this.setState((currentState) => {
            return {...currentState, addresses:{...this.props.currentUser.addresses}}
        });
        //console.log("hhhhhh");

        this.deliveryAddressModalRouter = React.createRef();
        this.pickupAddressModalRouter = React.createRef();
    }

    toggleDeliveryAddressModalRouterActive = () => {
        this.deliveryAddressModalRouter.current.toggleChooseAddressModalVisible();
    }
    togglePickupAddressModalRouterActive = () => {
        this.pickupAddressModalRouter.current.toggleChooseAddressModalVisible();
    }
    setDeliveryAddress = (address,additionalInfo,coords) => {
        this.setState((currentState) => {
            return {
                ...currentState,
                addresses: {
                        ...currentState.addresses,
                        deliveryAddress:{coords:coords,address:address,additionalInfo:additionalInfo}
                }} });
        this.props.setDeliveryAddress({coords:coords,address:address,additionalInfo:additionalInfo});
        firestore().collection('users')
            .doc(this.props.auth.currentUser.uid)
            .set(
                {addresses:
                        {deliveryAddress:{
                                address:address,
                                coords:coords,
                                additionalInfo:additionalInfo

                            }}}
                ,{ merge: true });
    }
    setPickupAddress = (address,additionalInfo,coords) => {
        this.setState((currentState) => {
            return {
                ...currentState,
                addresses: {
                    ...currentState.addresses,
                    pickupAddress:{coords:coords,address:address,additionalInfo:additionalInfo}
                }} });
        this.props.setPickupAddress({coords:coords,address:address,additionalInfo:additionalInfo});
        firestore().collection('users')
            .doc(this.props.auth.currentUser.uid)
            .set(
                {addresses:
                        {pickupAddress:{
                                address:address,
                                coords:coords,
                                additionalInfo:additionalInfo

                            }}}
                ,{ merge: true });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex:1}}>
                    <View style={{flex:1}}>
                        <SafeAreaView style={{flex:1}}>
                            <AddressModalRouter
                                ref={this.deliveryAddressModalRouter}
                                setAddress={this.setDeliveryAddress}
                                chooseModalTitle={"Adresse de Livraison"}
                            />
                            <AddressModalRouter
                                ref={this.pickupAddressModalRouter}
                                setAddress={this.setPickupAddress}
                                chooseModalTitle={"Adresse de Recupération"}
                            />
                            <ScrollView>
                                <View style={{margin: 5}}>
                                    <Text style={{marginTop:15, marginLeft: 15, marginBottom: 15, fontFamily: 'Poppins-Bold', fontSize: 18}}>Votre Profil</Text>
                                </View>
                                <View style={[styles.menuCard, {margin: 15}]}>
                                    <View style={{flex:1, flexDirection: 'row', }}>
                                        <View   style={{flex: 1}}>
                                            <View   style={{flex: 1,marginBottom: 3}}><Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 18}}>Nom Complet</Text></View>
                                            <View   style={{flex: 1, marginBottom: 5}}><Text style={{color: colors.bgPrimary}}>Modifer</Text></View>
                                            <View   style={{flex: 1, marginBottom: 5}}><Text style={{fontWeight: "bold", color:colors.bgPrimary, textAlign: 'right', alignSelf: 'stretch'}}></Text></View>
                                        </View>
                                    </View>
                                    <View style={{borderBottomColor: '#D8D8D8', borderBottomWidth: 1}}/>
                                    <Text style={{marginTop: 7, marginLeft: 7, marginBottom: 7, fontFamily: 'Poppins-Bold'}}>E-mail :</Text>
                                    <Text style={{marginLeft: 7, marginBottom: 7,color: 'grey', fontFamily: 'Poppins-Medium'}}>{this.props.currentUser.email}</Text>
                                    <View style={{borderBottomColor: '#D8D8D8', borderBottomWidth: 1}}/>
                                    <Text style={{marginTop: 7, marginLeft: 7, marginBottom: 7, fontFamily: 'Poppins-Bold'}}>Téléphone :</Text>
                                    <Text style={{marginLeft: 7, marginBottom: 7,color: 'grey', fontFamily: 'Poppins-Medium'}}>0 6 XX XX XX XX</Text>
                                    <View style={{borderBottomColor: '#D8D8D8', borderBottomWidth: 1}}/>
                                    <Text style={{marginTop: 7, marginLeft: 7, marginBottom: 7, fontFamily: 'Poppins-Bold'}}>Adresse de Récuperation :</Text>
                                    <Text style={{marginLeft: 7, marginBottom: 7,color: 'grey', fontFamily: 'Poppins-Medium'}}
                                          onPress={this.togglePickupAddressModalRouterActive}>
                                        {this.props.currentUser.addresses.pickupAddress.address}
                                    </Text>
                                    <View style={{borderBottomColor: '#D8D8D8', borderBottomWidth: 1}}/>
                                    <Text style={{marginTop: 7, marginLeft: 7, marginBottom: 7, fontFamily: 'Poppins-Bold'}}>Adresse de Livraison :</Text>
                                    <Text style={{marginLeft: 7, marginBottom: 7,color: 'grey', fontFamily: 'Poppins-Medium'}}
                                          onPress={this.toggleDeliveryAddressModalRouterActive}>
                                        {this.props.currentUser.addresses.deliveryAddress.address}
                                    </Text>


                                    <TouchableOpacity onPress={this.signOut} style={{marginTop: 50, marginBottom: 15}}>
                                        <Text style={{fontSize: 18,color: 'red',fontFamily: 'Poppins-Bold'}}>Se Déconnecter</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </SafeAreaView>
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2'
    },
    cardContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"baseline",
        padding:20
    },
    totalContainer:{
        flex:1,
        flexDirection:"row",
        justifyContent:"space-between",
        paddingTop: 15,
        paddingLeft: 20,
        paddingRight: 20
    },
    menuCard: {
        flex: 1,
        justifyContent: 'center',
        borderWidth: 0.4,
        borderColor: 'white',
        borderRadius: 8,
        backgroundColor: 'white',
        padding: 15,
        marginBottom: 10,
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    }
});
const mapStateToProps = state => {
    return {
        currentUser: state.auth
    };
};
const mapDispatchToProps = dispatch => {
    return {
        signOut: () => dispatch({ type: "SIGN_OUT" }),
        setDeliveryAddress: location => dispatch({type: "SET_DELIVERY_ADDRESS", payload:location}),
        setPickupAddress: location => dispatch({type: "SET_PICKUP_ADDRESS", payload:location}),
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(UserScreen);
