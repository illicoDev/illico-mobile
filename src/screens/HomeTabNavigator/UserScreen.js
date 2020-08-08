import React, {Component} from 'react';
import {View, Text, SafeAreaView, ScrollView, StyleSheet, Image} from 'react-native';
import {connect} from 'react-redux';
import colors from "../../assets/colors";

class UserScreen extends Component {
    constructor() {
        super();
        this.state = {
            currentUser: {}
        };
    }
    render() {
        return (
            <View style={styles.container}>
            <View style={{flex:1}}>
                <View style={{flex:1}}>
                    <SafeAreaView style={{flex:1}}>
                        <ScrollView>
                            <View style={{margin: 5}}>
                                <Text style={{marginTop:15, marginLeft: 15, marginBottom: 15, fontFamily: 'Poppins-Bold', fontSize: 18}}>Votre Profil</Text>
                            </View>
                            <View style={styles.menuCard}>
                                <View style={{flex:1, flexDirection: 'row', }}>
                                    <View  style={{width: 70, margin: 8}}><Image style={{borderRadius: 40}} source = {require('../../../assets/img/placeholder.png')}/></View>
                                    <View   style={{flex: 1}}>
                                        <View   style={{flex: 1,marginBottom: 3}}><Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 18}}>{this.props.currentUser.email}</Text></View>
                                        <View   style={{flex: 1, marginBottom: 5}}><Text style={{color: colors.bgPrimary}}>Modifer</Text></View>
                                        <View   style={{flex: 1, marginBottom: 5}}><Text style={{fontWeight: "bold", color:colors.bgPrimary, textAlign: 'right', alignSelf: 'stretch'}}></Text></View>
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

const mapStateToProps = state => {
    return {
        currentUser: state.auth.currentUser
    };
};
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
    }
});
export default connect(mapStateToProps,null)(UserScreen);
