
import React from 'react';
import { View, Text } from 'react-native';



const ExCompo = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Exemple de composant</Text>
        </View>
    );
};
const styles = {
    container: {
        borderRadius: 50,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    }
};



export default ExCompo;

