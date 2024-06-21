import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native';

import flecheretour from '../../../assets/arrow-left-line.png';
import { signInWithEmailAndPassword, sendPasswordResetEmail, getAuth } from 'firebase/auth';
import {app, auth, database} from '../../../firebase';

const { width } = Dimensions.get('window');

function SignIn({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isProfessional, setIsProfessional] = useState(false);
    const [isParticulier, setIsParticulier] = useState(true);

    const handlePasswordReset = () => {
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                Alert.alert('Email envoyé', 'Un email de réinitialisation du mot de passe a été envoyé à votre adresse.');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                Alert.alert('Erreur', errorMessage);
            });
    };

    const goToHome = () => {
        navigation.navigate('Home');
    };

    const goSignUp = () => {
        navigation.navigate('SignUp');
    };

    const isFormValid= () =>{
        return email && password;
    };

    const handleSignIn = async () => {

       if (isFormValid()){
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('User signed in:', user.uid);
            navigation.navigate('NavBar'); // Navigate to NavBar after sign in
        }catch (error){
            console.error('Error signing in: ', error);
        }
       };
        
    };

    const handleBack = () => {
        navigation.goBack(); // Navigate back
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Image source={flecheretour} style={styles.flechestyle} />
                </TouchableOpacity>
                <Text style={styles.header}>Se connecter</Text>
            </View>
            <View style={styles.content}>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <Text style={styles.greeting}>Bonjour</Text>
                    <Text style={styles.instructions}>Vous pouvez vous connecter grace à votre adresse mail et mot de passe</Text>
                    <View style={styles.choicecontainer}>
                        <Text style={styles.choiceText}>Qui êtes vous ?</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.choiceButton, isParticulier ? styles.selectedButton : styles.unselectedButton]}
                                onPress={() => { setIsProfessional(false); setIsParticulier(true); }}>
                                <Text style={[styles.choiceButtonText, isParticulier ? styles.selectedButtonText : styles.unselectedButtonText]}>Particulier</Text>
                            </TouchableOpacity>
                            <View style={{ width: 10 }} /> 

                            <TouchableOpacity
                                style={[styles.choiceButton, isProfessional ? styles.selectedButton : styles.unselectedButton]}
                                onPress={() => { setIsProfessional(true); setIsParticulier(false); }}>
                                <Text style={[styles.choiceButtonText, isProfessional ? styles.selectedButtonText : styles.unselectedButtonText]}>Professionnel</Text>
                            </TouchableOpacity>
                        </View>
                    </View> 
                    {/* <Text style={styles.userTypeText}>
                        {isParticulier ? "Vous vous connectez en tant que Particulier." : "Vous vous connectez en tant que Professionnel."}
                    </Text> */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Adresse mail"
                            placeholderTextColor="#888"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Mot de passe"
                            placeholderTextColor="#888"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                        />
                        <TouchableOpacity onPress={handlePasswordReset}>
                            <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
                        <Text style={styles.signInButtonText}>Se connecter</Text>
                    </TouchableOpacity>
                    <View style={styles.viewsignup}>
                        <TouchableOpacity onPress={goSignUp}>
                            <Text style={styles.signUpText}>Vous n'avez pas de compte ? S'inscrire</Text>
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



    greeting: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    instructions: {
        fontSize: 14,
        color: '#000',
        marginBottom: width*0.1,
    },


    choicecontainer: {
        marginBottom: 20,
    },
    choiceText: {
        fontSize: 20,
        marginBottom: width*0.02,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: width*0.1,
    },
    choiceButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 15,
        alignItems: 'center',
    },
    selectedButton: {
        backgroundColor: '#0041C4',
    },
    unselectedButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#0041C4',
    },
    choiceButtonText: {
        fontSize: 16,
    },
    selectedButtonText: {
        color: '#fff',
    },
    unselectedButtonText: {
        color: '#0041C4',
    },


    inputContainer: {
        width: '100%',
        marginBottom: width*0.15,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 13,
        marginBottom: 10,
    },
    forgotPasswordText: {
        color: '#0041C4',
        textAlign: 'right',
    },
    signInButton: {
        backgroundColor: '#0041C4',
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginBottom: 20,
        borderRadius: 15,
        marginHorizontal: width*0.15,
    },
    signInButtonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        
    },
    viewsignup: {
        flex : 1,
        justifyContent: 'flex-end',
        paddingBottom: width*0.1,
    },
    signUpText: {
        color: '#0041C4',
        textAlign: 'center',
        marginTop: 10, 
    },
});

export default SignIn;
