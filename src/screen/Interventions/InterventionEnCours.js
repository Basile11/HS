// src/components/InterventionEnCours.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const InterventionEnCours = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { intervention } = route.params;

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backButtonText}>{"< Retour"}</Text>
            </TouchableOpacity>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Intervention en cours</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.title}>{intervention.title}</Text>
                <Text style={styles.subtitle}>{intervention.subtitle}</Text>
                <Text style={styles.description}>Durée estimée : {intervention.duration}</Text>
                <Text style={styles.status}>Statut : En cours</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f2f2f2',
    },
    backButton: {
        position: 'absolute',
        top: 40,
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
    headerContainer: {
        marginTop: 80,
        marginBottom: 20,
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0041C4',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
    },
    status: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
    },
});

export default InterventionEnCours;
