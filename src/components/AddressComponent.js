import React, {useRef} from 'react';
import {View, Text, StyleSheet, Modal, Button, ScrollView, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
import colors from '../../assets/colors'
import AsyncStorage from '@react-native-community/async-storage';
import firestore from '@react-native-firebase/firestore';
import Icon from "react-native-vector-icons/Ionicons";

const emptyDeliveryAddress = 'Choisissez une adresse de livraison ';
const emptyPickupAddress = 'Choisissez une adresse de récupération ';

class AddressComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state={
        }
    }

    setDeliveryAddress = (address,additionalInfo,coords) => {
        this.props.setDeliveryAddress({coords:coords,address:address,additionalInfo:additionalInfo});
        firestore().collection('users')
            .doc(this.props.auth.currentUser._user.uid)
            .update(
                {'addresses.deliveryAddress':{
                            address:address,
                            coords:coords,
                            additionalInfo:additionalInfo

                        }});
    }
    setPickupAddress = (address,additionalInfo,coords) => {
        this.props.setPickupAddress({coords:coords,address:address,additionalInfo:additionalInfo});
        firestore().collection('users')
            .doc(this.props.auth.currentUser._user.uid)
            .update(
                {'addresses.pickupAddress':{
                                address:address,
                                coords:coords,
                                additionalInfo:additionalInfo

                            }});
    }

    saveAddressOnDevice = async (savedAddress) => {
        try{
            this.props.setCurrentAddress(savedAddress);
            await AsyncStorage.setItem('currentAddress',savedAddress)
        }
        catch(err) {
            console.log(err.message);
        }
    };


    render(){
        return (
            <View
                style={{
                    paddingTop: 15,
                    paddingBottom:10,
                    backgroundColor:colors.logoColor,
                    textColor:'white',
                    borderRadius : 8

                }}>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text
                        style={{
                            fontFamily:'Poppins-SemiBold',
                            fontSize: 15,
                            // textDecorationLine: 'underline',
                            paddingLeft: 30,
                            paddingRight: 30,
                            color:'white'
                        }}
                        numberOfLines={1}
                        onPress={()=>this.props.onPickupAddressClicked()}
                    >
                        {this.props.auth.addresses.pickupAddress.address?
                            this.props.auth.addresses.pickupAddress.address
                            :emptyPickupAddress}
                    </Text>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text
                        style={{
                            fontFamily:'Poppins-SemiBold',
                            fontSize: 15,
                            // textDecorationLine: 'underline',
                            paddingLeft: 30,
                            paddingRight: 30,
                            color:'white'
                        }}
                          numberOfLines={1}
                          onPress={()=>this.props.onDeliveryAddressClicked()}
                    >
                        {this.props.auth.addresses.deliveryAddress.address?
                        this.props.auth.addresses.deliveryAddress.address
                        :emptyDeliveryAddress}
                    </Text>
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
        signIn: user => dispatch({ type: "SIGN_IN", payload: user }),
        signOut: () => dispatch({ type: "SIGN_OUT" }),
        setDeliveryAddress: location => dispatch({type: "SET_DELIVERY_ADDRESS", payload:location}),
        setPickupAddress: location => dispatch({type: "SET_PICKUP_ADDRESS", payload:location}),
    };
};

export default connect(mapStateToProps,mapDispatchToProps,null,{ forwardRef: true })(AddressComponent)
