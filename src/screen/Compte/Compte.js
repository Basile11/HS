import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';

import { useNavigation } from '@react-navigation/native';
// import MesInformations from './MesInformations/MesInformations';

import logoverif from '../../../assets/shield-check-fill.png';
import photoprofil from '../../../assets/account-circle-fill.png';

const { width } = Dimensions.get('window');

const Compte = () => {
    const navigation = useNavigation();

    const goToInformationsPage = () => {
        navigation.navigate('MesInformations');
    };
    
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Compte</Text>
                <View style={styles.content}>

                    <View style={styles.profileSection}>
                        <View style={styles.profileText}>
                            <Text style={styles.profileName}>Maximilien Dumont</Text>
                            <Text style={styles.profileTitle}>Plombier - 4.5 ★</Text>
                            <Text style={styles.profileSince}>Depuis 2019 sur HS</Text>
                        </View>
                        <Image source={photoprofil} style={styles.profileImage} />
                    </View>


                    <ScrollView contentContainerStyle={styles.contentContainer}>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Identité</Text>
                            <TouchableOpacity style={styles.item} onPress={goToInformationsPage} >
                                <Text style={styles.itemTitle}>Mes informations</Text>
                                <Text style={styles.itemSubtitle}>Maximilien DUMONT</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.item}>
                                <Text style={styles.itemTitle}>Moyen de paiement</Text>
                                <Text style={styles.itemSubtitle}>3940 0493 **** ****</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Connexion</Text>
                            <TouchableOpacity style={styles.item}>
                                <Text style={styles.itemTitle}>Téléphone</Text>
                                <View style={styles.securityContainer}>
                                    <Text style={styles.itemSubtitle}>06 96 06 34 75</Text>
                                    <Image source={logoverif} style={styles.logoverifIcon} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.item}>
                                <Text style={styles.itemTitle}>E-mail</Text>
                                <View style={styles.securityContainer}>
                                    <Text style={styles.itemSubtitle}>maxdmt@test.com</Text>
                                    <Image source={logoverif} style={styles.logoverifIcon}/>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.item}>
                                <Text style={styles.itemTitle}>Mot de passe</Text>
                                <View style={styles.securityContainer}>
                                    <Text style={styles.itemSubtitle}>Modifier</Text>
                                    <Image source={logoverif} style={styles.logoverifIcon}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Sécurité</Text>
                            <TouchableOpacity style={styles.item}>
                            <Text style={styles.itemTitle}>Double authentification</Text>
                            <Image source={logoverif} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.item}>
                                <Text style={styles.itemTitle}>Documents chiffrés</Text>
                                <Image source={logoverif} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Confidentialité</Text>
                            <TouchableOpacity style={styles.item}>
                                <Text style={styles.itemTitle}>Mes préférences</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.item}>
                                <Text style={styles.itemTitle}>Informations légales</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>

                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: '5%',
        paddingTop: '20%',
        backgroundColor: '#0041C4',
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#fff',
        paddingHorizontal: '5%',

    },
    content: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: '5%',
    },

    contentContainer: {
        flexGrow: 1,
    },
    profileSection: {
        marginVertical: width * 0.05, 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    profileText: {
        flex: 1,
    },
    profileName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    profileTitle: {
        fontSize: 16,
        color: '#000',
        // marginVertical: 5,
    },
    profileSince: {
        fontSize: 14,
        color: '#888',
    },
    profileImage: {
        width: width * 0.15, // 15% of the screen width
        height: width * 0.15,
        borderRadius: 25,
        marginLeft: 10,
    },

    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#000',
    },
    item: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    itemSubtitle: {
        fontSize: 14,
        color: '#888',
    },    
    securityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoverifIcon: {
        marginLeft: 10,
    },
});

export default Compte;
