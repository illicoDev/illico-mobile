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

        this.setState(()=>{
            return {chooseAddressModalVisible:false,
                addAddressModalVisible:false,
                mapAddressModalVisible:false}});

        redux?this.setDeliveryAddressOnRedux():console.log();
        localStorage?this.setDeliveryAddressOnDevice():console.log();
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
                    }}>
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
                          onPress={this.toggleChooseAddressModalVisible}>{this.state.address ? this.state.address : emptyAddress}</Text>
                </View>

                {/*Choose a delivery address*/}
                <Modal
                    transparent={true}
                    animationType="fade"
                    visible={this.state.chooseAddressModalVisible}
                    style={{
                        height:'100%',
                    }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{
                            flex:1,
                            flexDirection:'column',
                            justifyContent:'center',
                            alignItems:'center',
                            backgroundColor:'#00000099'}}
                        onPress={()=>this.toggleChooseAddressModalVisible()}
                    >
                        <TouchableWithoutFeedback>
                            <View
                                style={{
                                    height:160,
                                    width:300,
                                    borderWidth:1,
                                    backgroundColor:'white'
                            }}>
                                <Text style={{
                                    fontFamily: 'Poppins-SemiBold',
                                    fontSize: 20,
                                    textAlign: 'center',
                                    borderBottomWidth: 1,
                                    borderColor: 'rgba(158, 150, 150, .5)',
                                    paddingBottom: 10,
                                    paddingTop: 10
                                }}>Choose a delivery address</Text>

                                <Text onPress={this.toggleMapAddressModalVisible} style={{
                                    height:50,
                                    fontFamily:'Poppins-Light',
                                    fontSize: 20,
                                    padding:5,
                                    paddingTop:8,
                                    borderBottomWidth:1,
                                    borderColor: 'rgba(158, 150, 150, .5)'
                                }}>
                                    <Icon name="location-outline" size={25} color="black" style={{marginLeft:10}}/>
                                    <Text>  Current location</Text>
                                </Text>
                                <Text onPress={this.toggleAddAddressModalVisible} style={{
                                    height:50,
                                    fontFamily:'Poppins-Light',
                                    fontSize: 20,
                                    padding:5,
                                    paddingTop:8,
                                }}>
                                    <Icon name="add-circle-outline" size={25} color="black" onPress={()=>console.log('ggggggg')}/>
                                    <Text>  Add an address</Text>
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </TouchableOpacity>
                </Modal>

                {/*Modal places*/}
                <Modal
                    visible={this.state.addAddressModalVisible}
                    animationType="fade"
                    transparent={true}
                    onRequestClose={() => {
                        this.toggleAddAddressModalVisible();
                    }}
                >
                    <View
                        style={{
                            backgroundColor:'white',
                            flex:1
                        }}>
                        <View
                            style={{
                                height:50,
                                flexDirection: 'row',
                            }}>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={()=>this.toggleAddAddressModalVisible()}
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width:'20%'
                                }}>
                                <Icon name="return-up-back" size={40} color="black" />
                            </TouchableOpacity>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width:'65%',
                            }}>
                                <Text
                                    style={{
                                        fontSize: 20,
                                    }}>
                                    Enter Address
                                </Text>
                            </View>
                        </View>
                        <AddressAutocomplete
                            ref={(map) => {this.addressAC=map;}}
                            address={this.state.address}
                            toggleAddressModal={this.toggleAddAddressModalVisible}

                            // for the map modal inside
                            setDeliveryAddress={this.setDeliveryAddress}
                            currentCoords={this.state.coords}
                        />

                    </View>
                    {/*<View*/}
                    {/*    style={{*/}
                    {/*        flexDirection: 'row'*/}
                    {/*    }}>*/}
                    {/*    <View style={{width: '50%', borderWidth: 1, borderColor: 'white'}}>*/}
                    {/*        <Button*/}
                    {/*            onPress={this.onValidateAddress}*/}
                    {/*            title="Valider"*/}
                    {/*        />*/}
                    {/*    </View>*/}
                    {/*    <View style={{width: '50%', borderWidth: 1, borderColor: 'white'}}>*/}
                    {/*        <Button*/}
                    {/*            onPress={() => this.toggleAddAddressModalVisible()}*/}
                    {/*            title="Annuler"*/}

                    {/*        />*/}
                    {/*    </View>*/}
                    {/*</View>*/}
                </Modal>

                {/*maps modal*/}
                <Modal
                    visible={this.state.mapAddressModalVisible}
                    onRequestClose={() => {
                        this.toggleMapAddressModalVisible();

                }}>
                    <View style={{height:'100%'}}>
                        <LocationPicker
                            //ref={(map) => {this.locationPicker=map;}}
                            //style={{height:300}}
                            defaultToCurrentLocation={true}
                           // hideModal={this.toggleMapAddressModalVisible()}

                            setDeliveryAddress={this.setDeliveryAddress}
                            currentCoords={this.state.coords} />
                    </View>
                </Modal>
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

export default connect(mapStateToProps,mapDispatchToProps)(AddressComponent)
