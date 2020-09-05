import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions} from "react-native";
import {TabView, TabBar, SceneMap, PagerPan} from 'react-native-tab-view';
import colors from "../../../assets/colors";

const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;

const initialLayout = {
    height: screen_height,
    width: screen_width,
};

class PressingScreen extends Component {
    constructor(props) {
        super(props);
        super(props);
        this.state = {
            loading: true,
            index: 0,
            routes: [
                {key: 'first', title: 'Pressing Complet'},
                {key: 'second', title: 'Repassage'},
            ],
        }
    }
    changeIndex=(index)=>{
        this.setState({index})
    };

    renderScene = ({route}) => {
        switch (route.key) {
            case 'first':
                return this.renderFirstMenu();
            case 'second':
                return this.renderSecondMenu();
        }
    };
    renderFirstMenu = () => {
        return <View><Text>Pressing Complet</Text></View>;
    };
    renderSecondMenu = () => {
        return <View><Text>Repassage</Text></View>;
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex:1}}>
                            <View style={{flex:1}}>
                                <SafeAreaView style={{flex:1}}>
                                    <ScrollView>
                                        <View style={{margin: 5}}>
                                            <Text style={{marginTop:15, marginLeft: 15, marginBottom: 15, fontFamily: 'Poppins-Bold', fontSize: 18}}>Service Pressing</Text>
                                        </View>
                                <View style={{alignItems: 'center', justifyContent: 'center'}}>

                                    <View style={styles.tabStyle}>
                                        <TouchableOpacity onPress={()=>this.changeIndex(0)} style={[styles.labelView,this.state.index===0?styles.labelViewActive:'']}>
                                            <Text style={this.state.index===0?styles.labelTxtActive:styles.labelTxt}>Pressing Complet</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={()=>this.changeIndex(1)} style={[styles.labelView,this.state.index===1?styles.labelViewActive:'']}>
                                            <Text style={this.state.index===1?styles.labelTxtActive:styles.labelTxt}>Repassage</Text>
                                        </TouchableOpacity>

                                    </View>
                                    <TabView
                                        style={{marginTop: 15, width: '100%', flex: 1}}
                                        navigationState={this.state}
                                        renderScene={this.renderScene}
                                        onIndexChange={index => this.setState({index})}
                                        initialLayout={initialLayout}
                                        renderTabBar={() => null}
                                    />

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

    },tabStyle: {
        width: 300,
        height: 40,
        borderColor: '#D2D2D2',
        borderRadius: 20,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    labelView: {
        width: 150,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },labelTxt:{
        color: colors.bgPrimary,
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
    },
    labelTxtActive:{
        color:'#fff',
        fontSize: 14,
        fontFamily: 'Poppins-Bold',
    },labelViewActive:{
        backgroundColor: colors.bgPrimary
    }
});
function mapStateToProps(state) {
    return {};
}
export default connect(
    mapStateToProps,
)(PressingScreen);
