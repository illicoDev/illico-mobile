import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class Home2 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.txt}>Home2</Text>
      </View>
    );
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
  },
});

export default Home2;
