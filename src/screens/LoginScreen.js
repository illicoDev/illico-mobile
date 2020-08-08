import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator
} from "react-native";

import colors from "../assets/colors";
import CustomActionButton from "../components/CustomActionButton";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { connect } from "react-redux";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      isLoading: false
    };
  }
  onSignIn = async () => {
    if (this.state.email && this.state.password) {
      this.setState({ isLoading: true });
      try {
        const response = await firebase
          .auth()
          .signInWithEmailAndPassword(this.state.email, this.state.password);
        if (response) {
          this.setState({ isLoading: false });
          this.props.signIn(response.user);
          // this.props.navigation.navigate('LoadingScreen');
        }
      } catch (error) {
        this.setState({ isLoading: false });
        switch (error.code) {
          case "auth/user-not-found":
            alert("A user with that email does not exist. Try signing Up");
            break;
          case "auth/invalid-email":
            alert("Please enter an email address");
        }
      }
    }
  };
  onSignUp = async () => {
    if (this.state.email && this.state.password) {
      this.setState({ isLoading: true });
      try {
        const response = await firebase
          .auth()
          .createUserWithEmailAndPassword(
            this.state.email,
            this.state.password
          );
        if (response) {
          this.setState({ isLoading: false });
          this.props.signIn(response.user);
          // this.props.navigation.navigate('LoadingScreen');
        }
      } catch (error) {
        this.setState({ isLoading: false });
        if (error.code === "auth/email-already-in-use") {
          alert("User already exists.Try loggin in");
        }
        console.log(error);
      }
    } else {
      alert("Please enter email and password");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoading ? (
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
                elevation: 1000
              }
            ]}
          >
            <ActivityIndicator size="large" color={colors.logoColor} />
          </View>
        ) : null}
        <View style={{ flex: 1, justifyContent: 'center', borderWidth: 0.4,borderColor: 'white',margin: 25, borderRadius: 8, backgroundColor: 'white' }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'black', fontSize: 20, fontFamily: 'Poppins-SemiBold'}}>Bienvenue !</Text>
          </View>
          <TextInput
              style={styles.textInput}
              placeholder={'abc@example.com'}
              placeholderTextColor={colors.bgTextInputDark}
              keyboardType="email-address"
              onChangeText={email => this.setState({ email })}
          />
          <TextInput
              style={styles.textInput}
              placeholder="Mot de passe"
              placeholderTextColor='#CCCCCC'
              secureTextEntry
              onChangeText={password => this.setState({ password })}
          />
          <View style={{ alignItems: 'center', marginTop: 25}}>
            <CustomActionButton
                onPress={this.onSignIn}
                style={styles.loginButtons}
            >
              <Text style={{ color: 'white', fontSize: 20, fontFamily: 'Poppins-Medium' }}>Se connecter</Text>
            </CustomActionButton>
            <CustomActionButton
                onPress={this.onSignUp}
                style={[styles.loginButtons, { borderColor: colors.bgError }]}
            >
              <Text style={{ color: 'white', fontSize: 20, fontFamily: 'Poppins-Medium'}}>S'inscrire</Text>
            </CustomActionButton>
            {/*<CustomActionButton
                onPress={this.onSignUp}
                style={[styles.loginButtons, { backgroundColor: '#3b5998' }]}
            >
              <Text style={{ color: 'white', fontSize: 20, fontFamily: 'Poppins-Medium'}}>S'inscrire avec <MaterialCommunityIcons name="facebook" color='white' size={20}/> </Text>
            </CustomActionButton>
            <CustomActionButton
                onPress={this.onSignUp}
                style={[styles.loginButtons, { backgroundColor: '#E5E5E5' }]}
            >
              <Text style={{ color: 'black', fontSize: 20, fontFamily: 'Poppins-Medium'}}>S'inscrire avec <MaterialCommunityIcons name="gmail" color='#D44638' size={20}/></Text>
            </CustomActionButton>*/}
          </View>
        </View>
        <View style={{ height: 150 }}></View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signIn: user => dispatch({ type: "SIGN_IN", payload: user })
  };
};
export default connect(null, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2'
  },
  textInput: {
    height: 50,
    borderWidth: 0.4,
    borderColor: '#9B9B9B',
    marginHorizontal: 10,
    marginBottom: 10,
    color: 'black',
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#FAFAFA'
  },
  loginButtons: {
    width: 300,
    backgroundColor: '#3BC14A',
    marginBottom: 10,
    borderRadius: 8,
  }
});
