import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import logoverif from '../../../assets/shield-check-fill.png';
import photoprofil from '../../../assets/account-circle-fill.png';

const { width } = Dimensions.get('window');

const InterventionPro = () => {
    const navigation = useNavigation();
    
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Interventions</Text>
                <View style={styles.content}>

                    <ScrollView contentContainerStyle={styles.contentContainer}>
                        <View style={styles.intervSection}>
                            <Text style={styles.intervName}>Intervention en cours</Text>
                            <TouchableOpacity style={styles.intervItem}>
                                <View style={styles.intervItemContent}>
                                    <View>
                                        <Text style={styles.intervItemTitle}>Plombier</Text>
                                        <Text style={styles.intervItemSubtitle}>Changement de robinet</Text>
                                    </View>
                                    <Text style={styles.intervItemDuration}>30mn</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.intervSection}>
                            <Text style={styles.intervName}>Interventions passées</Text>
                            <TouchableOpacity style={styles.passeItem}>
                                <View style={styles.passeItemContent}>
                                    <View>
                                        <Text style={styles.passeItemTitle}>Plombier</Text>
                                        <Text style={styles.passeItemSubtitle}>Changement de robinet</Text>
                                    </View>
                                    <View style={styles.passeItemEvaluerContainer}>
                                        <Text style={styles.passeItemEvaluer}>Evaluer</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.passeItem}>
                                <View style={styles.passeItemContent}>
                                    <View>
                                        <Text style={styles.passeItemTitle}>Plombier</Text>
                                        <Text style={styles.passeItemSubtitle}>Changement de robinet</Text>
                                        <Text style={styles.passeItemSubtitle}>5/5★</Text>
                                    </View>
                                    <Text style={styles.passeitemdate}>24/05/2023</Text>
                                </View>
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
});

export default InterventionPro;
