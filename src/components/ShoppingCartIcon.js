import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Platform
} from "react-native";

import { connect } from 'react-redux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from "../../assets/colors";

const ShoppingCartIcon = (props) => (
    <View style={[{ padding: 5 }, Platform.OS === 'android' ? styles.iconContainer : null]}>
        { props.cartItems.items.length > 0 ? <View style={{
            position: 'absolute', height: 30, width: 30, borderRadius: 15, backgroundColor: colors.bgPrimary, right: 15, bottom: 15, alignItems: 'center', justifyContent: 'center', zIndex: 2000,

        }}>
            <Text style={{ color: 'white', fontFamily: 'Poppins-SemiBold' }}>{props.cartItems.items.length}</Text>
        </View>: <View/>}
        <MaterialCommunityIcons name="cart-outline" color={props.color} size={props.size} />
    </View>
)

const mapStateToProps = (state) => {
    return {
        cartItems: state.cart
    }
};

export default connect(mapStateToProps)(ShoppingCartIcon);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconContainer: {
        paddingLeft: 20, paddingTop: 10, marginRight: 5
    }
});
