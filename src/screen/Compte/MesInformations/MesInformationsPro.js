import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native';

import flecheretour from '../../../../assets/arrow-left-line.png';

import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import {app, auth, database} from '../../../../firebase';

const { width } = Dimensions.get('window');

const MesInformations = ({ navigation }) => {
    const handleBack = () => {
        navigation.goBack(); // Fonction de navigation pour revenir en arrière
    };
    

    const [userData, setUserData] = useState(null);

    useEffect(() => {

        const auth = getAuth();
        const user = auth.currentUser;

        if (user){
            const database = getDatabase();
            const userRef = ref(database, 'professionnel/'+user.uid);

            onValue(userRef, (snapshot) => {
                const data = snapshot.val();

                setUserData(data);
            });
        }
    }, []);

    const handleInputChange = (name, value) => {
        setUserData({ ...userData, [name]: value});
    };

    const handleSave = () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const database = getDatabase();
            const userRef = ref(database, 'professionnel/' +user.uid);

            update(userRef, userData)
            .then(() => {
                console.log('Data updated successfully');
                navigation.goBack();
            })
        }
    }

    if (!userData) {
        return <Text>Loading...</Text>; // ou tout autre indicateur de chargement
      }


    return (
        <View style={styles.container}>

            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Image source={flecheretour} style={styles.flechestyle} />
                </TouchableOpacity>
                <Text style={styles.header}>Mes Informations</Text>
            </View>
            
            <View style={styles.content}>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Prénom </Text>
                        <TextInput style={styles.input} defaultValue ={userData.firstName} onChangeText={(value) => handleInputChange('firstName', value)} />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Nom </Text>
                        <TextInput style={styles.input} defaultValue ={userData.lastName} onChangeText={(value) => handleInputChange('lastName', value)} />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Adresse mail </Text>
                        <TextInput style={styles.input} defaultValue ={userData.email} />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Ville </Text>
                        <TextInput style={styles.input} defaultValue ={userData.city} onChangeText={(value) => handleInputChange('city', value)} />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Code postal </Text>
                        <TextInput style={styles.input} defaultValue ={userData.postalCode} onChangeText={(value) => handleInputChange('postalCode', value)}/>
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Adresse </Text>
                        <TextInput style={styles.input} defaultValue ={userData.address} onChangeText={(value) => handleInputChange('address', value)}/>
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Information complémentaire</Text>
                        <TextInput style={styles.input} defaultValue ={userData.additionalInfo} onChangeText={(value) => handleInputChange('additionalInfo', value)}/>
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Numéro de téléphone </Text>
                        <TextInput style={styles.input} defaultValue ={userData.phoneNumber} onChangeText={(value) => handleInputChange('phoneNumber', value)} />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleSave}>
                        <Text style={styles.buttonText}>Enregistrer</Text>
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
    backButton: {
        height: 30, 
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#fff',
        paddingHorizontal: '3%',
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
        paddingVertical: width * 0.05, 
    },
    contentContainer: {
        flexGrow: 1,
    },


    formGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
    },
    input: {
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderRadius: 5,
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
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

export default MesInformations;