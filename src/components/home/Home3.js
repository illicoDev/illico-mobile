import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class Home3 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.txt}>Home3</Text>
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

export default Home3;
