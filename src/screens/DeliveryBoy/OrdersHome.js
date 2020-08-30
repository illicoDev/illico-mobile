import React, {Component} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View, StatusBar} from "react-native";
import {connect} from 'react-redux';
import colors from "../../assets/colors";
import CustomActionButton from "../../components/CustomActionButton";
import firestore from "@react-native-firebase/firestore";
import {snapshotToArray} from "../../helpers/firebaseHelpers";



class OrdersHome extends Component {
    constructor() {
        super();
        this.state = {
            orders: []
        }
    }
    componentDidMount() {
        this.subscriber = firestore().collection('order')
            .onSnapshot(() => {
                this.LoadOrders();
            });

        this.LoadOrders();
    }

    LoadOrders = () => {
        const serviceData = firestore().collection('order').get()
            .then(data => {
                let array = snapshotToArray(data);
                this.setState({orders : array });
            })
            .catch(error => console.error(error));
    };

    render() {
        console.log(this.state.orders);
        return (
            <View style={styles.container}>
                <View style={{flex:1}}>
                    <View style={{flex:1}}>
                        <StatusBar barStyle={'dark-content'}/>
                        <SafeAreaView style={{flex:1}}>
                            <ScrollView>
                                <View style={{margin: 5}}>
                                    <Text style={{marginTop:15, marginLeft: 15, marginBottom: 15, fontFamily: 'Poppins-Bold', fontSize: 18}}>Commandes Disponibles</Text>

                                    <View style={[styles.menuCard, {margin: 15}]}>
                                        <View style={{flex:1, flexDirection: 'row', }}>
                                            <View   style={{flex: 1}}>
                                                <View   style={{flex: 1,marginBottom: 3}}><Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 18}}>Commande N</Text></View>
                                                <View   style={{flex: 1, marginBottom: 5}}><Text style={{fontWeight: "bold", color:colors.bgPrimary, textAlign: 'right', alignSelf: 'stretch'}}></Text></View>
                                            </View>
                                        </View>
                                        {this.state.orders.map(order => {
                                            return <View><Text>{order.customerId}</Text></View>
                                        })}
                                        <View style={{borderBottomColor: '#D8D8D8', borderBottomWidth: 1}}/>
                                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                            <CustomActionButton
                                                onPress={() => alert('manage order')}
                                                style={[styles.loginButtons, { borderColor: colors.bgError }]}
                                            >
                                                <Text style={{ color: "white",fontFamily: 'Poppins-SemiBold' }}>Prendre en main</Text>
                                            </CustomActionButton>
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
    },
    loginButtons: {
        borderRadius: 8,
        backgroundColor: colors.bgPrimary,
        marginTop: 10,
        marginBottom: 10,
        width: 200
    },
});

function mapStateToProps(state) {
    return {};
}
export default connect(
    mapStateToProps,
)(OrdersHome);
