import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import CustomActionButton from "../components/CustomActionButton";
import colors from "../assets/colors";
import auth from "@react-native-firebase/auth";
import { connect } from "react-redux";
class SettingScreen extends Component {
  signOut = async () => {
    try {
      await auth().signOut();
      this.props.signOut();
      // this.props.navigation.navigate('WelcomeScreen');
    } catch (error) {
      alert("Unable to sign out right now");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <CustomActionButton
          style={styles.logoutButton}
          title="Sign Up"
          onPress={this.signOut}
        >
          <Text style={{color: 'white', fontSize: 17, fontFamily: 'Poppins-Medium'}}>Logout</Text>
        </CustomActionButton>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch({ type: "SIGN_OUT" })
  };
};

export default connect(null, mapDispatchToProps)(SettingScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.bgMain
  },
    logoutButton: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        width: 300,
        backgroundColor: 'red',
        marginBottom: 10,
        borderRadius: 8,

    }
});
