import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import photoprofil from '../../../assets/account-circle-fill.png'

const ProButton = ({ name, location, rating, time, price, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Image source={photoprofil} style={styles.icon} />
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.location}>{location} - {rating}★</Text>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.dataright}>{time}</Text>
                <Text style={styles.dataright}>{price}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginVertical: 5,
        elevation: 3,
    },
    icon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 15,
    },
    infoContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    location: {
        fontSize: 14,
        color: '#777',
    },
    detailsContainer: {
        alignItems: 'flex-end',
    },
    dataright: {
        fontSize: 14,
        color: '#000',
        fontWeight:'600'
    },

});

export default ProButton;
