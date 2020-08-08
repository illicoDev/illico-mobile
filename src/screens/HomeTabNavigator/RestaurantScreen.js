import React, { Component } from 'react';
import {View, Text, StyleSheet, ScrollView, Image, FlatList, ImageBackground, TouchableOpacity} from 'react-native';
import {Card, Title} from "react-native-paper";
import colors from "../../assets/colors";
import Colors from "react-native/Libraries/NewAppScreen/components/Colors";

const dummyRestaurant = [
    {
        imageUrl: "http://lorempixel.com/400/200/nightlife",
        title: "BIG TASTY"
    },
    {
        imageUrl: "http://lorempixel.com/400/200/nightlife",
        title: "FILLET-O-FISH"
    },
    {
        imageUrl: "http://lorempixel.com/400/200/nightlife",
        title: "Pizza"
    },
    {
        imageUrl: "http://lorempixel.com/400/200/nightlife",
        title: "BIG MAC"
    }
];

const dummyFrites = [
    {
        imageUrl: "http://lorempixel.com/400/200/nightlife",
        title: "GRANDE FRITE"
    },
    {
        imageUrl: "http://lorempixel.com/400/200/nightlife",
        title: "MOYENNE FRITE"
    },
    {
        imageUrl: "http://lorempixel.com/400/200/nightlife",
        title: "PETITE FRITE"
    }
];

class RestaurantScreen extends Component {

    switchToOrder = (rowData) => {
        console.log(" push to orderScreen", rowData);
        this.props.navigation.push('OrderScreen', { menu : rowData });
    };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
            <ImageBackground
                accessibilityRole={'image'}
                source={{ uri : "https://firebasestorage.googleapis.com/v0/b/illico-bd1e8.appspot.com/o/food_cat%2Fheader.png?alt=media&token=08d707a6-b4a9-498a-8046-5dc61637dd4b"}}
                style={styles.background}
                imageStyle={styles.logo}>
            </ImageBackground>
          <View style={styles.cardHeader}>
            <View style={{flex:1, flexDirection: 'row', marginBottom: 25}}>
              <View  style={{width: 70}}><Image style={{width: 70, height: 70}} source = {{ uri : "https://firebasestorage.googleapis.com/v0/b/illico-bd1e8.appspot.com/o/food_cat%2Fmcdo_logo.png?alt=media&token=c007215d-14ea-430f-a458-0a968e9248a3"}}/></View>
              <View   style={{flex: 1}}><Text style={{ fontSize: 20,fontFamily: 'Poppins-SemiBold'}}>McDonald's</Text></View>
              <View></View>
              <View></View>
            </View>
            <View style={{backgroundColor: '#d3e3ef', borderRadius: 8}}>
              <Text style={{padding: 5,fontFamily: 'Poppins-Regular'}}>3.5 Km - Livrasion : 35 min </Text>
            </View>
          </View>
           <View style={{margin: 5}}>
            <Title style={{marginTop:15, marginLeft: 15, marginBottom: 5}}>NOS MENUS BURGERS</Title>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={dummyRestaurant}
                keyExtractor={(item, index) => item.title}
                renderItem={({ item: rowData }) => {
                    return (
                        <TouchableOpacity onPress={() => this.switchToOrder(rowData)}>
                        <View style={styles.menuCard}>
                            <View style={{flex:1, flexDirection: 'row'}}>
                                <View  style={{width: 70, margin: 5}}><Image style={{width: 70, height: 70}} source={{ uri : "https://firebasestorage.googleapis.com/v0/b/illico-bd1e8.appspot.com/o/food_cat%2Fmenu.png?alt=media&token=ba78df09-30fa-4993-acf4-c526f6405d55"}}/></View>
                                <View   style={{flex: 1}}>
                                    <View   style={{flex: 1,marginBottom: 3}}><Text style={{fontFamily: 'Poppins-SemiBold'}}>{rowData.title}</Text></View>
                                    <View   style={{flex: 1, marginBottom: 5}}><Text>desc desc desc desc desc </Text></View>
                                    <View   style={{flex: 1, marginBottom: 5}}><Text style={{fontWeight: "bold", color:colors.bgPrimary, textAlign: 'right', alignSelf: 'stretch'}}>35 Dh</Text></View>
                                </View>
                            </View>
                        </View>
                        </TouchableOpacity>
                    );
                }}
            />
           </View>
            <View>
                <Title style={{marginTop:15, marginLeft: 15, marginBottom: 5}}>NOS FRITES ET SAUCES</Title>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={dummyFrites}
                    keyExtractor={(item, index) => item.title}
                    renderItem={({ item: rowData }) => {
                        return (
                            <View style={styles.menuCard}>
                                <View style={{flex:1, flexDirection: 'row'}}>
                                    <View  style={{width: 70, margin: 5}}><Image style={{width: 70, height: 70}} source = {{uri : "https://firebasestorage.googleapis.com/v0/b/illico-bd1e8.appspot.com/o/food_cat%2Ffrite.png?alt=media&token=d0613077-c2a2-4833-9920-1e30cfdb39af"}}/></View>
                                    <View   style={{flex: 1}}>
                                        <View   style={{flex: 1,marginBottom: 3}}><Text style={{fontWeight: "bold"}}>{rowData.title}</Text></View>
                                        <View   style={{flex: 1, marginBottom: 5}}><Text></Text></View>
                                        <View   style={{flex: 1, marginBottom: 5}}><Text style={{fontWeight: "bold", color:colors.bgPrimary, textAlign: 'right', alignSelf: 'stretch'}}>12.50 Dh</Text></View>
                                    </View>
                                </View>
                            </View>
                        );
                    }}
                />
            </View>
        </ScrollView>
      </View>
    );
  }
}
export default RestaurantScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2'
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  backdrop: {
    flex:1,
    flexDirection: 'column'
  },
  headline: {
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: 'black',
    color: 'white'
  },
cardHeader: {
    flex: 1,
    justifyContent: 'center',
    borderWidth: 0.4,
    borderColor: 'white',
    borderRadius: 8,
    backgroundColor: 'white',
    padding: 15,
    marginLeft: 20,
    marginBottom: 20,
    marginRight: 20,
    marginTop: -20,
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
},
    menuCard: {
        flex: 1,
        justifyContent: 'center',
        borderWidth: 0.4,
        borderColor: 'white',
        borderRadius: 8,
        backgroundColor: 'white',
        padding: 15,
        marginLeft: 20,
        marginBottom: 10,
        marginRight: 20,
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    background: {
        paddingBottom: 40,
        paddingTop: 96,
        paddingHorizontal: 32,
        backgroundColor: Colors.lighter,
    },
    logo: {
        opacity: 0.2,
        overflow: 'visible',
        resizeMode: 'cover',
        marginLeft: -128,
        marginBottom: -192,
    },
    text: {
        fontSize: 40,
        fontWeight: '600',
        textAlign: 'center',
        color: Colors.black,
    },
    scrollView: {
        backgroundColor: Colors.lighter,
    }

});
