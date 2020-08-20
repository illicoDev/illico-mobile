import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Modal, Button, ScrollView, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {stringify} from "javascript-stringify";
import {useSelector, useDispatch, connect} from 'react-redux';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {googlePlacesAPI} from '../../config/config'
import colors from '../../assets/colors'
import AsyncStorage from '@react-native-community/async-storage';
import {string} from "react-native-redash";
import LocationPicker from "./LocationPicker";
import AddressAutocomplete from "./AddressAutocomplete";
import MaterialCommunityIcons from "react-native-vector-icons";
import Icon from "react-native-vector-icons/Ionicons";

navigator.geolocation = require('@react-native-community/geolocation');
const emptyAddress = 'Choisissez une adresse de livraison ';

class AddressComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            chooseAddressModalVisible:false,
            addAddressModalVisible:false,
            mapAddressModalVisible:false,
            address:'',
            additionalInfo:null,
            coords:{longitude:null,latitude:null},
        }
    }
    componentDidMount(prevProps) {
        this.setState( currentState => {
            return{...currentState,address:this.props.addressBook.currentAddress.address};
        });
    }

    setDeliveryAddress = (address,additionalInfo,coords,redux,localStorage) => {
        coords.longitude&&coords.latitude?this.setState((currentState) => { return {coords:coords} }):console.log("NO coords");
        address?this.setState((currentState) => { return {address:address} }):console.log("NO address");
        additionalInfo?this.setState((currentState) => { return {additionalInfo:additionalInfo} }):console.log("NO additionalInfo");

        //redux?this.setDeliveryAddressOnRedux():console.log();
        //localStorage?this.setDeliveryAddressOnDevice():console.log();
    }
    setDeliveryAddressOnRedux = () => {
        //this.props.setCurrentAddress()
    }
    setDeliveryAddressOnDevice = () => {}

    saveCoords = (savedCoords) => {
        this.setDeliveryAddress(null,null,savedCoords);
    }
    saveAddress = (savedAddress) => {
        if (savedAddress.length > 1) {
            this.setDeliveryAddress(savedAddress);
            this.saveAddressOnDevice(savedAddress).then(()=>{console.log('# ADDRESS saved to LOCAL')});
        }
    };
    saveAddressOnDevice = async (savedAddress) => {
        try{
            this.props.setCurrentAddress(savedAddress);
            await AsyncStorage.setItem('currentAddress',savedAddress)
        }
        catch(err) {
            console.log(err.message);
        }
    };
    // onValidateAddress = () =>{
    //     this.toggleAddAddressModalVisible();
    //     this.saveAddress(this.addressAC.getModalAddress());
    //     this.saveCoords(this.locationPicker.getRegion());
    // };

    toggleAddAddressModalVisible = () => {
        this.setState((currentState) => {
            return {addAddressModalVisible: !currentState.addAddressModalVisible}
        });
    };
    toggleChooseAddressModalVisible = () => {
        this.setState((currentState) => {
            return {chooseAddressModalVisible: !currentState.chooseAddressModalVisible}
        });
    };
    toggleMapAddressModalVisible = () => {
        this.setState((currentState) => {
            return {mapAddressModalVisible: !currentState.mapAddressModalVisible}
        });
    };

    //addressDetails = {address: address, location: {}};

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
                          onPress={()=>this.props.onClickAction()}
                          >{this.state.address ? this.state.address : emptyAddress}</Text>
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
        setCurrentAddress: address => dispatch({type: "SET_CURRENT_ADDRESS", address:address}),
        setCurrentAdditionalInfo: additionalInfo => dispatch({type: "SET_CURRENT_ADDITIONALINFO", additionalInfo:additionalInfo}),
        setCurrentCoords: coords => dispatch({type: "SET_CURRENT_COORDS", address:address}),
    };
};

export default connect(mapStateToProps,mapDispatchToProps,null,{ forwardRef: true })(AddressComponent)
