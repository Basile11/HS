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
    
    const navigateToDetail = (emergency) => {
        navigation.navigate('UrgenceDetail', { emergency });
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Image source={flecheretour} style={styles.flechestyle} />
                </TouchableOpacity>
                <Text style={styles.header}>Serrurier</Text>
            </View>
            <View style={styles.content}>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <Text style={styles.greeting}>Quel est votre problème ?</Text>
                    
                    <ButtonUrgence text="Clés perdues ou volées" imageSource={arrow} onPress={() => navigateToDetail('Clés perdues ou volées')} />
                    <ButtonUrgence text="Porte bloquée ou coincée" imageSource={arrow} onPress={() => navigateToDetail('Porte bloquée ou coincée')} />
                    <ButtonUrgence text="Clés cassées dans la serrure" imageSource={arrow} onPress={() => navigateToDetail('Clés cassées dans la serrure')} />
                    <ButtonUrgence text="Serrure endommagée" imageSource={arrow} onPress={() => navigateToDetail('Serrure endommagée')} />
                    <ButtonUrgence text="Clés laissées à l'intérieur" imageSource={arrow} onPress={() => navigateToDetail("Clés laissées à l'intérieur")} />
                    <ButtonUrgence text="Serrure de coffre-fort bloquée" imageSource={arrow} onPress={() => navigateToDetail('Autre')} />
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
