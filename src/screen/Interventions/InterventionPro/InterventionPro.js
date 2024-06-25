import { database, auth } from '../../../../firebase';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ref, onValue } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
 
const { width } = Dimensions.get('window');
 
const Interventions = () => {
    const navigation = useNavigation();
    const [currentInterventions, setCurrentInterventions] = useState([]);
    const [pastInterventions, setPastInterventions] = useState([]);
    const [userId, setUserId] = useState(null);
 
    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('UID DE USR',user.uid);
                setUserId(user.uid);
            } else {
                // Rediriger l'utilisateur vers la page de connexion s'il n'est pas authentifié
                navigation.navigate('Login');
            }
        });
 
        return () => unsubscribeAuth();
    }, [navigation]);
 
    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('UID DE USR', user.uid);
                setUserId(user.uid);
            } else {
                navigation.navigate('Login');
            }
        });
    
        return () => unsubscribeAuth();
    }, [navigation]);
    
    useEffect(() => {
        if (userId) {
            const interventionsRef = ref(database, 'interventions');

            const unsubscribe = onValue(interventionsRef, (snapshot) => {
                const interventions = [];
                snapshot.forEach((userSnapshot) => {
                    console.log('User Snapshot:', userSnapshot.val());
                    userSnapshot.forEach((interventionSnapshot) => {
                        const data = interventionSnapshot.val();
                        console.log('Intervention Data:', data);
                        if (data.pro_id === userId) {
                            interventions.push({ ...data, id: interventionSnapshot.key });
                        }
                    });
                });

                console.log('Filtered Interventions:', interventions);

                const current = interventions.filter(intervention => intervention.status === 'current');
                const past = interventions.filter(intervention => intervention.status === 'past');

                setCurrentInterventions(current);
                setPastInterventions(past);
            });

            return () => unsubscribe();
        }
    }, [userId]);
    
 
    const handlePress = (intervention, isCurrent) => {
        if (isCurrent) {
            navigation.navigate('InterventionEnCours', { intervention });
        } else {
            navigation.navigate('InterventionDetail', { intervention });
        }
    };

    const handleEvaluatePress = () => {
        navigation.navigate('InterventionEval');
    };

 
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Interventions</Text>
            <View style={styles.content}>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <View style={styles.intervSection}>
                        <Text style={styles.intervName}>Intervention en cours</Text>
                        {currentInterventions.length > 0 ? currentInterventions.map((intervention) => (
                            <TouchableOpacity key={intervention.id} style={styles.intervItem} onPress={() => handlePress(intervention, true)}>
                                <View style={styles.intervItemContent}>
                                    <View>
                                        <Text style={styles.intervItemTitle}>{intervention.title}</Text>
                                        <Text style={styles.intervItemSubtitle}>{intervention.subtitle}</Text>
                                    </View>
                                    <Text style={styles.intervItemDuration}>{intervention.duration}</Text>
                                </View>
                            </TouchableOpacity>
                        )) : (
                            <Text style={styles.noIntervText}>Aucune intervention en cours</Text>
                        )}
                    </View>
 
                    <View style={styles.intervSection}>
                        <Text style={styles.intervName}>Interventions passées</Text>
                        {pastInterventions.length > 0 ? pastInterventions.map((intervention) => (
                            <TouchableOpacity key={intervention.id} style={styles.passeItem} onPress={() => handlePress(intervention, false)}>
                                <View style={styles.passeItemContent}>
                                    <View>
                                        <Text style={styles.passeItemTitle}>{intervention.title}</Text>
                                        <Text style={styles.passeItemSubtitle}>{intervention.subtitle}</Text>
                                        <Text style={styles.passeItemSubtitle}>{intervention.rating}</Text>
                                    </View>
                                    <Text style={styles.passeitemdate}>{intervention.date}</Text>
                                </View>
                            </TouchableOpacity>
                        )) : (
                            <Text style={styles.noIntervText}>Aucune intervention passée</Text>
                        )}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};
 
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
    },
    contentContainer: {
        flexGrow: 1,
    },
    intervSection: {
        marginTop: 20,
        paddingHorizontal: width * 0.05,
    },
    intervName: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#000',
    },
    intervItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    intervItemContent: {
        flex: 1,
        backgroundColor: '#0041C4',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    intervItemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    intervItemSubtitle: {
        fontSize: 14,
        color: '#fff',
    },
    intervItemDuration: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    passeItem: {
        backgroundColor: '#fff',
        paddingTop: 5,
        paddingBottom: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    passeItemContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    passeItemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    passeItemSubtitle: {
        fontSize: 14,
        color: '#000',
    },
    passeItemDuration: {
        fontSize: 18,
        color: '#000',
        fontWeight: 'bold',
    },
    passeitemdate: {
        fontSize: 14,
        color: '#000',
        fontWeight: 'bold',
    },
    passeItemEvaluerContainer: {
        backgroundColor: '#69C236',
        paddingVertical: 4,
        paddingHorizontal: 11,
        borderRadius: 10,
    },
    passeitemevaluer: {
        fontSize: 14,
        color: 'white',
    },
    noIntervText: {
        fontSize: 16,
        color: '#000',
        textAlign: 'center',
        marginVertical: 10,
    },
});
 
export default Interventions;