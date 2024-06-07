import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const ButtonUrgence = ({ text, imageSource, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{text}</Text>
            <Image source={imageSource} style={styles.logourgence} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderColor: '#0041C4',
        borderWidth: 1,
        borderRadius: 10,
        padding: width * 0.07,
        marginBottom: 10,
    },
    buttonText: {
        color: '#0041C4',
        fontSize: 16,
        fontWeight: '500',
    },
    logourgence: {
        width: 24,
        height: 24,
    },
});

export default ButtonUrgence;
