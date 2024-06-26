// src/components/InterventionEnCours.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image, Alert, Platform } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import { ref, update } from 'firebase/database';
import { database } from '../../../firebase';

import flecheretour from '../../../assets/arrow-left-line.png'
const { width } = Dimensions.get('window');

const InterventionEnCours = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { intervention, userId } = route.params;

    const handleBack = () => {
        navigation.goBack(); // Fonction de navigation pour revenir en arrière
    };

    const handlePayment = (intervention) => {
        // const interventionRef = ref(database, `interventions/${intervention.userId}/${intervention.id}`);
        const interventionRef = ref(database, `interventions/${userId}/${intervention.id}`);
        update(interventionRef, { status: 'past' })
            .then(() => {
                Alert.alert('Succès', 'L\'intervention a payée avec succès');
                navigation.goBack();
            })
            .catch((error) => {
                Alert.alert('Erreur', 'Une erreur s\'est produite lors du paiement.');
                console.error(error);
            });
    };

    return (


            // <View style={styles.card}>
            //     <Text style={styles.title}>{intervention.title}</Text>
            //     <Text style={styles.subtitle}>{intervention.subtitle}</Text>
            //     <Text style={styles.description}>Durée estimée : {intervention.duration}</Text>
            //     <Text style={styles.status}>Statut : En cours</Text>
            // </View>


        <View style={styles.container}>

            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Image source={flecheretour} style={styles.flechestyle} />
                </TouchableOpacity>
                <Text style={styles.header}>Intervention en cours</Text>
            </View>

            <View style={styles.content}>


                <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.card}>
                        <View style={styles.row}>
                            <Text style={styles.title}>{intervention.title}</Text>
                            {intervention.status === 'bePaid' && (
                                <Text style={styles.price}>{intervention.price || ''} €</Text>
                            )}
                        </View>
                        <Text style={styles.subtitle}>{intervention.subtitle}</Text>
                        <Text style={styles.descriptionTitle}>Description :</Text>
                        <Text style={styles.description}>{intervention.description || 'Aucune description disponible'}</Text>
                        {/* <Text style={styles.rappel}>Pro infos ? Lieux ? Durée ?</Text> */}

                        {/* Display images */}
                        {intervention.photos && intervention.photos.length > 0 && (
                            <View style={styles.imagesContainer}>
                                {intervention.photos.map((photoUrl, index) => (
                                    <Image key={index} source={{ uri: photoUrl }} style={styles.image} />
                                ))}
                            </View>
                        )}


                    </View>
                    {/* <TouchableOpacity style={styles.invoiceButton} >
                        <Text style={styles.invoiceButtonText}>Payer l'intervention</Text>
                    </TouchableOpacity> */}
                    {intervention.status === 'bePaid' && (
                        <TouchableOpacity 
                            style={styles.invoiceButton} 
                            onPress={() => handlePayment(intervention)}
                        >
                            <Text style={styles.invoiceButtonText}>Payer l'intervention</Text>
                        </TouchableOpacity>
                    )}
                </ScrollView>
            </View> 
        </View>
    );
};

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
        fontSize: 25,
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#0041C4',
    },
    // subtitle: {
    //     fontSize: 18,
    //     color: '#666',
    //     marginBottom: 10,
    // },
    subtitle: {
        fontSize: 18,
        // color: '#666',
        marginBottom: 30,
        fontStyle:'italic'
    },
    descriptionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    description: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
    },
    invoiceButton: {
        backgroundColor: '#0041C4',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    invoiceButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    imagesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingVertical: width * 0.1
    },
    image: {
        width: width * 0.4,
        height: width * 0.5,
        borderRadius: 10,
        marginBottom: 10,
    },
    rappel:{
        fontSize: 16,
        color: 'red',
        fontWeight: 'bold',  
    }
});

export default InterventionEnCours;
