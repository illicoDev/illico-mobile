import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, FlatList} from "react-native";
import {TabView} from "react-native-tab-view";
import colors from "../../../assets/colors";
import CustomActionButton from "../../components/CustomActionButton";
import {Card} from "react-native-paper";
import firestore from "@react-native-firebase/firestore";
import {snapshotToArray} from "../../helpers/firebaseHelpers";

function mapStateToProps(state) {
    return {};
}

class FoodScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            place: []
        };

    }
    componentDidMount() {
        this.getPlaces();
    }
    getPlaces = () => {
        const placesData = firestore().collection('resto').get()
            .then(data => {
                let placesArray = snapshotToArray(data);
                this.setState({place : placesArray })
            })
            .catch(error => console.error(error));
    };
    switchToMerchant = () => {
        this.props.navigation.push('RestaurantScreen');
    };
    render() {
        return (

            <View style={styles.container}>
                <View style={{flex:1}}>
                    <View style={{flex:1}}>
                        <SafeAreaView style={{flex:1}}>
                            <ScrollView>
                                <View style={{margin: 5}}>
                                    <Text style={{marginTop:15, marginLeft: 15, marginBottom: 15, fontFamily: 'Poppins-Bold', fontSize: 18}}>Livraison Food</Text>
                                </View>
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
                        </SafeAreaView>
                    </View>
                </View>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

    }
});
export default connect(mapStateToProps,)(FoodScreen);
