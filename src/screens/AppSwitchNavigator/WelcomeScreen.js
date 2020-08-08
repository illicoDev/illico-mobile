import React from "react";
import { View, Text, Image } from 'react-native';

import colors from "../../assets/colors";
import CustomActionButton from "../../components/CustomActionButton";
export default class WelcomeScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: colors.bgMain }}>
                <View
                    style={{
                        flex: 1,
                        borderColor: "black",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <View>

                    </View>
                    <Image source={require('../../../assets/img/illico-logo.png')} style={{width: 250, height: 144}}/>
                    <Text style={{ fontSize: 50, color: "#3BC14A",fontFamily: 'Poppins-SemiBold' }}>
                        illico
                    </Text>
                </View>
                <View
                    style={{
                        height: 100,

                        alignItems: "center",
                    }}
                >
                    <CustomActionButton
                        style={{
                            width: 300,
                            backgroundColor: '#3BC14A',
                            marginBottom: 10,
                            borderRadius: 8,
                        }}
                        onPress={() => this.props.navigation.navigate("LoginScreen")}
                    >
                        <Text style={{color: 'white', fontSize: 20, fontFamily: 'Poppins-Medium'}}>Start</Text>
                    </CustomActionButton>
                </View>
            </View>
        );
    }
}
