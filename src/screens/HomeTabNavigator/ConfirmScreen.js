import React, { Component } from "react";
import {
    View,
    StyleSheet,
    ScrollView,
    FlatList,
    SafeAreaView,
    Image,
    TouchableOpacity,
    Text,
    Dimensions
} from "react-native";
import {Card, Appbar, Button, Title, Switch} from "react-native-paper";
import CustomActionButton from "../../components/CustomActionButton";
import colors from "../../assets/colors";
import { connect } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const { width, height } = Dimensions.get('window');

class ConfirmScreen extends Component {
    render() {
        console.log(this.props.route.params.orderId);

        return (
            <View style={styles.container}>
                <View style={{flex:1}}>
                    <View style={{flex:1}}>
                        <SafeAreaView style={{flex:1}}>
                            <ScrollView>
                                <View style={{margin: 5}}>
                                    <View style={{flex:1, flexDirection: 'row'}}>
                                        <View style={{flex:1, justifyContent: 'center'}}>
                                            <Text style={{marginTop:15, marginLeft: 15, marginBottom: 15, fontFamily: 'Poppins-Bold', fontSize: 35}}>Félicitation !</Text>
                                        </View>
                                    </View>
                                    <View  style={{width: width, margin: 5}}><Image style={{ height: width - 100}} source = {{ uri : 'https://firebasestorage.googleapis.com/v0/b/illico-bd1e8.appspot.com/o/food_cat%2FGroup%20194%403x.png?alt=media&token=58b476dd-ab28-4557-a951-986e6146c895'}}/></View>
                                    <View style={[styles.menuCard,{marginLeft: 15, marginRight: 15, marginTop: 20}] }>
                                        <Text style={{marginTop: 7, marginLeft: 7, marginBottom: 7, fontFamily: 'Poppins-Bold'}}>Adresse de Récuperation :</Text>
                                        <Text style={{marginLeft: 7, marginBottom: 7,color: 'grey', fontFamily: 'Poppins-Medium'}}>27 Rue Jules Parent, Rueil-Malmaison 92500</Text>
                                        <Text style={{marginTop: 7, marginLeft: 7, marginBottom: 7, fontFamily: 'Poppins-Bold'}}>Adresse de Livraison :</Text>
                                        <Text style={{marginLeft: 7, marginBottom: 7,color: 'grey', fontFamily: 'Poppins-Medium'}}>27 Rue Jules Parent, Rueil-Malmaison 92500</Text>
                                    </View>
                                </View>
                            </ScrollView>
                        </SafeAreaView>
                    </View>
                    <View style={{height:100, marginBottom:8}}>
                        <View style={{justifyContent:"center", alignItems:"center"}}>
                            <CustomActionButton
                                style={{
                                    width: 300,
                                    backgroundColor: '#3BC14A',
                                    marginBottom: 10,
                                    marginTop: 10,
                                    borderRadius: 8,
                                }}
                                onPress={() => this.props.navigation.push('TrackScreen', {orderId : this.props.route.params.orderId})}
                            >
                                <Text style={{ color: "white",fontFamily: 'Poppins-SemiBold' }}>Suivre ma commande</Text>
                            </CustomActionButton>
                        </View>
                    </View>
                    </View>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2'
    },
    cardContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"baseline",
        padding:20
    },
    totalContainer:{
        flex:1,
        flexDirection:"row",
        justifyContent:"space-between",
        paddingTop: 15,
        paddingLeft: 20,
        paddingRight: 20
    },
    activeText: {
        fontFamily: 'Poppins-SemiBold'
    },
    inactiveText: {
        color: 'grey',
        fontFamily: 'Poppins-Medium'
    },
    menuCard: {
        flex: 1,
        justifyContent: 'center',
        borderWidth: 0.4,
        borderColor: 'white',
        borderRadius: 8,
        backgroundColor: 'white',
        padding: 15,
        marginBottom: 10,
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    }
});

const mapStateToProps = state => {
    return {
        cart: state.cart,
        currentUser: state.auth.currentUser
    };
};

export default connect(mapStateToProps, null)(ConfirmScreen);
