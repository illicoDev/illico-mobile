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
import auth from "@react-native-firebase/auth";
import { connect } from "react-redux";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import {stringify} from "javascript-stringify";
import firestore from "@react-native-firebase/firestore";

async function onFacebookButtonPress() {
  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }
  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();
  if (!data) {
    throw 'Something went wrong obtaining access token';
  }
  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
  // Sign-in the user with the credential
  const response = auth().signInWithCredential(facebookCredential);
  if(response){
    this.setState({ isLoading: false });
    console.log(":: LOGGED USER :: " + stringify(response.user));
  }
}

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
        const response = await auth()
          .signInWithEmailAndPassword(this.state.email, this.state.password);
        if (response) {
          this.setState({ isLoading: false });
          this.props.signIn(response.user);
          firestore().collection('users')
              .doc(response.user.uid)
              .get()
              .then( async documentSnapshot => {
                this.props.setPickupAddress(documentSnapshot.data().addresses.pickupAddress);
                this.props.setDeliveryAddress(documentSnapshot.data().addresses.deliveryAddress);
                this.props.setPhoneNumber(documentSnapshot.data().phoneNumber);
                this.props.setName(documentSnapshot.data().name);
                this.props.setRole(documentSnapshot.data().role);
              })
              .catch(e=>{console.log(e)})
          // this.props.navigation.navigate('LoadingScreen');
        }
      } catch (error) {
        this.setState({ isLoading: false });
        switch (error.code) {
          case "auth/user-not-found":
            alert("Un utilisateur avec cette identifiant n'existe pas");
            break;
          case "auth/invalid-email":
            alert("Veuillez entrer une adresse mail valide");
            break;
          case "auth/weak-password":
            alert("le mot de passe doit contenir au moins 6 caractères!");
            break;
          case "auth/wrong-password":
            alert("Mot de passe erroné");
            break;
          default:
            console.log("SignIn unknown error :  "+error.code);
            alert("Une erreur est survenue");
        }
      }
    }
  };
  onSignUp = async () => {
    if (this.state.email && this.state.password) {
      this.setState({ isLoading: true });
      try {
        const response = await auth()
          .createUserWithEmailAndPassword(
            this.state.email,
            this.state.password
          );
        if (response) {
          this.setState({ isLoading: false });
          this.props.signIn(response.user);
          firestore().collection('users')
              .doc(response.user.uid)
              .get()
              .then( async documentSnapshot => {
                this.props.setPickupAddress(documentSnapshot.data().addresses.pickupAddress);
                this.props.setDeliveryAddress(documentSnapshot.data().addresses.deliveryAddress);
                this.props.setPhoneNumber(documentSnapshot.data().phoneNumber);
                this.props.setName(documentSnapshot.data().name);
                this.props.setRole(documentSnapshot.data().role);
              })
              .catch(e=>{console.log(e)})
          // this.props.navigation.navigate('LoadingScreen');
        }
      } catch (error) {
        this.setState({ isLoading: false });
        switch (error.code) {
          case "auth/email-already-in-use":
            alert("Ce nom d'utilisateur existe déjà");
            break;
          case "auth/invalid-email":
            alert("Veuillez entrer une adresse mail valide");
            break;
          case "auth/weak-password":
            alert("le mot de passe doit contenir au moins 6 caractères!");
            break;
          default:
            console.log("SignUp unknown error :  "+error.code);
            alert("Une erreur est survenue");
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
                onPress={() => onFacebookButtonPress()}
                style={[styles.loginButtons, { backgroundColor: '#3b5998' }]}
            >
              <Text style={{ color: 'white', fontSize: 20, fontFamily: 'Poppins-Medium'}}>Continuer avec <MaterialCommunityIcons name="facebook" color='white' size={20}/> </Text>
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
    signIn: user => dispatch({ type: "SIGN_IN", payload: user }),
    setRole: role => dispatch({ type: "SET_ROLE", payload: role }),
    setDeliveryAddress: location => dispatch({type: "SET_DELIVERY_ADDRESS", payload:location}),
    setPickupAddress: location => dispatch({type: "SET_PICKUP_ADDRESS", payload:location}),
    setPhoneNumber: phoneNumber => dispatch({type: "SET_PHONE_NUMBER", payload:phoneNumber}),
    setName: name => dispatch({type: "SET_NAME", payload:name}),
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
