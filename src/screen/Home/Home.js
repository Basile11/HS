import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Home() {
    const navigation = useNavigation();

    const goToSignInPage = () => {
        navigation.navigate('SignIn');
    };

    const goToSignUpPage = () => {
        navigation.navigate('SignUp');
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Text style={styles.logoText}>HS</Text>
                <Text style={styles.logoSubText}>PARCE QUE L'URGENCE N'ATTEND PAS</Text>
            </View>
            <Text style={styles.welcomeText}>Bienvenue</Text>
            <Text style={styles.descriptionText}>
                Trouvez rapidement des professionnels pour vos urgences domestiques avec HS.
            </Text>
            <TouchableOpacity style={styles.button} onPress={goToSignInPage}>
                <Text style={styles.buttonText}>Se connecter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton} onPress={goToSignUpPage}>
                <Text style={styles.secondaryButtonText}>S'inscrire</Text>
            </TouchableOpacity>
            <Text style={styles.helpText}>Besoin d'aide ?</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0041C4',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 50,
    },
    logoText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    logoSubText: {
        fontSize: 12,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    welcomeText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 20,
    },
    descriptionText: {
        fontSize: 16,
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 40,
    },
    button: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 15,
        paddingHorizontal: 60,
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonText: {
        color: '#0066CC',
        fontSize: 16,
        fontWeight: 'bold',
    },
    secondaryButton: {
        borderColor: '#FFFFFF',
        borderWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 60,
        borderRadius: 5,
        marginBottom: 20,
    },
    secondaryButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    helpText: {
        color: '#FFFFFF',
        marginTop: 30,
        fontSize: 14,
    },
});

export default Home;
 