import React, {Component} from 'react';
import {connect} from 'react-redux';
import { View, Text} from "react-native";

function mapStateToProps(state) {
    return {};
}

class FoodScreen extends Component {
    render() {
        return (
            <View><Text>FoodScreen</Text></View>
        );
    }
}

export default connect(mapStateToProps,)(FoodScreen);
