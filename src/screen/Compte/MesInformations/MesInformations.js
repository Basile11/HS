import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native';

import flecheretour from '../../../../assets/arrow-left-line.png';

const { width } = Dimensions.get('window');

const MesInformations = ({ navigation }) => {
    const handleBack = () => {
        navigation.goBack(); // Fonction de navigation pour revenir en arrière
    };
    
    return (
        <View style={styles.container}>

            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Image source={flecheretour} style={styles.flechestyle} />
                </TouchableOpacity>
                <Text style={styles.header}>Mes Informations</Text>
            </View>
            
            <View style={styles.content}>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Prénom </Text>
                        <TextInput style={styles.input} defaultValue ="Basile"  />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Nom </Text>
                        <TextInput style={styles.input} defaultValue ="Truquin"  />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Adresse mail </Text>
                        <TextInput style={styles.input} defaultValue ="adresse.mail@gmail.com" />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Ville </Text>
                        <TextInput style={styles.input} defaultValue ="Vincennes" />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Code postal </Text>
                        <TextInput style={styles.input} defaultValue ="94190" />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Adresse </Text>
                        <TextInput style={styles.input} defaultValue ="12 Avenue de la République" />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Information complémentaire</Text>
                        <TextInput style={styles.input} defaultValue ="1er étage à gauche" />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Numéro de téléphone </Text>
                        <TextInput style={styles.input} defaultValue ="0612345678"  />
                    </View>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Enregistrer</Text>
                    </TouchableOpacity>
                </ScrollView>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: '20%',
        backgroundColor: '#0041C4',
    },
    headerContainer: {
        flexDirection: 'row',
    },
    backButton: {
        height: 30, 
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#fff',
        paddingHorizontal: '3%',
    },
    flechestyle: {
        width: width * 0.10, 
        height: width * 0.10,
        borderRadius: 25,
        marginLeft: 10,
    },

    content: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: width * 0.05,
        paddingVertical: width * 0.05, 
    },
    contentContainer: {
        flexGrow: 1,
    },


    formGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
    },
    input: {
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderRadius: 5,
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#0041C4',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MesInformations;