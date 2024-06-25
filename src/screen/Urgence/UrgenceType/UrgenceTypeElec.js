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
    
    const service = 'électricien';
    const navigateToDetail = (emergency) => {
        navigation.navigate('UrgenceDetail', { emergency, service });
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Image source={flecheretour} style={styles.flechestyle} />
                </TouchableOpacity>
                <Text style={styles.header}>Electricien</Text>
            </View>
            <View style={styles.content}>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <Text style={styles.greeting}>Quel est votre problème ?</Text>
                    
                    <ButtonUrgence text="Panne de courant" imageSource={arrow} onPress={() => navigateToDetail('Panne de courant')} />
                    <ButtonUrgence text="Court-circuit" imageSource={arrow} onPress={() => navigateToDetail('Court-circuit')} />
                    <ButtonUrgence text="Prises électriques défectueuses" imageSource={arrow} onPress={() => navigateToDetail('Prises électriques défectueuses')} />
                    <ButtonUrgence text="Défaillance du système de climatisation électrique" imageSource={arrow} onPress={() => navigateToDetail('Défaillance du système de climatisation électrique')} />
                    <ButtonUrgence text="Problèmes de sécurité électrique" imageSource={arrow} onPress={() => navigateToDetail('Problèmes de sécurité électrique')} />
                    <ButtonUrgence text="Installation électrique dangereuse" imageSource={arrow} onPress={() => navigateToDetail('Installation électrique dangereuse')} />
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
