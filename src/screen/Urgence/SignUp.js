import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function SignUp() {
    const navigation = useNavigation();

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        city: '',
        postalCode: '',
        address: '',
        additionalInfo: '',
        phoneNumber: ''
    });

    const [isProfessional, setIsProfessional] = useState(false);
    const [isParticulier, setIsParticulier] = useState(true);

    const handleInputChange = (name, value) => {
        setForm({ ...form, [name]: value });
    };

    const isFormValid = () => {
        return Object.values(form).every(value => value.trim() !== '');
    };

    const handleSignUp = () => {
        if (isFormValid()) {
            // Handle sign-up logic here
            console.log('Form Submitted', form);
            navigation.navigate('SignIn'); // Navigate to the SignIn page
        }
    };

    const goToHome = () => {
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Inscription</Text>
            <View style={styles.toggleContainer}>
                <TouchableOpacity
                    style={[styles.toggleButton, isParticulier && styles.toggleButtonActive]}
                    onPress={() => { setIsParticulier(true); setIsProfessional(false); }}
                >
                    <Text style={[styles.toggleButtonText, isParticulier && styles.toggleButtonTextActive]}>Particulier</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.toggleButton, isProfessional && styles.toggleButtonActive]}
                    onPress={() => { setIsParticulier(false); setIsProfessional(true); }}
                >
                    <Text style={[styles.toggleButtonText, isProfessional && styles.toggleButtonTextActive]}>Professionnel</Text>
                </TouchableOpacity>
            </View>

            <TextInput
                style={styles.input}
                placeholder="Prénom"
                value={form.firstName}
                onChangeText={(value) => handleInputChange('firstName', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Nom"
                value={form.lastName}
                onChangeText={(value) => handleInputChange('lastName', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Adresse mail"
                value={form.email}
                onChangeText={(value) => handleInputChange('email', value)}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                value={form.password}
                onChangeText={(value) => handleInputChange('password', value)}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Confirmation du mot de passe"
                value={form.confirmPassword}
                onChangeText={(value) => handleInputChange('confirmPassword', value)}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Ville"
                value={form.city}
                onChangeText={(value) => handleInputChange('city', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Code postal"
                value={form.postalCode}
                onChangeText={(value) => handleInputChange('postalCode', value)}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Adresse"
                value={form.address}
                onChangeText={(value) => handleInputChange('address', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Information complémentaire"
                value={form.additionalInfo}
                onChangeText={(value) => handleInputChange('additionalInfo', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Numéro de téléphone"
                value={form.phoneNumber}
                onChangeText={(value) => handleInputChange('phoneNumber', value)}
                keyboardType="phone-pad"
            />

            <TouchableOpacity
                style={[styles.submitButton, !isFormValid() && styles.submitButtonDisabled]}
                onPress={handleSignUp}
                disabled={!isFormValid()}
            >
                <Text style={styles.submitButtonText}>S'inscrire</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={goToHome}>
                <Text style={styles.helpText}>Besoin d'aide ?</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0066CC',
        marginBottom: 20,
        alignSelf: 'center',
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    toggleButton: {
        flex: 1,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#0066CC',
        alignItems: 'center',
    },
    toggleButtonActive: {
        backgroundColor: '#0066CC',
    },
    toggleButtonText: {
        color: '#0066CC',
    },
    toggleButtonTextActive: {
        color: '#fff',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    submitButton: {
        backgroundColor: '#0066CC',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    submitButtonDisabled: {
        backgroundColor: '#ccc',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    helpText: {
        color: '#0066CC',
        textAlign: 'center',
        marginTop: 10,
    },
});

export default SignUp;
