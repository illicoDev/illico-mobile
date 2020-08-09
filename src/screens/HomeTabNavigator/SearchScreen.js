import React, { Component } from "react";
import {View, StyleSheet, FlatList, ScrollView, Text, Dimensions, Image} from "react-native";
import { Appbar, Title, Avatar, Card } from "react-native-paper";
import {snapshotToArray} from "../../helpers/firebaseHelpers";
const { width, height } = Dimensions.get('window');
import firestore from '@react-native-firebase/firestore';

const dummyRestaurant = [
    {
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/illico-bd1e8.appspot.com/o/food_cat%2Fmcdo.png?alt=media&token=42115631-04ab-46ea-862e-9edf005b0f55",
        title: "Mc Donald's",
        place: "Vijay Nagar"
    }
];

class SearchScreen extends Component {
    constructor() {
        super();
        this.state = {
            place: dummyRestaurant,
            services: []
        };
    }
    componentDidMount() {
        this.LoadServices();
    };
    LoadServices = () => {
        const serviceData = firestore().collection('services').get()
            .then(data => {
                let array = snapshotToArray(data);
                this.setState({services : array });
                console.log(array);
            })
            .catch(error => console.error(error));
    };

    render() {
        return (
            <View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ marginLeft: 10, marginRight: 10, marginTop: 40 }}
                >

                    <View style={{margin: 5}}>
                        <Text style={{marginTop:15, marginLeft: 15, marginBottom: 15, fontFamily: 'Poppins-Bold', fontSize: 18}}>Nos Services</Text>
                    </View>
                    {/*<FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.place}
                        keyExtractor={(item, index) => item.title}
                        renderItem={({ item: rowData }) => {
                            return (
                                <Card style={{
                                    elevation:1,
                                    borderColor:"#000",
                                    margin:10,
                                }}>
                                    <Card.Title title={rowData.title} style={{fontFamily:'Poppins-Medium'}}/>
                                    <Card.Cover source={{ uri: rowData.imageUrl }} />
                                </Card>
                            );
                        }}
                    />*/}
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={this.state.services}
                        keyExtractor={(item, index) => item.key}
                        renderItem={({ item: rowData }) => {
                            return (
                                <View style={styles.cardView}>
                                    <Image style={styles.image} source={{ uri: rowData.backgroundImage }} />
                                    <View style={styles.textView}>
                                        <Text style={styles.itemTitle}> {rowData.name}</Text>
                                        <Text style={styles.itemDescription}></Text>
                                    </View>
                                </View>
                            );
                        }}
                    />
                </ScrollView>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        padding: 20
    },
    popularCategories: {
        flex: 1,
        alignItems: "center",
        margin: 7
    },
    popularText: { marginTop: 5, fontSize: 17 },
    cardView: {
        flex: 1,
        width: width - 37,
        height: height / 5,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
    },

    textView: {
        position: 'absolute',
        bottom: 10,
        margin: 10,
        left: 5,
    },
    image: {
        width: width - 37,
        height: height / 5,
        borderRadius: 10
    },
    itemTitle: {
        color: 'white',
        fontSize: 22,
        shadowColor: '#000',
        shadowOffset: { width: 0.8, height: 0.8 },
        shadowOpacity: 1,
        shadowRadius: 3,
        marginBottom: 5,
        fontWeight: "bold",
        elevation: 5,
        fontFamily: 'Poppins-SemiBold'
    },
    itemDescription: {
        color: 'white',
        fontSize: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0.8, height: 0.8 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 5,
        fontFamily: 'Poppins-Regular'
    }
});

//make this component available to the app
export default SearchScreen;
