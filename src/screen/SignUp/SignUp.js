import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Dimensions, TouchableOpacity, Image, ScrollView, Modal, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {ref, set} from 'firebase/database'
import {app, auth, database} from '../../../firebase';
import { Picker } from '@react-native-picker/picker';




import flecheretour from '../../../assets/arrow-left-line.png';


const { width } = Dimensions.get('window');

function SignUp() {
    const navigation = useNavigation();

    const [selectedJob, setSelectedJob] = useState('');
    const [showJobPicker, setShowJobPicker] = useState(false);


    const [valeur, setValeur] = useState(0);

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
        phoneNumber: '',
        job: ''
    });

    const [isProfessional, setIsProfessional] = useState(false);
    const [isParticulier, setIsParticulier] = useState(true);

    const handleInputChange = (name, value) => {
        setForm({ ...form, [name]: value });
    };

    const isFormValid = () => {
        const commonFieldsValid = Object.keys(form).filter(key => key !== 'job').every(key => form[key] && form[key].trim() !== '');

    if (isProfessional) {
        return commonFieldsValid && selectedJob.trim() !== '';
    }

    return commonFieldsValid;
        return Object.values(form).every(value => value.trim() !== '');
    };

    const handleSignUpPart = async () => {
        if (isFormValid()) {
            // Handle sign-up logic here
            try {
            const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
            const user = userCredential.user;

            await set(ref(database, 'users/' +user.uid),{
                firstName: form.firstName,
                lastName: form.lastName,
                email: form.email,
                city: form.city,
                postalCode: form.postalCode,
                address: form.address,
                additionalInfo: form.additionalInfo,
                phoneNumber: form.phoneNumber,
                job:'',
            });
            console.log('Form Submitted', form);
            navigation.navigate('SignIn'); // Navigate to the SignIn page
            }catch (error) {
                console.error('Error registering user: ', error);
              }
            
        }
    };

    const handleSignUpPro = async () => {
        if (isFormValid()) {
            // Handle sign-up logic here
            try {
            const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
            const user = userCredential.user;

            await set(ref(database, 'professionnel/' +user.uid),{
                firstName: form.firstName,
                lastName: form.lastName,
                email: form.email,
                city: form.city,
                postalCode: form.postalCode,
                address: form.address,
                additionalInfo: form.additionalInfo,
                phoneNumber: form.phoneNumber,
                job : selectedJob,
            });
            console.log('Form Submitted', form);
            navigation.navigate('SignIn'); // Navigate to the SignIn page
            }catch (error) {
                console.error('Error registering user: ', error);
              }
            
        }
    };

    const goToHome = () => {
        navigation.navigate('Home');
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
                <Text style={styles.header}>S'inscrire</Text>
            </View>
            <View style={styles.content}>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <View style={styles.choiceContainer}>
                        <Text style={styles.choiceText}>Qui êtes-vous ?</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.choiceButton, isParticulier ? styles.selectedButton : styles.unselectedButton]}
                                onPress={() => {
                                    setIsProfessional(false);
                                    setIsParticulier(true);
                                    setValeur(0);
                                    setShowJobPicker(false);
                                    setForm({ ...form, job: null }); // Reset job field for Particulier
                                }}>
                                <Text style={[styles.choiceButtonText, isParticulier ? styles.selectedButtonText : styles.unselectedButtonText]}>Particulier</Text>
                            </TouchableOpacity>
                            <View style={{ width: 10 }} />
                            <TouchableOpacity
                                style={[styles.choiceButton, isProfessional ? styles.selectedButton : styles.unselectedButton]}
                                onPress={() => {
                                    setIsProfessional(true);
                                    setIsParticulier(false);
                                    setValeur(1);
                                    setShowJobPicker(true);
                                }}>
                                <Text style={[styles.choiceButtonText, isProfessional ? styles.selectedButtonText : styles.unselectedButtonText]}>Professionnel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
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
                        {isProfessional && (
                            <View style={styles.jobPickerContainer}>
                                <TouchableOpacity
                                    style={styles.openPickerButton}
                                    onPress={() => setShowJobPicker(true)}
                                >
                                    <Text style={styles.openPickerButtonText}>Sélectionnez un métier</Text>
                                </TouchableOpacity>
                                <Text style={styles.selectedJobText}>{selectedJob ? `Métier sélectionné : ${selectedJob}` : "Aucun métier sélectionné"}</Text>
                            </View>
                        )}
                    </View>

                    <TouchableOpacity
                        style={[styles.submitButton, !isFormValid() && styles.submitButtonDisabled]}
                        onPress={() => {
                            if (valeur === 0) {
                                handleSignUpPart();
                                console.log("handleSignUpPart() called");
                            } else if (valeur === 1) {
                                handleSignUpPro();
                                console.log("handleSignUpPro() called");
                            }
                        }}
                        disabled={!isFormValid()}
                    >
                        <Text style={styles.submitButtonText}>S'inscrire</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={goToHome}>
                        <Text style={styles.helpText}>Besoin d'aide ?</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

            <Modal
    visible={showJobPicker}
    transparent={true}
    animationType="slide"
>
    <TouchableWithoutFeedback onPress={() => setShowJobPicker(false)}>
        <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Sélectionnez votre métier</Text>
                    <Picker
                        selectedValue={selectedJob}
                        onValueChange={(itemValue) => setSelectedJob(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Sélectionnez un métier" value="" />
                        <Picker.Item label="Électricien" value="electricien" />
                        <Picker.Item label="Chauffagiste" value="chauffagiste" />
                        <Picker.Item label="Plombier" value="plombier" />
                        <Picker.Item label="Dératiseur" value="deratiseur" />
                        <Picker.Item label="Serrurier" value="serrurier" />
                    </Picker>
                    <TouchableOpacity
                        style={styles.closeModalButton}
                        onPress={() => setShowJobPicker(false)}
                    >
                        <Text style={styles.closeModalButtonText}>Valider</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </View>
    </TouchableWithoutFeedback>
</Modal>
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


    choicecontainer: {
        marginBottom: 20,
    },
    choiceText: {
        fontSize: 20,
        marginBottom: width*0.02,
        marginTop: width*0.04,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: width*0.08,
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
        marginBottom: width*0.05,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 13,
        marginBottom: 10,
    },

    submitButton: {
        backgroundColor: '#0041C4',
        paddingVertical: 15,
        alignItems: 'center',
        marginBottom: width * 0.04,
        paddingHorizontal: 30,
        borderRadius: 15,
        marginHorizontal: width*0.15,
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
        color: '#0041C4',
        textAlign: 'center',
    },

    jobPickerContainer: {
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'center',
    },
    openPickerButton: {
        backgroundColor: '#0041C4',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    openPickerButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    selectedJobText: {
        marginTop: 10,
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    closeModalButton: {
        backgroundColor: '#0041C4',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 10,
        alignItems: 'center',
    },
    closeModalButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    picker: {
        width: '100%',
        height: 200,
        color: '#0041C4',
    },
});

export default SignUp;
