import React, { Component } from "react";
import { View, StyleSheet, FlatList, ScrollView, Text } from "react-native";
import { Appbar, Title, Avatar, Card } from "react-native-paper";

const dummyRestaurant = [
    {
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/illico-bd1e8.appspot.com/o/food_cat%2Fmcdo.png?alt=media&token=42115631-04ab-46ea-862e-9edf005b0f55",
        title: "Mc Donald's",
        place: "Vijay Nagar"
    }
];

class SearchScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            place: dummyRestaurant
        };
    }
    switchTpMcdo = () => {
        this.props.navigation.navigate('RestaurantScreen');
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
                    <Title>Catégories</Title>
                    <FlatList
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
export default SearchScreen;
