import React, { Component } from "react";
import {View, StyleSheet, FlatList, ScrollView, Text, Image, Dimensions} from "react-native";
import { Appbar, Title, Avatar, Card } from "react-native-paper";
import Carousel from "react-native-snap-carousel";
import CarouselContainer from "../../components/Carousel";
import { snapshotToArray } from "../../helpers/firebaseHelpers";
import colors from "../../assets/colors";
import firestore from '@react-native-firebase/firestore';
import AddressComponent from "../../components/AddressComponent";
import { getDistance, getPreciseDistance } from 'geolib';
import {stringify} from "javascript-stringify";

const { width, height } = Dimensions.get('window');

const dummyData = [
    {
        image:"https://firebasestorage.googleapis.com/v0/b/illico-bd1e8.appspot.com/o/food_cat%2Fcat_italian.jpg?alt=media&token=3abfeaa1-0df6-4674-8b24-09046f85476d",
        name:"Italien",
    },
    {
        image:"https://firebasestorage.googleapis.com/v0/b/illico-bd1e8.appspot.com/o/food_cat%2Fcat_burgers.png?alt=media&token=23feb7f8-4754-4c6a-a71b-e7c973c9d7a0",
        name:"Burgers",
    },
    {
        image:"https://firebasestorage.googleapis.com/v0/b/illico-bd1e8.appspot.com/o/food_cat%2Fcat_sushi.jpg?alt=media&token=9dffdf89-ec11-4cdf-afed-4f489430da6c",
        name:"Sushi",
    },
    {
        image:"https://firebasestorage.googleapis.com/v0/b/illico-bd1e8.appspot.com/o/food_cat%2Fcat_pizza.jpg?alt=media&token=501e1a4c-fc19-4084-9735-24af5badbc3b",
        name:"Pizza",
    }
    ];

const dummyRestaurant = [
    {
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/illico-bd1e8.appspot.com/o/food_cat%2Fmcdo.png?alt=media&token=42115631-04ab-46ea-862e-9edf005b0f55",
        title: "Mc Donald's",
        place: "Vijay Nagar"
    }
];
const CarouselData =
    [{
        title: 'Faites-vous livrer vos restos préférés', url: 'https://firebasestorage.googleapis.com/v0/b/illico-bd1e8.appspot.com/o/food_cat%2Fpexels-rania-alhamed-2454533.jpg?alt=media&token=435404b7-99a1-4ee2-a086-8b51af453412',
        description: "Partout dans votre ville !",
        id: 1

    },
        {
            title: 'Les meilleurs bons plans près de chez vous', url: 'https://i.ibb.co/JtS24qP/food-inside-bowl-1854037.jpg',
            description: "Commandez sans lever le petit doigt, ou presque !",
            id: 2
        },
        {
            title: 'Téléchargez l\'app Illico et commencer', url: 'https://i.ibb.co/JxykVBt/flat-lay-photography-of-vegetable-salad-on-plate-1640777.jpg',
            description: "Se régaler est une affaire de tous les jours",
            id: 3
        }]

// create a component
navigator.geolocation = require('@react-native-community/geolocation');

class FoodHomeScreen extends Component {
    componentDidMount() {
        this.checkOrders();
        this.getPlaces();
        this.LoadServices();
        //this.getPlacesInRadius(10000);
    }

    constructor(props) {
        super(props);
        this.state = {
            data : [],
            place: [],
            services: []
        };
    }
    checkOrders = () => {
        /*firestore().collection('Users')*/
        const orderData = firestore().collection('categories').get()
            .then(data => {
                let catArray = snapshotToArray(data);
                console.log("::: ORDERS :: " + catArray[0].image);
                this.setState({data : catArray })
            })
            .catch(error => console.error(error));
    };

    getPlaces = () => {
        const placesData = firestore().collection('resto').get()
            .then(data => {
                let placesArray = snapshotToArray(data);
                console.log("::: PLACES :: " + placesArray[0].image);
                this.setState({place : placesArray })
            })
            .catch(error => console.error(error));
    };
    LoadServices = () => {
        const serviceData = firestore().collection('services').get()
            .then(data => {
                let array = snapshotToArray(data);
                this.setState({services : array });
                console.log("::: services :: " + array[0].backgroundImage);
            })
            .catch(error => console.error(error));
    };

    getPlacesInRadius = async(radius) => {
        let currentLocation;
        await navigator.geolocation.getCurrentPosition(
            position => {
                currentLocation = {latitude:position.coords.latitude,longitude:position.coords.longitude};
                console.log("##Current location : "+ stringify(currentLocation));
                const placesData = firestore().collection('resto').get()
                    .then(data => {
                        let placesArray = snapshotToArray(data).filter((dataRow)=>{
                            console.log({latitude:dataRow.location._latitude,longitude:dataRow.location._longitude});
                            console.log(stringify(currentLocation));
                            console.log(radius);
                            if(this._isInRadius({latitude:dataRow.location._latitude,longitude:dataRow.location._longitude},currentLocation,radius)){
                                return true;
                            }
                        });
                        this.setState({place : placesArray });
                        console.log("::: PLACES IN RADIUS "+ radius +" :: " + placesArray.size);
                    })
                    .catch(error => console.error(error));
                },
            position => console.log("#ERROR# Could not retrieve current location"),
            {enableHighAccuracy: false, timeout: 5000, maximumAge: 1000,});


    };

    _isInRadius = (locA,locB,radius) => {
        let distance = getDistance(locA,locB);
        console.log("Distance | radius : "+ distance +" | "+ radius);
        if(distance > radius){
            return false;
        }
        else{
            return true;
        }
    }

    _getDistance = () => {
        var dis = getDistance(
            { latitude: 20.0504188, longitude: 64.4139099 },
            { latitude: 51.528308, longitude: -0.3817765 }
        );
        alert(`Distance\n${dis} Meter\nor\n${dis / 1000} KM`);
    };



    switchToMerchant = () => {
        this.props.navigation.push('RestaurantScreen');
    };
    render() {
        return (
            <View>
                <AddressComponent />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ marginLeft: 10, marginRight: 10, marginTop: 0 }}
                >
                    {/*<FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={this.state.data}
                        keyExtractor={(item, index) => item.title}
                        renderItem={({ item: rowData }) => {
                            return (
                                <View style={styles.popularCategories}>
                                    <Avatar.Image size={100} source={{ uri: rowData.image }} />
                                    <Text style={styles.popularText}>{rowData.name}</Text>
                                </View>
                            );
                        }}
                    />*/}
                    <CarouselContainer data = {CarouselData}/>
                    <Title>Nos Services</Title>
                    {/*<Carousel
                        enableMomentum={true}
                        activeSlideAlignment={"start"}
                        ref={c => {
                            this._carousel = c;
                        }}
                        layout={"default"}
                        data={this.state.data}
                        inactiveSlideScale={0.95}
                        inactiveSlideOpacity={0.6}
                        renderItem={({ item: rowData }) => {
                            return (
                                <View>
                                    <Card>
                                        <Card.Cover source={{ uri: rowData.image }} />
                                        <Text
                                            style={{fontSize:20,padding:20,fontFamily:'Poppins-SemiBold'}}>{rowData.name}</Text>
                                    </Card>
                                </View>
                            );
                        }}
                        sliderWidth={500}
                        itemWidth={200}
                    />*/}
                    <Carousel
                        enableMomentum={true}
                        activeSlideAlignment={"start"}
                        ref={c => {
                            this._carousel = c;
                        }}
                        layout={"default"}
                        data={this.state.services}
                        inactiveSlideScale={0.95}
                        inactiveSlideOpacity={0.6}
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
                        sliderWidth={width}
                        itemWidth={width - 80}
                    />
                    <Title style={{marginTop:15, fontFamily: 'Poppins-SemiBold'}}>Les plus populaires</Title>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.place}
                        keyExtractor={(item, index) => item.title}
                        renderItem={({ item: rowData }) => {
                            return (
                                <Card onPress={() => this.switchToMerchant()} style={{
                                    elevation:1,
                                    borderColor:"#000",
                                    margin:10,
                                }}>
                                    <Card.Title title={rowData.title} style={{fontFamily:'Poppins-Medium'}}/>
                                    <Card.Cover source={{ uri: rowData.imageUrl }} />
                                </Card>
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
        width: width - 80,
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
        width: width - 80,
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

export default FoodHomeScreen;
