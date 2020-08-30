import React from 'react';
import {Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {getAnyCurrentPosition} from '../../helpers/locationHelpers';
import {stringify} from "javascript-stringify";

let currentLocation;
export default class ChooseAddressModal extends React.Component{

    constructor(props) {
        super(props);
        this.state={
        }
    }
    currentLocation = async () => {
        this.props.toggleLoadingModal();
        let pos=await getAnyCurrentPosition();
        this.props.toggleLoadingModal();
        if(pos.coords){
            currentLocation={longitude:pos.coords.longitude,latitude:pos.coords.latitude};
            this.props.toggleMapModal(currentLocation);
        }
        else{
            alert("Impossible de trouver votre localisation");
        }
    }

    render= () => {
        return (
            <Modal
                transparent={true}
                animationType="fade"
                visible={this.props.modalVisible}
                onRequestClose={() => {
                    this.props.toggleVisible();
                }}
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
                    onPress={()=>this.props.toggleVisible()}
                >
                    <TouchableWithoutFeedback>
                        <View
                            style={{
                                height:160,
                                width:300,
                                backgroundColor: 'white',
                                borderWidth: 1, borderColor: '#CCCCCC', borderRadius:5, padding :5
                            }}>
                            <Text style={{
                                fontFamily: 'Poppins-SemiBold',
                                fontSize: 15,
                                textAlign: 'center',
                                borderBottomWidth: 1,
                                borderColor: 'rgba(158, 150, 150, .5)',
                                paddingBottom: 10,
                                paddingTop: 10
                            }}>Choisir une adresse</Text>

                            <Text onPress={this.currentLocation} style={{
                                height:50,
                                fontFamily:'Poppins-Medium',
                                fontSize: 17,
                                padding:5,
                                paddingTop:8,
                                borderBottomWidth:1,
                                color:'grey',
                                borderColor: 'rgba(158, 150, 150, .5)'
                            }}>
                                <Icon name="location-outline" size={25} color="black" style={{marginLeft:10}}/>
                                <Text> Ma localisation</Text>
                            </Text>
                            <Text onPress={()=>this.props.toggleAddModal()} style={{
                                height:50,
                                fontFamily:'Poppins-Medium',
                                fontSize: 17,
                                padding:5,
                                paddingTop:8,
                                borderBottomWidth: 1,
                                color:'grey'
                            }}>
                                <Icon name="add-circle-outline" size={25} color="black" onPress={()=>console.log('ggggggg')}/>
                                <Text> Ajouter une adresse</Text>
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>
        );

    }
}
