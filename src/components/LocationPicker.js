import React from 'react'
import { Image, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Modal} from 'react-native'
import MapView from 'react-native-maps'

import marker from '../../assets/icons8-marker.png'
import {stringify} from "javascript-stringify";
import firestore from "@react-native-firebase/firestore";
import {snapshotToArray} from "../helpers/firebaseHelpers";
import Geocoder from 'react-native-geocoding';
import {googlePlacesAPI,mapStyle} from '../../config/config'
import Icon from "react-native-vector-icons/MaterialIcons";
import CustomActionButton from "./CustomActionButton";
import FullScreenInputModal from "./FullScreenInputModal";


const latitudeDelta = 0.005
const longitudeDelta = 0.005

navigator.geolocation = require('@react-native-community/geolocation');

export default class LocationPicker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitudeDelta,
        longitudeDelta,
        latitude: this.props.currentCoords.latitude?this.props.currentCoords.latitude:33.585107,
        longitude: this.props.currentCoords.longitude?this.props.currentCoords.longitude:-7.623688},
      address:this.props.currentAddress?this.props.currentAddress:null,
      additionalInfo:this.props.currentAdditionalInfo?this.props.currentAdditionalInfo:null,
      additionalInfoModalVisible:false,
    }

    Geocoder.init(googlePlacesAPI);
  }

  componentDidMount() {
    if(this.props.ref!=null){
      this.props.ref(this);
    }
    if(this.props.defaultToCurrentLocation)
    {
        this.setRegionToCurrentPosition();
    }
  }

  toggleAdditionalInfoModalVisible = () => {
    this.setState((currentState) => {
      return {additionalInfoModalVisible: !currentState.additionalInfoModalVisible}
    });
  };

  setAdditionalInfo = (newAdditionalInfo) =>{
    this.setState(()=> {
      return {additionalInfo:newAdditionalInfo}
    })
  }

  setDeliveryAddress = () => {
      this.props.setDeliveryAddress(this.state.address,this.state.additionalInfo,this.state.region);
      //this.props.hideModal();
  }

  onRegionChange = region => {
    this.setState(()=>{return{region:region}});
    Geocoder.from(region)
          .then((json)=>{
            this.setState((oldState)=>{return {...oldState,address:json.results[0].formatted_address}})
            console.log(" myjson "+stringify(json.results[0].formatted_address))})
          .catch(error => console.log(error.message));
  }

  getRegion = () => {return this.region;}

  setRegionToCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(
        position => {
          let currentPosition = {region:{
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta,
              longitudeDelta
          }};
          this.setState(currentPosition);
          if(this.state.region.latitude && this.state.region.longitude){
            this.map.animateToRegion(this.state.region)}
          },
        error => console.log(error.message),
        {enableHighAccuracy: true, timeout: 10000, maximumAge: 60000});
  }

  render() {
    const { region } = this.state

    return (
        <View style={{height:'100%'}}>
          <View style={styles.map}>
            <MapView
              ref={(map) => { this.map = map; }}
              customMapStyle={mapStyle}
              style={styles.map}
              initialRegion={this.state.region}
              showsUserLocation = {true}
              onRegionChangeComplete={this.onRegionChange}
            />
            <View style={styles.markerFixed}>
              <Image style={styles.marker} source={marker} />
            </View>
            {/*<SafeAreaView style={styles.footer}>*/}
            {/*  <Text style={styles.region}>{JSON.stringify(region, null, 2)}</Text>*/}
            {/*</SafeAreaView>*/}
          </View>
          <View elevation={10}
                style={{
                  flex:1,
                }}>
            <View>
              <View style={{
                flexDirection:'row',
                justifyItems:'center',
                alignItems: 'center',
                height:60,
                //borderTopWidth:1,
                borderBottomWidth:1,
              }}>
                <Icon style={{paddingLeft:20,width:'15%'}} name="location-on" color={'#3BC14A'} size={30}/>
                <View style={{width:'70%',paddingLeft:10}}>
                  <Text numberOfLines={2}>{this.state.address}</Text>
                </View>
                <Icon style={{width:'15%'}} name="navigate-next" color={'grey'} size={30}/>

              </View>
              <TouchableOpacity
                  activeOpacity={.7}
                  onPress={()=>{this.toggleAdditionalInfoModalVisible()}}
                  style={{
                    flexDirection:'row',
                    justifyItems:'center',
                    alignItems: 'center',
                    height:60,
                    borderBottomWidth:1,
              }}>
                <Icon style={{paddingLeft:20,width:'15%'}} name="location-on" color={'#3BC14A'} size={30}/>
                <View style={{width:'70%',paddingLeft:10}}>
                {this.state.additionalInfo?
                    <Text
                        numberOfLines={2}
                        style={{
                        }}>
                      {this.state.additionalInfo}</Text>
                    :
                    <Text
                        style={{
                          opacity:.5
                      }}>Immeuble, etage, porte...</Text>}
                </View>
                <Icon style={{width:'15%'}} name="navigate-next" size={30}/>
              </TouchableOpacity>
              <View>


              </View>
            </View>
            <View style={{justifyContent:'flex-end',flex:1,marginBottom:5,alignItems:'center'}}>
              <CustomActionButton
                  style={{
                    width: 300,
                    backgroundColor: '#3BC14A',
                    marginBottom: 10,
                    marginTop: 10,
                    borderRadius: 20,
                  }}
                  onPress={() => {
                      this.setDeliveryAddress();
                  }}
              >
                <Text style={{ color: "white",fontFamily: 'Poppins-SemiBold' }}>Confirmer l'adresse</Text>
              </CustomActionButton>
              {/*<Button style={{borderRadius:50}} onPress={()=>console.log('do stupid shit')} title='Confirmer Adresse'/>*/}

            </View>
          </View>
          <FullScreenInputModal
              toggleVisibility={this.toggleAdditionalInfoModalVisible}
              submitText={this.setAdditionalInfo}
              isVisible={this.state.additionalInfoModalVisible}
              placeholderText={'Immeuble, etage, porte...'}
              currentText={''}
              headerText={'Detail'}
              charLimit={{}}/>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 2,
  },
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%'
  },
  marker: {
    height: 48,
    width: 48
  },
  footer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    bottom: 0,
    position: 'absolute',
    width: '100%'
  },
  region: {
    color: '#fff',
    lineHeight: 20,
    margin: 20
  }
})
