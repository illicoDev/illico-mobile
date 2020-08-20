import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

import auth from "@react-native-firebase/auth";
import colors from '../../assets/colors';
import {stringify} from "javascript-stringify";
class LoadingScreen extends Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = () => {
    this.unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        console.log(":: LOGGED USER :: " + stringify(user));
        //navigate to home screen
        this.props.navigation.navigate('HomeScreen', { user });
      } else {
        //login screen
        this.props.navigation.navigate('LoginStackNavigator');
      }
    });
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.logoColor} />
      </View>
    );
  }
}
export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bgMain
  }
});
