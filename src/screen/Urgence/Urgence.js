import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function Urgence({ navigation }) {
    React.useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
            e.preventDefault(); // Prevent default behavior of going back
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Accueil</Text>
            <Text style={styles.subHeader}>Besoin d'aide ?</Text>
            <Text style={styles.description}>Sélectionnez le domaine pour lequel vous avez besoin d'un professionnel.</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Plombier</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Serrurier</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Électricien</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Chauffagiste</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Dératiseur</Text>
            </TouchableOpacity>
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
    subHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#fff',
        borderColor: '#007bff',
        borderWidth: 1,
        borderRadius: 5,
        padding: 15,
        marginBottom: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#007bff',
        fontSize: 16,
    },
});

export default Urgence;
