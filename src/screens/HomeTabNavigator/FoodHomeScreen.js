import React, { Component } from "react";
import { View, StyleSheet, FlatList, ScrollView, Text } from "react-native";
import { Appbar, Title, Avatar, Card } from "react-native-paper";
import Carousel from "react-native-snap-carousel";
import CarouselContainer from "../../components/Carousel";
import { snapshotToArray } from "../../helpers/firebaseHelpers";
import colors from "../../assets/colors";
import * as firebase from "firebase";

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
class FoodHomeScreen extends Component {
    componentDidMount() {
        this.checkOrders();
    }

    constructor(props) {
        super(props);
        this.state = {
            data: dummyData,
            place: dummyRestaurant
        };
    }
    checkOrders = () => {
        const orderData = firebase.firestore().collection('categories').get()
            .then(data => {
                let booksArray = snapshotToArray(data);
                console.log("::: ORDERS :: " + booksArray[0].image);
                this.setState({data : booksArray })
            })
            .catch(error => console.error(error));
    };

    switchToMerchant = () => {
        this.props.navigation.push('RestaurantScreen');
    };
    render() {
        return (
            <View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ marginLeft: 10, marginRight: 10, marginTop: 40 }}
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
                    <Title>Catégories</Title>
                    <Carousel
                        enableMomentum={true}
                        activeSlideAlignment={"start"}
                        ref={c => {
                            this._carousel = c;
                        }}
                        layout={"default"}
                        data={this.state.data}
                        inactiveSlideScale={0.95}
                        inactiveSlideOpacity={1}
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
    popularText: { marginTop: 5, fontSize: 17 }
});

//make this component available to the app
export default FoodHomeScreen;
