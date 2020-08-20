import React, {useState, useEffect, useRef} from 'react';
import AddAddressModal from "./AddressModals/AddAddressModal";
import ChooseAddressModal from "./AddressModals/ChooseAddressModal";
import {View} from "react-native";
import MapAddressModal from "./AddressModals/MapAddressModal";
import {stringify} from "javascript-stringify";
import LoadingModal from "./loading/LoadingModal";

export default class AddressComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            modals:{
                chooseAddressModalVisible:false,
                addAddressModalVisible:false,
                mapAddressModalVisible:false,
                loadingModalVisible:false,
            },
            currentLocation:{latitude:null,longitude:null},
            address:null,
            additionalInfo:null
        }

        this.addAddressModal=React.createRef();

    }
    componentDidMount() {
        console.log("Address component : "+this.props.addressComponent);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    toggleChooseAddressModalVisible = () => {
        this.setState((currentState) => {
            return {modals:{...currentState.modals,chooseAddressModalVisible:!currentState.modals.chooseAddressModalVisible}};})
    };
    toggleAddAddressModalVisible = () => {
        this.setState((currentState) => {
            return {modals:{...currentState.modals,addAddressModalVisible:!currentState.modals.addAddressModalVisible}};
        })
    };
    toggleMapAddressModalVisible = (defaultLocation,address,additionalInfo) => {
        this.setState((currentState) => { return {currentLocation:defaultLocation}; });
        this.setState((currentState) => { return {address:address}; });
        this.setState((currentState) => { return {additionalInfo:additionalInfo}; });

        if(this.state.modals.addAddressModalVisible){
            this.addAddressModal.current.setInput('');
            this.addAddressModal.current.triggerFocus();
        }
        this.setState((currentState) => { return {modals:{...currentState.modals,mapAddressModalVisible:!currentState.modals.mapAddressModalVisible}};})
    };
    toggleLoadingModalVisible = () => {
        this.setState((currentState) => { return {modals:{...currentState.modals,loadingModalVisible:!currentState.modals.loadingModalVisible}};})
    };
    closeAllModals = () => {
        this.setState((currentState) => { return{modals:
                {...currentState.modals,
                chooseAddressModalVisible:false,
                addAddressModalVisible:false,
                mapAddressModalVisible:false,
                loadingModalVisible:false,
                }};})
    }


    render = ()=>{
        return (
            <View>
                <ChooseAddressModal
                    toggleVisible={this.toggleChooseAddressModalVisible}
                    modalVisible={this.state.modals.chooseAddressModalVisible}
                    toggleMapModal={this.toggleMapAddressModalVisible}
                    toggleAddModal={this.toggleAddAddressModalVisible}
                    toggleLoadingModal={this.toggleLoadingModalVisible}
                />
                <AddAddressModal
                    ref={this.addAddressModal}
                    toggleVisible={this.toggleAddAddressModalVisible}
                    modalVisible={this.state.modals.addAddressModalVisible}
                    toggleMapModal={this.toggleMapAddressModalVisible}
                    toggleLoadingModal={this.toggleLoadingModalVisible}
                />
                <MapAddressModal
                    currentCoords={this.state.currentLocation}
                    toggleVisible={this.toggleMapAddressModalVisible}
                    modalVisible={this.state.modals.mapAddressModalVisible}
                    setAddress={this.props.setAddress}
                    closeAllModals={this.closeAllModals}
                />
                <LoadingModal
                    animationType={'fade'}
                    modalVisible={this.state.modals.loadingModalVisible}
                />
            </View>
        );
    }

}
