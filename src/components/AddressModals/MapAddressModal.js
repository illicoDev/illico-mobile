import React from 'react';
import {Modal, View} from "react-native";
import LocationPicker from "../LocationPicker";

export default class MapAddressModal extends React.Component{

    constructor(props) {
        super(props);
        this.state={
        }
    }


    render() {
        return (
            <Modal
                visible={this.props.modalVisible}
                onRequestClose={() => {
                    this.props.toggleVisible();
                }}>
                <View style={{height:'100%'}}>
                    <LocationPicker
                        //ref={(map) => {this.locationPicker=map;}}
                        //style={{height:300}}
                        defaultToCurrentLocation={false}
                        // hideModal={this.toggleMapAddressModalVisible()}
                        toggleVisible={this.props.toggleVisible}
                        setAddress={this.props.setAddress}
                        currentCoords={this.props.currentCoords}
                        closeAllModals={this.props.closeAllModals}
                    />
                </View>
            </Modal>
        );
    }
}
