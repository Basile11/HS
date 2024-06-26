import { database, auth } from '../../../../firebase';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Modal } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { ref, onValue, update, get } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';

const { width } = Dimensions.get('window');

const InterventionsPro = () => {
    const navigation = useNavigation();
    const [currentInterventions, setCurrentInterventions] = useState([]);
    const [pastInterventions, setPastInterventions] = useState([]);
    const [bePaidInterventions, setBePaidInterventions] = useState([]);
    const [userId, setUserId] = useState(null);
    const [newIntervention, setNewIntervention] = useState(null);
    const [newInterventionUserId, setNewInterventionUserId] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);


    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                // Rediriger l'utilisateur vers la page de connexion s'il n'est pas authentifié
                navigation.navigate('Login');
            }
        });

        return () => {
            unsubscribeAuth();
        };
    }, [navigation]);

    useFocusEffect(
        React.useCallback(() => {
            let unsubscribe;
            if (userId) {
                const interventionsRef = ref(database, 'interventions');

                unsubscribe = onValue(interventionsRef, (snapshot) => {
                    const interventions = [];
                    snapshot.forEach((userSnapshot) => {
                        const userKey = userSnapshot.key; // Récupérer la clé utilisateur parent
                        userSnapshot.forEach((interventionSnapshot) => {
                            const data = interventionSnapshot.val();
                            if (data.pro_id === userId) {
                                interventions.push({ ...data, id: interventionSnapshot.key, userKey }); // Ajouter userKey aux données de l'intervention
                            }
                        });
                    });

                    const current = interventions.filter(intervention => intervention.status === 'current');
                    const past = interventions.filter(intervention => intervention.status === 'past');
                    const bePaid = interventions.filter(intervention => intervention.status === 'bePaid');

                    setCurrentInterventions(current);
                    setPastInterventions(past);
                    setBePaidInterventions(bePaid);

                    const newIntervention = interventions.find(intervention => intervention.status === 'new');

                    if (newIntervention) {
                        setNewIntervention(newIntervention);
                        setNewInterventionUserId(newIntervention.userKey); // Définir l'ID utilisateur parent
                        setModalVisible(true);
                    } else {
                        setNewIntervention(null); // Réinitialiser si aucune intervention "new"
                        setNewInterventionUserId(null); // Réinitialiser l'ID utilisateur parent
                        setModalVisible(false);
                    }
                }, (error) => {
                    console.log('Error reading database:', error);
                });

                return () => {
                    if (unsubscribe) {
                        unsubscribe();
                    }
                };
            } else {
                console.log('User ID is not set yet.');
            }
        }, [userId])
    );

    const handlePress = (intervention, isCurrent) => {
        if (isCurrent) {
            navigation.navigate('DetailInterventionPro', { intervention });
        } else {
            navigation.navigate('InterventionDetail', { intervention });
        }
    };

    const handleAccept = async () => {
        if (newIntervention && newInterventionUserId) {
            const interventionRef = ref(database, `interventions/${newInterventionUserId}/${newIntervention.id}`);

            try {
                await update(interventionRef, { status: 'current' });
                console.log('Intervention updated successfully');
                
                // Vérifier la mise à jour
                const updatedIntervention = await get(interventionRef);
                
                // Réactualiser les interventions
                await refreshInterventions();

                setModalVisible(false);
            } catch (error) {
                console.error('Error updating intervention:', error);
            }
        }
    };

// NOUVEAU
const handleDecline = async () => {
    if (newIntervention && newInterventionUserId) {
        const interventionRef = ref(database, `interventions/${newInterventionUserId}/${newIntervention.id}`);
        console.log('Intervention Ref:', interventionRef);

        try {
            await update(interventionRef, { status: 'declined' });
            console.log('Intervention declined successfully');
            
            // Vérifier la mise à jour
            const updatedIntervention = await get(interventionRef);
            console.log('Updated Intervention Data:', updatedIntervention.val());
            
            // Réactualiser les interventions
            await refreshInterventions();

            setModalVisible(false);
        } catch (error) {
            console.error('Error declining intervention:', error);
        }
    }
};


    const handleEvaluatePress = () => {
        navigation.navigate('InterventionEval');
    };

    const refreshInterventions = async () => {
        const interventionsRef = ref(database, 'interventions');
        const snapshot = await get(interventionsRef);
        const interventions = [];
        snapshot.forEach((userSnapshot) => {
            userSnapshot.forEach((interventionSnapshot) => {
                const data = interventionSnapshot.val();
                if (data.pro_id === userId) {
                    interventions.push({ ...data, id: interventionSnapshot.key });
                }
            });
        });
        const current = interventions.filter(intervention => intervention.status === 'current');
        const past = interventions.filter(intervention => intervention.status === 'past');
        const bePaid = interventions.filter(intervention => intervention.status === 'bePaid');
        setCurrentInterventions(current);
        setPastInterventions(past);
        setBePaidInterventions(bePaid);
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

                    <View style={styles.intervSection}>
                        <Text style={styles.intervName}>Intervention en attente de payement</Text>
                        {bePaidInterventions.length > 0 ? bePaidInterventions.map((intervention) => (
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
                    <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Nouvelle Intervention !</Text>
                        {newIntervention && (
                            <>
                                <Text style={styles.modalInterTitle}>{newIntervention.subtitle}</Text>
                                <Text style={styles.modalText}>{newIntervention.description}</Text>
                                <Text style={styles.modalAdresse}>{newIntervention.adresse}</Text>
                                </>
                        )}
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.modalButtonacc} onPress={handleAccept}>
                                <Text style={styles.modalButtonText}>Accepter</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButtonref} onPress={handleDecline}>
                                <Text style={styles.modalButtonText}>Refuser</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        // alignItems: 'center',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalInterTitle: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight:'bold'
    },    
    modalText: {
        fontSize: 16,
        marginBottom: 20,
        color:'#969696'
    },    
    modalAdresse: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight:'bold',
        fontStyle:'italic'
        // color:'#969696'
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButtonacc: {
        flex: 1,
        marginHorizontal: 5,
        padding: 10,
        backgroundColor: '#69C236',
        borderRadius: 5,
        alignItems: 'center',
    },
    modalButtonref: {
        flex: 1,
        marginHorizontal: 5,
        padding: 10,
        backgroundColor: '#C23636',
        borderRadius: 5,
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight:'bold',
    },
    payBox: {
        backgroundColor: 'red',
        paddingVertical: 4,
        paddingHorizontal: 11,
        borderRadius: 10,
    },
    payText: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default InterventionsPro;
