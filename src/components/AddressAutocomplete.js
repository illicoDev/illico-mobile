import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Modal, Button, PixelRatio} from 'react-native';
import {stringify} from "javascript-stringify";
import {useSelector, useDispatch} from 'react-redux';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {googlePlacesAPI} from '../../config/config'
import colors from '../../assets/colors'
import AsyncStorage from '@react-native-community/async-storage';
import {string} from "react-native-redash";
import LocationPicker from "./LocationPicker";
import Icon from "react-native-vector-icons/MaterialIcons";
import CustomActionButton from "./CustomActionButton";



const homePlace = {
    description: 'Rue Dixmude,Maarif',
    additionalInfo:'Residence ABC , Appart 1 ',
    geometry: { location: { latitude: 48.8152937, longitude: 2.4597668 } },
};
const workPlace = {
    description: '42, Abdelmoumen',
    additionalInfo:'Residence Al amal, Appart 1',
    geometry: { location: { latitude: 48.8496818, longitude: 2.2940881 } },
};


navigator.geolocation = require('@react-native-community/geolocation');
const emptyAddress = 'Choisissez une adresse de livraison ';
let addressOnModal = '';
let additionalInfoOnModal = '';
let coordsOnModal = {};

let defaultToCurrentLocation = true;
class AddressAutocomplete extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            mapModalVisible:false
        }
    }

    componentDidMount = () => {
        if(this.props.ref != null){
            this.props.ref(this);
        }
        coordsOnModal=this.props.currentCoords;
    }

    toggleMapModalVisible = () => {
        this.setState(()=>{return{mapModalVisible:!this.state.mapModalVisible}})
    }
    getModalAddress=()=>{
        return addressOnModal;
    }

    renderCityCountry = (rowData) =>{
        if(rowData.address_components){
            let comps = rowData.address_components.filter((addressComp)=>{
                let type = addressComp.types.filter((type)=>type==='locality'||type==='country');
                return type.length>0?true:false;
            })
            let result = comps?comps.reduce( (acc,addressComp) => acc + ' ,'+addressComp.long_name,''):''
            result = result.substring(2);
            return result;
            //return 'row'
        }else if(rowData.structured_formatting.secondary_text){
            return rowData.structured_formatting.secondary_text;
        }
    }
    renderRowResult=(rowData)=>{
        return (
            rowData.isPredefinedPlace?
                <View style={{
                    flexDirection:'row',
                    height:'100%',
                    justifyItems:'center',
                    alignItems: 'center'
                }}>
                    <Icon name="history" size={30}/>
                    <View style={{
                        paddingLeft: 20
                    }}>
                        <Text numberOfLines={1}
                              style={{
                            fontSize: 20
                        }}>
                            {this.googlePlacesAC._renderDescription(rowData)}</Text>
                        <Text>{rowData.additionalInfo}</Text>
                    </View>

                </View>
                :
                <View style={{
                    flexDirection:'row',
                    height:'100%',
                    justifyItems:'center',
                    alignItems: 'center'
                }}>
                    {rowData.geometry?
                        <Icon name="location-on" size={30}/>
                        :<Icon name="location-off" size={30}/>}
                    <View style={{
                        paddingLeft: 20
                    }}>
                        <Text numberOfLines={1}
                            style={{
                            fontSize: 20
                        }}>{this.googlePlacesAC._renderDescription(rowData)}</Text>
                        <Text>{this.renderCityCountry(rowData)}</Text>
                    </View>
                </View>
        )
    }
    // renderRowText=(rowData)=>{
    //     return (
    //
    //     )
    // }

    render(){
        return (
            <View
                style={{
                    backgroundColor: 'white',
                    // borderWidth: 1,
                    flex:1,
                    // width: 300,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    // overflow: 'hidden',
                }}>
                <GooglePlacesAutocomplete
                    styles={{
                        container: {
                            flex: 1,
                        },
                        textInputContainer: {
                            backgroundColor: 'white',
                            height: 60,
                            borderTopColor: '#7e7e7e',
                            borderBottomColor: '#b5b5b5',
                            borderTopWidth: 1 / PixelRatio.get(),
                            borderBottomWidth: 1 / PixelRatio.get(),
                            flexDirection: 'row',
                        },
                        textInput: {
                            backgroundColor: '#FFFFFF',
                            height: 45,
                            borderRadius: 5,
                            paddingTop: 4.5,
                            paddingBottom: 4.5,
                            paddingLeft: 10,
                            paddingRight: 10,
                            marginTop: 7.5,
                            marginLeft: 8,
                            marginRight: 8,
                            fontSize: 20,
                            flex: 1,
                        },
                        poweredContainer: {
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            backgroundColor: '#FFFFFF',
                        },
                        powered: {},
                        listView: {},
                        row: {
                            padding: 13,
                            height: 65,
                            flexDirection: 'row',
                        },
                        separator: {
                            height: StyleSheet.hairlineWidth,
                            backgroundColor: '#c8c7cc',
                        },
                        description: {},
                        loader: {
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            height: 20,
                        },

                    }}
                    renderRow={(rowData)=>{
                        return (
                        <View
                            style={[
                                //this.props.suppressDefaultStyles ? {} : defaultStyles.description,
                                //this.props.styles.description,
                                // rowData.isPredefinedPlace
                                //     ? this.props.styles.predefinedPlacesDescription
                                //     : {},
                                {
                                    //height:30,
                                }
                            ]}
                            //numberOfLines={this.props.numberOfLines}
                        >
                            {this.renderRowResult(rowData)}


                        </View>)}}

                    suppressDefaultStyles={true}
                    autoFocus={true}
                    predefinedPlaces={[homePlace, workPlace]}
                    ref={(ref) => this.googlePlacesAC=ref }
                    placeholder="Saisir votre adresse ici"
                    predefinedPlacesAlwaysVisible={true}
                    currentLocation={true}
                    //getDefaultValue={()=>this.props.address}
                    minLength={3}
                    currentLocationLabel="Nearby places"
                    returnKeyType={'search'}
                    query={{
                        key: googlePlacesAPI,
                        language: 'fr', // language of the results
                        types: 'address',
                    }}
                    isRowScrollable={true}
                    enablePoweredByContainer={false}
                    nearbyPlacesAPI="GoogleReverseGeocoding"
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log(data);

                        coordsOnModal={};
                        let tmpAddress;
                        let tmpAdditionalInfo;
                        let tmpCoords = {};
                        if (data.formatted_address) {
                            tmpAddress = data.formatted_address;
                        } else if (data.description) {
                            tmpAddress = data.description;
                        }
                        if(data.geometry&&data.geometry.location){
                            if(data.geometry.location.latitude&&data.geometry.location.longitude){
                                tmpCoords = data.geometry.location;

                                data.additionalInfo?tmpAdditionalInfo=data.additionalInfo:tmpAdditionalInfo
                            }
                            else if(data.geometry.location.lat&&data.geometry.location.lng){
                                tmpCoords = {latitude:data.geometry.location.lat,longitude:data.geometry.location.lng}
                            }

                        }
                        addressOnModal = tmpAddress;
                        additionalInfoOnModal = tmpAdditionalInfo;
                        coordsOnModal = tmpCoords;
                        if(coordsOnModal.latitude&&coordsOnModal.longitude){
                            defaultToCurrentLocation=false;
                            this.toggleMapModalVisible();
                        }


                        console.log(stringify("Address on Modal: " + addressOnModal))
                    }}
                    textInputProps=
                        {{
                            onChangeText: (text) => {
                                addressOnModal = text;
                            }
                        }}
                />

                <View style={{justifyContent:'flex-end',height:50,marginBottom:5,alignItems:'center',borderTopWidth: 1,borderTopColor: '#00000050'}}>
                    <CustomActionButton
                        style={{
                            width: 200,
                            backgroundColor: 'none',
                            marginBottom: 1,
                            //marginTop: 10,
                            borderRadius: 20,

                            //borderWidth:2
                        }}
                        onPress={() => {
                            defaultToCurrentLocation=true;
                            this.toggleMapModalVisible();
                        }}
                    >
                        <Text style={{ color: '#3BC14A',fontFamily: 'Poppins-SemiBold',fontSize:16}}>Montrer sur la map</Text>
                    </CustomActionButton>
                    {/*<Button style={{borderRadius:50}} onPress={()=>console.log('do stupid shit')} title='Confirmer Adresse'/>*/}

                </View>
                <Modal
                    visible={this.state.mapModalVisible}
                    onRequestClose={() => {
                        this.toggleMapModalVisible();
                        this.googlePlacesAC.setAddressText('');
                        this.googlePlacesAC.triggerFocus();
                    }}>
                    <View style={{height:'100%'}}>
                        <LocationPicker
                            //ref={(map) => {this.locationPicker=map;}}
                            //style={{height:300}}
                            updateAddressOnMarkerChange={true}
                            // hideModal={this.toggleMapAddressModalVisible()}

                            defaultToCurrentLocation={defaultToCurrentLocation}
                            setDeliveryAddress={this.props.setDeliveryAddress}
                            currentAddress={addressOnModal}
                            currentAdditionalInfo={additionalInfoOnModal}
                            currentCoords={coordsOnModal} />
                    </View>
                </Modal>
            </View>
        );
    }
};

export default AddressAutocomplete;
