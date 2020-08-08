import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

class Home1 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.txt}>Home1</Text>
      </View>
    );
  }
  componentDidMount() {
    SplashScreen.hide();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    color: '#000',
    fontFamily: 'Poppins-Black',
    fontSize : 40,
  },
});

export default Home1;
