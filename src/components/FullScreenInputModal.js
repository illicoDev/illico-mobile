import React from 'react'
import { Image, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Modal,TextInput} from 'react-native'
import MapView from 'react-native-maps'

import marker from '../../assets/icons8-marker.png'
import {stringify} from "javascript-stringify";
import firestore from "@react-native-firebase/firestore";
import {snapshotToArray} from "../helpers/firebaseHelpers";
import Geocoder from 'react-native-geocoding';
import {googlePlacesAPI} from '../../config/config'
import Icon from "react-native-vector-icons/MaterialIcons";
import CustomActionButton from "./CustomActionButton";


export default class FullScreenInputModal extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            textInputContent:this.props.currentText?this.props.currentText:''
        }
    }

    render(){
        return(
            <Modal
                visible={this.props.isVisible}
                animation={'fade'}
                onRequestClose={() => {
                    this.props.toggleVisibility();
                }}>

                <View
                    style={{
                        height:50,
                        flexDirection: 'row',
                    }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={()=>this.props.toggleVisibility()}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width:'20%'
                        }}>
                        <Icon name="arrow-back" size={40} color="black" />
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
                            {this.props.headerText}
                        </Text>
                    </View>
                </View>



                <View style={{flex:1}}>
                    <TextInput
                        ref={(ref) => { this.textInput = ref; }}
                        autoFocus={true}
                        multiline={false}
                        style={{
                            flex:1,
                            backgroundColor:'white',
                            textAlignVertical: 'top',
                            fontSize:20,
                            borderBottomWidth:1,
                            borderBottomColor: '#00000050'}}
                        placeholder={this.props.placeholderText}
                        onChangeText={(newText) => {
                            this.setState(()=>{return {textInputContent:newText?newText:''}})
                        }}
                        onSubmitEditing={()=>{
                            this.props.submitText(this.state.textInputContent);
                            this.props.toggleVisibility();
                        }}>
                        {this.state.textInputContent}
                    </TextInput>
                    <View
                        style={{
                            alignItems:'center'
                        }}>
                        <CustomActionButton
                            style={{
                                width: 100,
                                backgroundColor: 'white',
                                //marginBottom: 10,
                                //marginTop: 10,
                                //borderRadius: 20,
                            }}
                            onPress={() => {
                                this.props.submitText(this.state.textInputContent);
                                this.props.toggleVisibility();
                            }}
                        >
                            <Text style={{ color: '#3BC14A',fontFamily: 'Poppins-SemiBold' }}>Continuer</Text>
                        </CustomActionButton>
                    </View>
                </View>

            </Modal>
            )

    }
}
