import React, { Component } from "react";
import {View, StyleSheet, ScrollView, FlatList, SafeAreaView, Image, TouchableOpacity, Text} from "react-native";
import {Card, Appbar, Button, Title, Switch} from "react-native-paper";
import CustomActionButton from "../../components/CustomActionButton";
import colors from "../../assets/colors";
import { connect } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

class TrackScreen extends Component {
    constructor() {
        super();
        this.state = {
            order : {},
            confirmed : {status : false, timestamp: ''},
            prepared : {status : false, timestamp: ''},
            onItWay : {status : false, timestamp: ''},
            delivered : {status : false, timestamp: ''},
        };
    }
    componentDidMount() {
        this.subscriber = firestore().collection('order').doc(this.props.route.params.orderId)
            .onSnapshot((doc => {
                if (doc.data().status === 'CONFIRMED'){
                        this.setState( {
                            order : doc.data(),
                            confirmed : {status : true, timestamp: '--:-- PM'},
                            prepared : {status : false, timestamp: 'EnCours'},
                            onItWay : {status : false, timestamp: ''},
                            delivered : {status : false, timestamp: ''}
                        });
                }
                if (doc.data().status === 'PREPARED') {
                    this.setState({
                        order: doc.data(),
                        confirmed : {status : true, timestamp: '--:-- PM'},
                        prepared : {status : true, timestamp: '--:-- PM'},
                        onItWay : {status : false, timestamp: 'EnCours'},
                        delivered : {status : false, timestamp: ''},
                    });
                }
                if (doc.data().status === 'ONITWAY') {
                    this.setState({
                        order: doc.data(),
                        confirmed : {status : true, timestamp: '--:-- PM'},
                        prepared : {status : true, timestamp: '--:-- PM'},
                        onItWay : {status : true, timestamp: '--:-- PM'},
                        delivered : {status : false, timestamp: 'EnCours'},
                    });
                }
                if (doc.data().status === 'DELIVERED'){
                        this.setState( {
                            order : doc.data(),
                            confirmed : {status : true, timestamp: '--:-- PM'},
                            prepared : {status : true, timestamp: '--:-- PM'},
                            onItWay : {status : true, timestamp: '--:-- PM'},
                            delivered : {status : true, timestamp: '--:-- PM'},
                        });
                }
            }));
    }

    deleteItem = async (selectedItem, index) => {
        try {
            await this.props.deleteItem(selectedItem);
        } catch (error) {
            console.log(error);
        }
    };
    render() {
        console.log(this.state.order);
        console.log(this.props.route.params.orderId);
        console.log(this.state);

        return (
            <View style={styles.container}>
                <View style={{flex:1}}>
                    <View style={{flex:1}}>
                        <SafeAreaView style={{flex:1}}>
                            <ScrollView>
                                <View style={{margin: 5}}>
                                    <View style={{flex:1, flexDirection: 'row'}}>
                                        <View style={{flex:1, justifyContent: 'center'}}>
                                            <Text style={{marginTop:15, marginLeft: 15, marginBottom: 15, fontFamily: 'Poppins-Bold', fontSize: 18}}>Status de Votre Commande</Text>
                                        </View>
                                        <View  style={{width: 170, margin: 5}}><Image style={{width: 170, height: 170}} source = {{ uri : 'https://firebasestorage.googleapis.com/v0/b/illico-bd1e8.appspot.com/o/food_cat%2FGroup%20194%403x.png?alt=media&token=58b476dd-ab28-4557-a951-986e6146c895'}}/></View>
                                    </View>

                                    <View style={[styles.menuCard,{marginLeft: 15, marginRight: 15, marginTop: 20}] }>
                                        <Text style={{marginTop: 7, marginLeft: 7, marginBottom: 7, fontFamily: 'Poppins-Bold'}}>Adresse de Livraison :</Text>
                                        <Text style={{marginLeft: 7, marginBottom: 7,color: 'grey', fontFamily: 'Poppins-Medium'}}>27 Rue Jules Parent, Rueil-Malmaison 92500</Text>
                                    </View>

                                    <View style={[styles.menuCard,{marginLeft: 15, marginRight: 15}] }>
                                        <View style={{flex:1, flexDirection: 'row', marginTop: 5, marginBottom: 5}}>
                                            <View  style={{width: 38, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                                                <MaterialCommunityIcons color={this.state.confirmed.status ? colors.bgPrimary : 'grey' } name={ this.state.confirmed.status ? 'checkbox-marked' : 'checkbox-blank-outline'} size={25} />
                                            </View>
                                            <View   style={{flex: 1}}>
                                                <View   style={{flex: 1,marginBottom: 3, justifyContent: 'center'}}><Text style={this.state.confirmed.status ? styles.activeText : styles.inactiveText}>Commande confirmée</Text></View>
                                            </View>
                                            <View  style={{width: 70, flexDirection: 'column'}}>
                                                <View   style={{flex: 1,marginBottom: 3}}><Text style={{color : 'grey', fontFamily: 'Poppins-Regular'}}>{this.state.confirmed.timestamp}</Text></View>
                                            </View>
                                        </View>

                                        <View style={{flex:1, flexDirection: 'row', marginTop: 5, marginBottom: 5}}>
                                            <View  style={{width: 38, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                                                <MaterialCommunityIcons color={this.state.prepared.status ? colors.bgPrimary : 'grey' } name={ this.state.prepared.status ? 'checkbox-marked' : 'checkbox-blank-outline'} size={25} />
                                            </View>
                                            <View   style={{flex: 1}}>
                                                <View   style={{flex: 1,marginBottom: 3, justifyContent: 'center'}}><Text style={this.state.prepared.status ? styles.activeText : styles.inactiveText}>Encours de préparation</Text></View>
                                            </View>
                                            <View  style={{width: 70, flexDirection: 'column'}}>
                                                <View   style={{flex: 1,marginBottom: 3}}><Text style={{color : 'grey', fontFamily: 'Poppins-Regular'}}>{this.state.prepared.timestamp}</Text></View>
                                            </View>
                                        </View>

                                        <View style={{flex:1, flexDirection: 'row', marginTop: 5, marginBottom: 5}}>
                                            <View  style={{width: 38, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                                                <MaterialCommunityIcons color={this.state.onItWay.status ? colors.bgPrimary : 'grey' } name={ this.state.onItWay.status ? 'checkbox-marked' : 'checkbox-blank-outline'} size={25} />
                                            </View>
                                            <View   style={{flex: 1}}>
                                                <View   style={{flex: 1,marginBottom: 3, justifyContent: 'center'}}><Text style={this.state.onItWay.status ? styles.activeText : styles.inactiveText}>Livreur en chemin</Text></View>
                                            </View>
                                            <View  style={{width: 70, flexDirection: 'column'}}>
                                                <View   style={{flex: 1,marginBottom: 3}}><Text style={{color : 'grey', fontFamily: 'Poppins-Regular'}}>{this.state.onItWay.timestamp}</Text></View>
                                            </View>
                                        </View>

                                        <View style={{flex:1, flexDirection: 'row', marginTop: 5, marginBottom: 5}}>
                                            <View  style={{width: 38, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                                                <MaterialCommunityIcons color={this.state.delivered.status ? colors.bgPrimary : 'grey' } name={ this.state.delivered.status ? 'checkbox-marked' : 'checkbox-blank-outline'} size={25} />
                                            </View>
                                            <View   style={{flex: 1}}>
                                                <View   style={{flex: 1,marginBottom: 3, justifyContent: 'center'}}><Text style={this.state.delivered.status ? styles.activeText : styles.inactiveText}>Commande Livrée</Text></View>
                                            </View>
                                            <View  style={{width: 70, flexDirection: 'column'}}>
                                                <View   style={{flex: 1,marginBottom: 3}}><Text style={{color : 'grey', fontFamily: 'Poppins-Regular'}}>{this.state.delivered.timestamp}</Text></View>
                                            </View>
                                        </View>

                                    </View>

                                </View>
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
const mapDispatchToProps = dispatch => {
    return {
        deleteItem: item => dispatch({ type: "DELETE_ITEM", payload: item }),
        emptyCart: () => dispatch({ type: "EMPTY_CART", payload: null})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackScreen);
