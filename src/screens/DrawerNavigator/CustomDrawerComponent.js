import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform
} from "react-native";

// import { DrawerItems } from "react-navigation";
import { DrawerItemList } from "@react-navigation/drawer";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

class CustomDrawerNavigator extends Component {
  render() {
    return (
      <ScrollView>
        <SafeAreaView style={{ backgroundColor: "white" }} />
        <View
          style={{
            height: 150,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: Platform.OS === "android" ? 20 : 0
          }}
        >
          <MaterialCommunityIcons name="home" color="black" />
          <Text style={{ fontSize: 24, color: "white", fontWeight: "100" }}>
            Book Worm
          </Text>
        </View>
        <DrawerItemList {...this.props} />
      </ScrollView>
    );
  }
}
export default CustomDrawerNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
