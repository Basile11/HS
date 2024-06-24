import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, Image } from 'react-native';
import { ref, query, orderByChild, equalTo, onValue, getDatabase } from 'firebase/database';
import { database } from '../../../../firebase'; // Assurez-vous que le chemin est correct

import ProButton from '../../../components/ProButton/ProButton';
import flecheretour from '../../../../assets/arrow-left-line.png';

const { width } = Dimensions.get('window');

function ProDispo({ route, navigation }) {
    const { service, problemDescription, estimatedTime, images, emergency } = route.params;

    const [professionals, setProfessionals] = useState([]);

    const handleBack = () => {
        navigation.goBack(); // Fonction de navigation pour revenir en arrière
    };

    useEffect(() => {
        const db = getDatabase();
        const professionalsRef = query(ref(db, 'professionnel'), orderByChild('job'), equalTo(service));
        
        console.log("Fetching professionals for service:", service);
        
        onValue(professionalsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const filteredProfessionals = Object.values(data);
                setProfessionals(filteredProfessionals);
                console.log("Filtered professionals:", filteredProfessionals);
            } else {
                console.log("No data found for the given service:", service);
            }
        }, (error) => {
            console.error("Error fetching data:", error);
        });
    }, [service]);

    const renderItem = ({ item }) => (
        <ProButton
            name={`${item.firstName} ${item.lastName}`}
            location={item.city}
            rating={item.rating || 'N/A'}
            time={item.time || 'N/A'}
            price={item.price || 'N/A'}
            onPress={() => navigation.navigate('ProInfo', { pro: item, service, problemDescription, estimatedTime, images, emergency })}
        />
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Image source={flecheretour} style={styles.flechestyle} />
                </TouchableOpacity>
                <Text style={styles.header}>{service}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.greeting}>Disponibles à proximité</Text>
                <Text style={styles.instructions}>Choisissez un ouvrier pour accéder à sa fiche complète.</Text>
                <FlatList
                    data={professionals}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    contentContainerStyle={styles.contentContainer}
                />
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
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#fff',
        paddingHorizontal: width * 0.05,
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
    },
    contentContainer: {
        flexGrow: 1,
    },
    greeting: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: width * 0.03,
        paddingTop: width * 0.05, 
    },
    instructions: {
        fontSize: 14,
        color: '#969696',
        marginBottom: width * 0.08,
        fontWeight:'500',
    },
    separator: {
        height: 1,
        backgroundColor: '#E0E0E0',
    },
});

export default ProDispo;
