// src/components/InterventionDetail.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const InterventionDetail = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { intervention } = route.params;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backButtonText}>{"< Retour"}</Text>
            </TouchableOpacity>
            <Text style={styles.header}>Intervention du {intervention.date}</Text>
            <View style={styles.card}>
                <View style={styles.row}>
                    <Text style={styles.title}>{intervention.title}</Text>
                    <Text style={styles.price}>{intervention.price || ''} €</Text>
                </View>
                <Text style={styles.subtitle}>{intervention.subtitle}</Text>
                <Text style={styles.descriptionTitle}>Description :</Text>
                <Text style={styles.description}>{intervention.description || 'Aucune description disponible'}</Text>
                <Text style={styles.rating}>{intervention.rating}</Text>
            </View>
            <TouchableOpacity style={styles.invoiceButton}>
                <Text style={styles.invoiceButtonText}>Afficher la facture</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f2f2f2',
    },
    backButton: {
        position: 'absolute',
        top: 40, // Ajuster la marge en haut
        left: 20,
        backgroundColor: '#0041C4',
        padding: 10,
        borderRadius: 10,
        zIndex: 1,
    },
    backButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 80, // Ajouter une marge en haut pour compenser le bouton de retour
        marginBottom: 20,
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        marginTop: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0041C4',
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0041C4',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
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
    rating: {
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
});

export default InterventionDetail;
