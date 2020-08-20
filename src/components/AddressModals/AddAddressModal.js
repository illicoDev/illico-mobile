import React from 'react';
import {Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AddressAutocomplete from "../AddressAutocomplete";
import ChooseAddressModal from "./ChooseAddressModal";

export default class AddAddressModal extends React.Component{

    constructor(props) {
        super(props);
        this.state={
        }

        this.addressAC = React.createRef();
    }
    setInput = (text) => {
        this.addressAC.current.setAddress(text);
    }
    triggerFocus = () => {
        this.addressAC.current.triggerFocus();
    }

    render= () => {
        return (
            <Modal
                visible={this.props.modalVisible}
                animationType="fade"
                transparent={true}
                onRequestClose={() => {
                    this.props.toggleVisible();
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
                            onPress={()=>this.props.toggleVisible()}
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
                        ref={this.addressAC}
                        address={this.state.address}
                        toggleAddressModal={this.props.toggleVisible}
                        toggleMapModal={this.props.toggleMapModal}
                        toggleLoadingModal={this.props.toggleLoadingModal}

                    />

                </View>
            </Modal>
        );

    }
}
