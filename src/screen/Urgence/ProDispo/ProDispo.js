import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';

import ProButton from '../../../components/ProButton/ProButton';

import ButtonUrgence from '../../../components/ButtonUrgence/ButtonUrgence';
import arrow from '../../../../assets/arrow-right-s-line.png';
import flecheretour from '../../../../assets/arrow-left-line.png'

const { width } = Dimensions.get('window');

function ProDispo({ route, navigation }) {
    const { service, problemDescription, estimatedTime, images } = route.params;

    const handleBack = () => {
        navigation.goBack(); // Fonction de navigation pour revenir en arrière
    };

    const professionals = [
        { name: 'Maximilien Dumont', location: 'Brunoy', rating: '4,5', time: '20 min', price: '~30 €' },
        { name: 'Maximilien Dumont', location: 'Lieusaint', rating: '4,6', time: '50 min', price: '~50 €' },
        { name: 'Maximilien Dumont', location: 'Montreuil', rating: '4,3', time: '40 min', price: '~70 €' },
        { name: 'Maximilien Dumont', location: 'Vincennes', rating: '4,7', time: '25 min', price: '~60 €' },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Image source={flecheretour} style={styles.flechestyle} />
                </TouchableOpacity>
                <Text style={styles.header}>{service}</Text>
            </View>
            <View style={styles.content}>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <Text style={styles.greeting}>Disponibles à proximité</Text>
                    <Text style={styles.instructions}>Choisissez un ouvrier pour accéder à sa fiche complète.</Text>

                    {professionals.map((pro, index) => (
                        <View key={index}>
                            <ProButton
                                name={pro.name}
                                location={pro.location}
                                rating={pro.rating}
                                time={pro.time}
                                price={pro.price}
                                onPress={() => navigation.navigate('ProInfo', { pro })}

                            />
                            {index < professionals.length - 1 && <View style={styles.separator} />}
                        </View>
                    ))}



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
        // marginVertical: 10,
    },
});

export default ProDispo;
