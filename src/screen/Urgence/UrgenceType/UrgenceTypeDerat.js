import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native';

import ButtonUrgence from '../../../components/ButtonUrgence/ButtonUrgence';
import arrow from '../../../../assets/arrow-right-s-line.png';
import flecheretour from '../../../../assets/arrow-left-line.png'

const { width } = Dimensions.get('window');

function UrgenceType({ route, navigation }) {
    //const { service } = route.params;
    
    const handleBack = () => {
        navigation.goBack(); // Fonction de navigation pour revenir en arrière
    };
    
    const service = 'dératiseur';
    const navigateToDetail = (emergency) => {
        navigation.navigate('UrgenceDetail', { emergency, service });
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Image source={flecheretour} style={styles.flechestyle} />
                </TouchableOpacity>
                <Text style={styles.header}>Dératiseur</Text>
            </View>
            <View style={styles.content}>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <Text style={styles.greeting}>Quel est votre problème ?</Text>
                    
                    <ButtonUrgence text="Infestation de rats ou de souris" imageSource={arrow} onPress={() => navigateToDetail('Infestation de rats ou de souris')} />
                    <ButtonUrgence text="Infestation de cafards ou de blattes" imageSource={arrow} onPress={() => navigateToDetail('Infestation de cafards ou de blattes')} />
                    <ButtonUrgence text="Intervention des punaises de lit" imageSource={arrow} onPress={() => navigateToDetail('Intervention des punaises de lit')} />
                    <ButtonUrgence text="Autres problèmes" imageSource={arrow} onPress={() => navigateToDetail('Autres problèmes')} />

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
        marginBottom: width * 0.08,
        paddingTop: width * 0.05, 
    },
});

export default UrgenceType;
