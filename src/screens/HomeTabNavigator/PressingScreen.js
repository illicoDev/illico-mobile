import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Dimensions,
    Image,
    FlatList
} from "react-native";
import {TabView, TabBar, SceneMap, PagerPan} from 'react-native-tab-view';
import colors from "../../../assets/colors";
import firestore from "@react-native-firebase/firestore";
import {snapshotToArray} from "../../helpers/firebaseHelpers";
import {Card} from "react-native-paper";

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
            pressingList: [],
            loading: true,
            index: 0,
            routes: [
                {key: 'first', title: 'Pressing Complet'},
                {key: 'second', title: 'Repassage'},
            ],
        }
    }

    async componentDidMount() {
        this.LoadServices();
    }

    LoadServices = () => {
        const serviceData = firestore().collection('pressing').get()
            .then(data => {
                let array = snapshotToArray(data);
                this.setState({pressingList : array });
            })
            .catch(error => console.error(error));
    };

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
        return (
        <View>
            <View style={[styles.menuCard,{marginLeft: 15, marginRight: 15}] }>
                <View style={{flex:1, flexDirection: 'row'}}>
                    <View  style={{width: 38, flexDirection: 'column', borderWidth: 1, borderColor: '#CCCCCC', borderRadius:5, alignItems: 'center', justifyContent: 'center'}}>
                        <TouchableOpacity style={{flex:1,alignItems: 'center', justifyContent: 'center'}} onPress={() => alert("add")}>
                            <View ><Text>+</Text></View>
                        </TouchableOpacity>
                        <View style={{flex:1,alignItems: 'center', justifyContent: 'center'}}><Text>0</Text></View>
                        <TouchableOpacity style={{flex:1,alignItems: 'center', justifyContent: 'center'}} onPress={() => alert("sub")}>
                            <View ><Text>-</Text></View>
                        </TouchableOpacity>
                    </View>
                    <View  style={{width: 70, margin: 5}}><Image style={{width: 70, height: 70}} source = {{ uri : 'https://firebasestorage.googleapis.com/v0/b/illico-bd1e8.appspot.com/o/perssing%2Fchemise-cintre.jpg?alt=media&token=7f3bd941-adc2-4bba-b518-7700f4f2c420'}}/></View>
                    <View   style={{flex: 1}}>
                        <View   style={{flex: 1,marginBottom: 3}}><Text style={{fontFamily: 'Poppins-SemiBold'}}>Chemise sur cintre (H/F)</Text></View>
                        <View   style={{flex: 1, marginBottom: 5}}><Text>Votre chemise lavée et repassée à la main vous est livrée sur cintre</Text></View>
                        <View   style={{flex: 1, marginBottom: 5}}><Text style={{fontFamily: 'Poppins-SemiBold', color:colors.bgPrimary}}>19 Dh</Text></View>
                    </View>
                </View>
                <View style={{borderBottomColor: '#D8D8D8', borderBottomWidth: 1, marginLeft: 20, marginRight: 20, marginTop: 8, marginBottom: 8}}/>
                <View style={{flex:1, flexDirection: 'row'}}>
                    <View  style={{width: 38, flexDirection: 'column', borderWidth: 1, borderColor: '#CCCCCC', borderRadius:5, alignItems: 'center', justifyContent: 'center'}}>
                        <TouchableOpacity style={{flex:1,alignItems: 'center', justifyContent: 'center'}} onPress={() => alert("add")}>
                            <View ><Text>+</Text></View>
                        </TouchableOpacity>
                        <View style={{flex:1,alignItems: 'center', justifyContent: 'center'}}><Text>0</Text></View>
                        <TouchableOpacity style={{flex:1,alignItems: 'center', justifyContent: 'center'}} onPress={() => alert("sub")}>
                            <View ><Text>-</Text></View>
                        </TouchableOpacity>
                    </View>
                    <View  style={{width: 70, margin: 5}}><Image style={{width: 70, height: 70}} source = {{ uri : 'https://firebasestorage.googleapis.com/v0/b/illico-bd1e8.appspot.com/o/perssing%2Fchemise-cintre.jpg?alt=media&token=7f3bd941-adc2-4bba-b518-7700f4f2c420'}}/></View>
                    <View   style={{flex: 1}}>
                        <View   style={{flex: 1,marginBottom: 3}}><Text style={{fontFamily: 'Poppins-SemiBold'}}>Chemise pliée (H/F)</Text></View>
                        <View   style={{flex: 1, marginBottom: 5}}><Text></Text></View>
                        <View   style={{flex: 1, marginBottom: 5}}><Text style={{fontFamily: 'Poppins-SemiBold', color:colors.bgPrimary}}>19 Dh</Text></View>
                    </View>
                </View>
            </View>
        </View>
        );
    };
    renderSecondMenu = () => {
        return (
            <View>
                <View style={[styles.menuCard,{marginLeft: 15, marginRight: 15}] }>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.pressingList}
                        renderItem={({ item, index } ) => {
                            return (
                                <View>
                                    <View style={{flex:1, flexDirection: 'row'}}>
                                        <View  style={{width: 38, flexDirection: 'column', borderWidth: 1, borderColor: '#CCCCCC', borderRadius:5, alignItems: 'center', justifyContent: 'center'}}>
                                            <TouchableOpacity style={{flex:1,alignItems: 'center', justifyContent: 'center'}} onPress={() => alert("add")}>
                                                <View ><Text>+</Text></View>
                                            </TouchableOpacity>
                                            <View style={{flex:1,alignItems: 'center', justifyContent: 'center'}}><Text>0</Text></View>
                                            <TouchableOpacity style={{flex:1,alignItems: 'center', justifyContent: 'center'}} onPress={() => alert("sub")}>
                                                <View ><Text>-</Text></View>
                                            </TouchableOpacity>
                                        </View>
                                        <View  style={{width: 70, margin: 5}}><Image style={{width: 70, height: 70}} source = {{ uri : item.image}}/></View>
                                        <View   style={{flex: 1}}>
                                            <View   style={{flex: 1,marginBottom: 3}}><Text style={{fontFamily: 'Poppins-SemiBold'}}>{item.title}</Text></View>
                                            <View   style={{flex: 1, marginBottom: 5}}><Text>{item.desc}</Text></View>
                                            <View   style={{flex: 1, marginBottom: 5}}><Text style={{fontFamily: 'Poppins-SemiBold', color:colors.bgPrimary}}>{item.price} Dh</Text></View>
                                        </View>
                                    </View>
                                    { index !== (this.state.pressingList.length - 1) &&
                                        <View style={{borderBottomColor: '#D8D8D8', borderBottomWidth: 1, marginLeft: 20, marginRight: 20, marginTop: 8, marginBottom: 8}}/>}
                                </View>
                            );
                        }}
                    />
                </View>
            </View>
        );
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
function mapStateToProps(state) {
    return {};
}
export default connect(
    mapStateToProps,
)(PressingScreen);
