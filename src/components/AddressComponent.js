import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Modal, Button} from 'react-native';
import {stringify} from "javascript-stringify";
import {useSelector, useDispatch} from 'react-redux';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {googlePlacesAPI} from '../../config/config'
import colors from '../../assets/colors'
import AsyncStorage from '@react-native-community/async-storage';
import {string} from "react-native-redash";

navigator.geolocation = require('@react-native-community/geolocation');
const emptyAddress = 'Choisissez une adresse de livraison ';

let addressOnModal = '';
const AddressComponent = props => {
    const cachedAddress = useSelector(state => state.addressBook.currentAddress);
    const [modalVisible, setModalVisible] = useState(false);
    const [address, setAddress] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('## Address from redux : '+stringify(cachedAddress));
        setAddress(cachedAddress.address);
    }, [cachedAddress])


    // On result row Pressed
    const onPressAddress = () => {
        console.log('Address Modal is now Visible');
        setModalVisible(true);
    };

    let addressDetails = {address: address, location: {}};

    const saveAddress = (savedAddress) => {
        if (savedAddress.length > 1) {
            setAddress(() => savedAddress);
            setAddressLocal(savedAddress).then(()=>{console.log('# ADDRESS saved to LOCAL')});
        }
    }
    const setAddressLocal = async (savedAddress) => {
        try{
            dispatch({type: 'SET_CURRENT_ADDRESS', address: savedAddress});
            await AsyncStorage.setItem('currentAddress',savedAddress)
        }
        catch(err) {
            console.log(err);
        }


    }
    console.log("## Function body running");
    return (
        <View
            style={{
                paddingTop: 15,
                paddingBottom:10,
                backgroundColor:colors.logoColor,
                textColor:'white',
                borderBottomRightRadius:30,
                borderBottomLeftRadius:30

            }}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text
                    style={{
                        fontSize: 20,
                        textDecorationLine: 'underline',
                        paddingLeft: 30,
                        paddingRight: 30,
                        color:'white'

                    }}
                      numberOfLines={1}
                      onPress={onPressAddress}>{address ? address : emptyAddress}</Text>
            </View>
            <Modal
                visible={modalVisible}
                animationType="fade"
                transparent={true}
                onRequestClose={() => {
                    setModalVisible(false);
                    //alert("Modal has been closed.");
                }}
            >
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View
                        style={{
                            backgroundColor: 'white',
                            borderWidth: 1,
                            height: 210,
                            width: 300,
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            overflow: 'hidden',
                        }}>
                        {/*  <TextInput style={{position:'absolute',zIndex:1,height:45,width:'100%'}} onChangeText={}>

                        </TextInput>*/}
                        <GooglePlacesAutocomplete
                            placeholder="Saisir votre adresse ici"
                            currentLocation={true}
                            getDefaultValue={() => addressOnModal}
                            minLength={2}
                            currentLocationLabel="Nearby places"
                            returnKeyType={'search'}
                            query={{
                                key: googlePlacesAPI,
                                language: 'fr', // language of the results
                                types: 'address',
                            }}
                            enablePoweredByContainer={false}
                            nearbyPlacesAPI="GoogleReverseGeocoding"
                            onPress={(data, details = null) => {
                                // 'details' is provided when fetchDetails = true
                                if (data.formatted_address) {
                                    addressDetails.address = data.formatted_address;
                                } else if (data.description) {
                                    addressDetails.address = data.description;
                                }
                                if (data.geometry) {
                                    addressDetails.location = data.geometry.location;
                                }
                                addressOnModal = addressDetails.address;
                                console.log(stringify("Address on Modal: " + addressOnModal))
                            }}
                            textInputProps=
                                {{
                                    onChangeText: (text) => {
                                        addressOnModal = text;
                                    }
                                }}
                        />
                        <View
                            style={{
                                flexDirection: 'row'
                            }}>
                            <View style={{width: '50%', borderWidth: 1, borderColor: 'white'}}>
                                <Button
                                    onPress={() => {
                                        setModalVisible(false);
                                        saveAddress(addressOnModal);
                                    }}
                                    title="Valider"
                                />
                            </View>
                            <View style={{width: '50%', borderWidth: 1, borderColor: 'white'}}>
                                <Button
                                    onPress={() => setModalVisible(false)}
                                    title="Annuler"
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default AddressComponent;
