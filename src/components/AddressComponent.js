import React, {useState} from 'react';
import {View, Text, StyleSheet, Modal, Button} from 'react-native';
import { stringify } from "javascript-stringify";

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import LogBoxButton from 'react-native/Libraries/LogBox/UI/LogBoxButton';
import {TextInput} from "react-native-paper";

navigator.geolocation = require('@react-native-community/geolocation');
const emptyAddress = 'Choisissez une adresse de livraison ';

const AddressComponent = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [address, setAddress] = useState('');
    const [addressOnModal, setAddressOnModal] = useState('');
    const [isAddressSet, setIsAddressSet] = useState(false);

    // On result row Pressed
    const onPressAddress = () => {
        console.log('Address Modal is now Visible');
        setModalVisible(true);
    };
    //
    const onChangeModalAddress = () => { }
    const renderModalAddress = () => {return isAddressSet?address:""}

    let addressDetails={address:address,location:{}};

    return (
        <View
            style={{
                marginTop:20
            }}>
            <View
                style={{
                    flexDirection:'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Text style={{ fontSize: 20, textDecorationLine:'underline', paddingLeft:20, paddingRight:20 }}
                      numberOfLines={1}
                      onPress={onPressAddress}>{isAddressSet?address:emptyAddress}</Text>
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
                            backgroundColor:'white',
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
                            getDefaultValue={renderModalAddress}
                            minLength={2}
                            currentLocationLabel="Nearby places"
                            returnKeyType={'search'}
                            query={{
                                key: 'AIzaSyB7G7hGU8j-x_cE8oUX5drtfCHGMuqTCpU',
                                language: 'fr', // language of the results
                                types: 'address',
                            }}
                            enablePoweredByContainer={false}
                            nearbyPlacesAPI="GoogleReverseGeocoding"
                            onPress={(data, details = null) => {
                                // 'details' is provided when fetchDetails = true
                                console.log(data, details);

                                if(data.formatted_address){addressDetails.address = data.formatted_address;}
                                else if(data.description){addressDetails.address = data.description;}

                                if(data.geometry){addressDetails.location = data.geometry.location;}
                                setAddressOnModal(()=>addressDetails.address);
                                console.log(stringify(addressDetails))
                                console.log(stringify(addressOnModal))
                            }}
                            textInputProps=
                                {{
                                    onChangeText:(text)=>{setAddressOnModal(()=>text);}
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
                                        console.log("Address in modal field : " + addressOnModal);
                                        console.log("Address in field : " + address);

                                        if(addressOnModal.length <= 1){ setIsAddressSet(false); }
                                        else{ setAddress(()=>addressOnModal); setIsAddressSet(true);}
                                        console.log(stringify(addressDetails))

                                        //setAddress(addressDetails.address);
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
