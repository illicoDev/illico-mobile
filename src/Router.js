import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import WelcomeScreen from "./screens/AppSwitchNavigator/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SettingsScreen from "./screens/SettingsScreen";
import CustomDrawerComponent from "./screens/DrawerNavigator/CustomDrawerComponent";
//import LoadingScreen from "./screens/AppSwitchNavigator/LoadingScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';


import auth from "@react-native-firebase/auth";
import { connect } from "react-redux";


const Stack = createStackNavigator();
const FoodStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

import FoodHomeScreen from "./screens/HomeTabNavigator/FoodHomeScreen";
import OrderScreen from "./screens/HomeTabNavigator/OrderScreen";
import CartScreen from "./screens/HomeTabNavigator/CartScreen";
import RestaurantScreen from "./screens/HomeTabNavigator/RestaurantScreen";
import UserScreen from "./screens/HomeTabNavigator/UserScreen";
import SearchScreen from "./screens/HomeTabNavigator/SearchScreen";

import SplashScreen from 'react-native-splash-screen';

import colors from "../assets/colors";

class Router extends Component {
    componentDidMount() {
        this.checkIfLoggedIn();
        SplashScreen.hide();
        this.setLocalStorageToRedux().then(()=>{console.log("#success# setLocalStorageToRedux")}).catch(()=>{console.log("#fail# setLocalStorageToRedux")});
    }

    checkIfLoggedIn = () => {
        let unsubscribe;
        try {
            unsubscribe = auth().onAuthStateChanged(user => {
                if (user) {
                    //sign in the user
                    this.props.signIn(user);
                } else {
                    console.log("No user signed in");
                    //sign out the user
                    this.props.signOut();
                }
                unsubscribe();
            });
        } catch (e) {
            //sign out user
            this.props.signOut();
        }
    };

    setLocalStorageToRedux = async () => {
        try {
            const address = await AsyncStorage.getItem('currentAddress')
            console.log("## Address retrived from local storage : "+address);
            if(address !== null) {
                // value previously stored
                this.props.setCurrentAddress(address);
                console.log("this is the address on local : "+address);
                console.log("this is the address on redux : "+this.props.addressBook.currentAddress.address);
            }
        } catch(e) {
            console.log("error during setLocalStorageToRedux");
        }
    }
    render() {
        return (
            <NavigationContainer>
                {!this.props.auth.isSignedIn ? (
                    <Stack.Navigator
                        screenOptions={{
                            headerStyle: {
                                backgroundColor: "white"
                            },
                            headerTintColor: "white"
                        }}
                    >
                        <Stack.Screen
                            name="WelcomeScreen"
                            component={WelcomeScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="LoginScreen"
                            component={LoginScreen}
                            options={{ headerBackTitleVisible: false }}
                        />
                    </Stack.Navigator>
                ) :
                        <AppDrawerNavigator />
                }
            </NavigationContainer>
        );
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
                    case "home":
                        return <MaterialCommunityIcons name="home-outline" color={color} size={size} />;
                    case "FoodScreen":
                        return <MaterialCommunityIcons name="home" color={color} size={size} />;
                    case "Search":
                        return <MaterialCommunityIcons name="magnify" color={color} size={size} />;
                    case "Cart":
                        return <MaterialCommunityIcons name="cart-outline" color={color} size={size} />;
                    case "Profil":
                        return <MaterialCommunityIcons name="account-outline" color={color} size={size} />;
                }
            }
        })}
    >
        <Tab.Screen options={{ tabBarLabel: "Accueil" }} name="home" component={FoodStackNavigator} />
        <Tab.Screen options={{ tabBarLabel: "Recherche" }} name="Search" component={SearchScreen}/>
        <Tab.Screen options={{ tabBarLabel: "Panier" }} name="Cart" component={CartScreen}/>
        <Tab.Screen options={{ tabBarLabel: "Profil" }} name="Profil" component={UserScreen}/>
    </Tab.Navigator>
);

const FoodStackNavigator = ({ navigation }) => (
    <FoodStack.Navigator
        screenOptions={{
            headerShown : false
        }}
    >
        <FoodStack.Screen name="FoodHomeScreen" component={FoodHomeScreen}/>
        <FoodStack.Screen name="RestaurantScreen" component={RestaurantScreen}/>
        <FoodStack.Screen name="OrderScreen" component={OrderScreen}/>
    </FoodStack.Navigator>
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

const AppDrawerNavigator = ({ navigation }) => (
    <Drawer.Navigator
        drawerContent={props => <CustomDrawerComponent {...props} />}
    >
        <Drawer.Screen
            options={{ drawerIcon: () => <MaterialCommunityIcons name="home" size={24} /> }}
            name="Home"
            component={HomeStackNavigator}
        />
        <Drawer.Screen
            options={{ drawerIcon: () => <MaterialCommunityIcons name="home" size={24} /> }}
            name="Settings"
            component={SettingsScreen}
        />
    </Drawer.Navigator>
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
        signOut: () => dispatch({ type: "SIGN_OUT" }),
        setCurrentAddress: address => dispatch({type: "SET_CURRENT_ADDRESS", address:address})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Router);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});
