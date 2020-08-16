import React, { Component } from "react";
import {View, StyleSheet, ScrollView, FlatList, SafeAreaView, Image, TouchableOpacity, Text} from "react-native";
import {Card, Appbar, Button, Title} from "react-native-paper";
import CustomActionButton from "../../components/CustomActionButton";
import colors from "../../assets/colors";
import { connect } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

class CartScreen extends Component {
  deleteItem = async (selectedItem, index) => {
    try {
      await this.props.deleteItem(selectedItem);
    } catch (error) {
      console.log(error);
    }
  };
  proccedCheckout = (cart, currentUser) => {
    let generatedUUID = uuid.v1();
      let newOrder = {
        orderId: generatedUUID,
        pickupDate: new Date(),
        orderDate: new Date(),
        customerId: currentUser.email,
        status: 'CONFIRMED',
        items: cart.items,
      };
      firestore().collection('order').add(newOrder)
        .then( snapshot => {
          console.log("order added !");
          this.props.emptyCart();
          this.props.navigation.push('ConfirmScreen', {orderId : snapshot.id});
        })
        .catch(error => {
          console.error('something went wrong' + error);
        })
};
  render() {
    console.log(this.props.cart);
    return (
        <View style={styles.container}>
          <View style={{flex:1}}>
            <View style={{flex:1}}>
              <SafeAreaView style={{flex:1}}>
              <ScrollView>
                <View style={{margin: 5}}>
                  <Text style={{marginTop:15, marginLeft: 15, marginBottom: 15, fontFamily: 'Poppins-Bold', fontSize: 18}}>Votre Panier</Text>
                </View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.props.cart.items}
                    keyExtractor={(item, index) => item.title}
                    renderItem={({ item: rowData }, index) => {
                      return (
                          <View style={[styles.menuCard,{marginLeft: 15, marginRight: 15}] }>
                            <View style={{flex:1, flexDirection: 'row'}}>
                              <View  style={{width: 38, flexDirection: 'column', borderWidth: 1, borderColor: '#CCCCCC', borderRadius:5, alignItems: 'center', justifyContent: 'center'}}>
                                <TouchableOpacity style={{flex:1,alignItems: 'center', justifyContent: 'center'}} onPress={() => alert(' add item')}>
                                  <View ><Text>+</Text></View>
                                </TouchableOpacity>
                                <View style={{flex:1,alignItems: 'center', justifyContent: 'center'}}><Text>{rowData.qte}</Text></View>
                                <TouchableOpacity style={{flex:1,alignItems: 'center', justifyContent: 'center'}} onPress={() => alert('sub item')}>
                                  <View ><Text>-</Text></View>
                                </TouchableOpacity>
                              </View>
                              <View  style={{width: 70, margin: 5}}><Image style={{width: 70, height: 70}} source = {{ uri : 'https://firebasestorage.googleapis.com/v0/b/illico-bd1e8.appspot.com/o/food_cat%2Ffrite.png?alt=media&token=d0613077-c2a2-4833-9920-1e30cfdb39af'}}/></View>
                              <View   style={{flex: 1}}>
                                <View   style={{flex: 1,marginBottom: 3}}><Text style={{fontFamily: 'Poppins-SemiBold'}}>{rowData.title}</Text></View>
                                <View   style={{flex: 1, marginBottom: 5}}><Text style={{fontFamily: 'Poppins-SemiBold', color:colors.bgPrimary}}>{rowData.price} Dh</Text></View>
                                <View   style={{flex: 1, marginBottom: 5}}><Text></Text></View>
                              </View>
                              <View  style={{width: 20, flexDirection: 'column'}}>
                                <TouchableOpacity style={{flex:1,alignItems: 'center'}} onPress={() => this.deleteItem(rowData, index)}>
                                  <Image source = {require('../../../assets/img/cartdelete.png')}/>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                      );
                    }}
                />
              </ScrollView>
              </SafeAreaView>
            </View>
            <View style={{height:200, marginBottom:8}}>
              <View style={styles.totalContainer}><Text style={{fontFamily: 'Poppins-Regular'}}>Panier</Text><Text style={{fontFamily: 'Poppins-Medium'}}>{this.props.cart.totalPrice} Dh</Text></View>
              <View style={styles.totalContainer}><Text style={{fontFamily: 'Poppins-Regular'}}>Livraison</Text><Text style={{fontFamily: 'Poppins-Medium'}}>{this.props.cart.delivery} Dh</Text></View>
              <View style={{borderBottomColor: '#D8D8D8', borderBottomWidth: 1, marginLeft: 20, marginRight: 20}}/>
              <View style={styles.totalContainer}><Text style={{fontFamily: 'Poppins-Regular'}}>Total</Text><Text style={{fontSize: 18, fontFamily: 'Poppins-SemiBold'}}>{this.props.cart.total} Dh</Text></View>
              <View style={{justifyContent:"center", alignItems:"center"}}>
                <CustomActionButton
                    disabled={!this.props.cart.items.length > 0}
                    style={{
                      width: 300,
                      backgroundColor: (this.props.cart.items.length > 0) ? '#3BC14A' : 'grey',
                      marginBottom: 10,
                      marginTop: 10,
                      borderRadius: 8,
                    }}
                    onPress={() => this.proccedCheckout(this.props.cart, this.props.currentUser)}
                >
                  <Text style={{ color: "white",fontFamily: 'Poppins-SemiBold' }}>Passer la commande</Text>
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

/*const mapDispatchToProps = dispatch => {
  return {
    loadBooks: books =>
        dispatch({ type: "LOAD_BOOKS_FROM_SERVER", payload: books }),
    addBook: book => dispatch({ type: "ADD_BOOK", payload: book }),
    markBookAsRead: book =>
        dispatch({ type: "MARK_BOOK_AS_READ", payload: book }),
    toggleIsLoadingBooks: bool =>
        dispatch({ type: "TOGGLE_IS_LOADING_BOOKS", payload: bool }),
    markBookAsUnread: book =>
        dispatch({ type: "MARK_BOOK_AS_UNREAD", payload: book }),
    deleteBook: book => dispatch({ type: "DELETE_BOOK", payload: book }),
    updateBookImage: book =>
        dispatch({ type: "UPDATE_BOOK_IMAGE", payload: book })
  };
};*/
const mapDispatchToProps = dispatch => {
  return {
    deleteItem: item => dispatch({ type: "DELETE_ITEM", payload: item }),
    emptyCart: () => dispatch({ type: "EMPTY_CART", payload: null})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
