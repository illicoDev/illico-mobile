import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

import Router from './Router';

import { Provider } from "react-redux";
import store from "../redux/store";

class App extends Component {

  constructor() {
    super();
    /*
    this.initializeFirebase();
    */
  }

  /*
  initializeFirebase = () => {
    if (!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
      console.log(":: firebase UP ::");
    }
  };
   */

  render() {
    return (
        <Provider store={store}>
          <Router />
        </Provider>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
