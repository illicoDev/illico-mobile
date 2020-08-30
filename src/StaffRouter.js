import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import WelcomeScreen from "./screens/AppSwitchNavigator/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SettingsScreen from "./screens/SettingsScreen";
import CustomDrawerComponent from "./screens/DrawerNavigator/CustomDrawerComponent";
//import LoadingScreen from "./screens/AppSwitchNavigator/LoadingScreen";
import OrdersHome from "./screens/DeliveryBoy/OrdersHome";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import firestore from "@react-native-firebase/firestore";


import auth from "@react-native-firebase/auth";
import { connect } from "react-redux";


const Stack = createStackNavigator();
const FoodStack = createStackNavigator();
const Tab = createBottomTabNavigator();

import UserScreen from "./screens/HomeTabNavigator/UserScreen";

import colors from "../assets/colors";
import {stringify} from "javascript-stringify";
import {snapshotToArray} from "./helpers/firebaseHelpers";

class StaffRouter extends Component {
    render() {

        return <HomeStackNavigator/>;
    }
}

const HomeTabNavigator = () => (
    <Tab.Navigator
        tabBarOptions={{
            style: {
                backgroundColor: "white"
            },
            activeTintColor: colors.logoColor,
            inactiveTintColor: 'grey'
        }}
        screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
                switch (route.name) {
                    case "orders":
                        return <MaterialCommunityIcons name="home-outline" color={color} size={size} />;
                    case "Profil":
                        return <MaterialCommunityIcons name="account-outline" color={color} size={size} />;
                }
            }
        })}
    >
        <Tab.Screen options={{ tabBarLabel: "Commandes" }} name="orders" component={OrdersHome} />
        <Tab.Screen options={{ tabBarLabel: "Profil" }} name="Profil" component={UserScreen}/>
    </Tab.Navigator>
);

const HomeStackNavigator = ({ navigation }) => (
    <Stack.Navigator
        screenOptions={{
            headerShown : false
        }}
    >
        <Stack.Screen name="illico" component={HomeTabNavigator}/>
    </Stack.Navigator>
);
const mapStateToProps = state => {
    return {
        auth: state.auth,
        addressBook: state.addressBook

    };
};

const mapDispatchToProps = dispatch => {
    return {
        signIn: user => dispatch({ type: "SIGN_IN", payload: user }),
        setRole: role => dispatch({ type: "SET_ROLE", payload: role }),
        signOut: () => dispatch({ type: "SIGN_OUT" }),
        setDeliveryAddress: location => dispatch({type: "SET_DELIVERY_ADDRESS", payload:location}),
        setPickupAddress: location => dispatch({type: "SET_PICKUP_ADDRESS", payload:location}),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StaffRouter);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});
