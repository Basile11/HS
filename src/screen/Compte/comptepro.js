import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import logoverif from '../../../assets/shield-check-fill.png';
import photoprofil from '../../../assets/account-circle-fill.png';

const { width } = Dimensions.get('window');

function ComptePro({ navigation }) {

    const [userData, setUserData] = useState(null);

    const goToHome = () => {
        navigation.navigate('Interventions');
    };

    const goToSignInPage = () => {
        navigation.navigate('SignIn');
    };

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const database = getDatabase();
            const userRef = ref(database, 'professionnel/' + user.uid);

            onValue(userRef, (snapshot) => {
                const data = snapshot.val();
                setUserData(data);
            });
        }
    }, []);

    const handleSignOut = () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            signOut(auth)
                .then(() => {
                    console.log('User signed out successfully.');
                    navigation.navigate('Home');
                })
        }
    }

    if (!userData) {
        return <Text>Loading...</Text>;
    }

    const goToInformationsPage = () => {
        navigation.navigate('MesInformations');
    };

    const goToPlanningPage = () => {
        navigation.navigate('Planning');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Compte</Text>
            <View style={styles.content}>

                <View style={styles.profileSection}>
                    <View style={styles.profileText}>
                        <Text style={styles.profileName}>{userData.firstName} {userData.lastName} </Text>
                        <Text style={styles.profileTitle}>{userData.job} - 4.5 ★</Text>
                        <Text style={styles.profileSince}>Depuis 2019 sur HS</Text>
                    </View>
                    <Image source={photoprofil} style={styles.profileImage} />
                </View>

                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Identité</Text>
                        <TouchableOpacity style={styles.item} onPress={goToInformationsPage} >
                            <Text style={styles.itemTitle}>Mes informations</Text>
                            <Text style={styles.itemSubtitle}>{userData.firstName} {userData.lastName}</Text>
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
                                <Text style={styles.itemSubtitle}>{userData.phoneNumber}</Text>
                                <Image source={logoverif} style={styles.logoverifIcon} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item}>
                            <Text style={styles.itemTitle}>E-mail</Text>
                            <View style={styles.securityContainer}>
                                <Text style={styles.itemSubtitle}>{userData.email}</Text>
                                <Image source={logoverif} style={styles.logoverifIcon} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item}>
                            <Text style={styles.itemTitle}>Mot de passe</Text>
                            <View style={styles.securityContainer}>
                                <Text style={styles.itemSubtitle}>Modifier</Text>
                                <Image source={logoverif} style={styles.logoverifIcon} />
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

                    {/* Section Métier */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Métier</Text>
                        <TouchableOpacity style={styles.item}>
                            <Text style={styles.itemTitle}>Zone d'action</Text>
                            <Text style={styles.itemSubtitle}>Brunoy, 5km</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item} onPress={goToPlanningPage}>
                            <Text style={styles.itemTitle}>Planning</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item}>
                            <Text style={styles.itemTitle}>Estimations de tarif</Text>
                            <Text style={styles.itemSubtitle}></Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleSignOut}>
                        <Text style={styles.buttonText}>Sign Out</Text>
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
    },
    profileSince: {
        fontSize: 14,
        color: '#888',
    },
    profileImage: {
        width: width * 0.15,
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
    button: {
        backgroundColor: '#0041C4',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ComptePro;