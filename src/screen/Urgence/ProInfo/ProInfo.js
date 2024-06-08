import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native';
import flecheretour from '../../../../assets/arrow-left-line.png';
import photoprofil from '../../../../assets/account-circle-fill.png';
import Carte from '../../../../assets/Carte.png'

const { width } = Dimensions.get('window');

function ProInfo({ route, navigation }) {
    const { pro } = route.params;

    const handleBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Image source={flecheretour} style={styles.flechestyle} />
                </TouchableOpacity>
                <Text style={styles.header}>Électricien</Text>
            </View>
            <View style={styles.content}>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <View style={styles.profileContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.name}>{pro.name}</Text>
                            <Text style={styles.details}>{`Électricien - ${pro.rating} ★\nDepuis 2019 sur HS`}</Text>
                        </View>
                        <Image source={photoprofil} style={styles.photoprofil} />
                    </View>

                    <Text style={styles.description}>
                        Je suis expérimenté pour effectuer des dépannages électriques dans ou en dehors de votre logement. Je suis un pro depuis 10 ans.
                    </Text>
                    <View style={styles.infoContainer}>
                        <View style={styles.infoBox}>
                            <Text style={styles.infoTitle}>Expérience</Text>
                            <Text style={styles.infoValue}>10 ans</Text>
                        </View>
                        <View style={styles.infoBox}>
                            <Text style={styles.infoTitle}>Identité vérifiée</Text>
                            <Text style={styles.infoValue}>OK</Text>
                        </View>
                    </View>
                    <Text style={styles.location}>Agis sur {pro.location}, Ile de France</Text>
                    <Image source={Carte} style={styles.mapImage} />

                    <Text style={styles.reviewsTitle}>Avis client</Text>
                    <View style={styles.reviewsContainer}>
                        {/* <Text style={styles.review}>Bon relationnel</Text>
                        <Text style={styles.review}>Bon matériel</Text>
                        <Text style={styles.review}>Très efficace</Text>
                        <Text style={styles.review}>Travail soigné</Text> */}
                    </View>
                    <TouchableOpacity style={styles.reserveButton}>
                        <Text style={styles.reserveButtonText}>Réserver</Text>
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
    profileContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: width * 0.08,
        paddingTop: width * 0.05, 
    },
    textContainer: {
        flex: 1,
    },
    name: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: width * 0.03,
    },
    details: {
        fontSize: 16,
        color: '#666',
    },
    photoprofil: {
        width: width * 0.2,
        height: width * 0.2,
        borderRadius: width * 0.075,
    },
    description: {
        fontSize: 14,
        color: '#333',
        marginBottom: width * 0.05,
        textAlign: 'justify',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: width * 0.05,
    },
    infoBox: {
        padding: width * 0.03,
        width: '48%',
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderColor: '#0041C4',
        borderWidth: 1,
        borderRadius: 10,
    },
    infoTitle: {
        fontSize: 16,
        color: '#0041C4',
        marginBottom: width * 0.02,
    },
    infoValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0041C4',
    },
    location: {
        fontSize: 16,
        color: '#666',
        marginBottom: width * 0.01,
    },
    mapImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: width * 0.05,
    },
    reviewsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: width * 0.03,
    },
    reviewsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: width * 0.05,
    },
    review: {
        fontSize: 14,
        color: '#666',
    },
    reserveButton: {
        backgroundColor: '#0041C4',
        borderRadius: 10,
        padding: width * 0.03,
        alignItems: 'center',
    },
    reserveButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default ProInfo;
