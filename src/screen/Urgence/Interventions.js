import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Interventions = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Interventions</Text>
            {/* Add your content here */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default Interventions;
