import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView, Modal, TextInput, TouchableWithoutFeedback } from 'react-native';
import Signature from 'react-native-signature-canvas';
import { Picker } from '@react-native-picker/picker';
import { ref, update } from 'firebase/database';
import { database } from '../../../../firebase';
import flecheretour from '../../../../assets/arrow-left-line.png';
import flecheretourbleu from '../../../../assets/arrow-left-line (1).png'

import Carte from '../../../../assets/Carte.png';

const { width } = Dimensions.get('window');

function DetailInterventionPro({ navigation, route }) {
    // const { intervention } = route.params;
    const [intervention, setIntervention] = useState(route.params.intervention);
    const [temporaryDuration, setTemporaryDuration] = useState(intervention.duration);

    const handleBack = () => {
        navigation.goBack();
    };

    const [modalVisible, setModalVisible] = useState(false);
    const [amount, setAmount] = useState('0');
    const [duration, setDuration] = useState('1 h');
    const [signature, setSignature] = useState(null);
    const [pickerVisible, setPickerVisible] = useState(false);
    // const [temporaryDuration, setTemporaryDuration] = useState(duration);

    const [isQuoteDone, setIsQuoteDone] = useState(false);

    const handleSignature = (signature) => {
        setSignature(signature);
    };

    const handleClear = () => {
        setSignature(null);
    };


    const handleAmountChange = (value) => {
        // Remove any non-numeric characters (except for the € symbol)
        const numericValue = value.replace(/[^0-9]/g, '');
        setAmount(numericValue + ' €');
    };

    const durations = ['- 30mn', '30mn', '1h', '1h30', '2h', '2h30', '3h', '+ 3h'];

    const handleButtonPress = () => {
        if (isQuoteDone) {
            navigation.navigate('TerminerInter'); 
        } else {
            setModalVisible(true);
        }
    };

    // const handleSubmitQuote = async () => {
    //     if (intervention) {
    //         const interventionRef = ref(database, `interventions/${intervention.userKey}/${intervention.id}`);
    //         console.log('Intervention Ref:', interventionRef);

    //         try {
    //             await update(interventionRef, {
    //                 status: 'bePaid',
    //                 price: amount,
    //                 duration: temporaryDuration,
    //                 signature: signature,
    //             });
    //             console.log('Intervention updated successfully');
    //             setIsQuoteDone(true);
    //             setModalVisible(false);
    //         } catch (error) {
    //             console.error('Error updating intervention:', error);
    //         }
    //     }
    // };

    const handleSubmitQuote = async () => {
        if (intervention) {
            const interventionRef = ref(database, `interventions/${intervention.userKey}/${intervention.id}`);
            console.log('Intervention Ref:', interventionRef);

            try {
                await update(interventionRef, {
                    status: 'bePaid',
                    price: amount,
                    duration: temporaryDuration,
                    signature: signature,
                });
                console.log('Intervention updated successfully');
                setIsQuoteDone(true);
                setIntervention(prevState => ({
                    ...prevState,
                    price: amount,
                    duration: temporaryDuration,
                }));
                setModalVisible(false);
            } catch (error) {
                console.error('Error updating intervention:', error);
            }
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Image source={flecheretour} style={styles.flechestyle} />
                </TouchableOpacity>
                <Text style={styles.header}>{intervention.title}</Text>
            </View>
            <View style={styles.content}>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <Text style={styles.greeting}>{intervention.subtitle}</Text>

                    <Text style={styles.descriptiontitle}>Description :</Text>
                    <Text style={styles.description}>{intervention.description}</Text>

                    {/* Display images */}
                    {intervention.photos && intervention.photos.length > 0 && (
                        <View style={styles.imagesContainer}>
                            {intervention.photos.map((photoUrl, index) => (
                                <Image key={index} source={{ uri: photoUrl }} style={styles.image} />
                            ))}
                        </View>
                    )}

                    <View style={styles.infoContainer}>

                        <View style={styles.infoBox}>
                            <Text style={styles.infoTitle}>{isQuoteDone ? 'Tarif' : 'Tarif annoncé'}</Text>
                            <Text style={styles.infoValue}>{intervention.price}</Text>
                        </View>
                        <View style={styles.infoBox}>
                            <Text style={styles.infoTitle}>{isQuoteDone ? 'Durée' : 'Durée estimée'}</Text>
                            <Text style={styles.infoValue}>{intervention.duration}</Text>
                        </View>

                    </View>
                    {isQuoteDone && (
                            <Text style={styles.quoteDoneText}>Devis effectué</Text>
                        )}

                    <Text style={styles.location}>{intervention.location}</Text>
                    <Image source={Carte} style={styles.mapImage} />

                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity style={styles.reserveButton} onPress={handleButtonPress}>
                            <Text style={styles.reserveButtonText}>
                                {isQuoteDone ? 'Terminer l\'intervention' : 'Faire un devis'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                        <View style={styles.modalContainer}>
                            <TouchableWithoutFeedback onPress={() => {}}>
                                <View style={styles.modalContent}>
                                    <Text style={styles.modalTitle}>Faire le devis</Text>
                                    <Text style={styles.modalText}>Choisissez le montant et la durée nécessaire pour la bonne réalisation de l'intervention.</Text>
                                    
                                    <View style={styles.infoContainer}>

                                        <View style={styles.infoBox}>
                                            <Text style={styles.infoTitle}>Montant</Text>
                                            <TextInput
                                                style={styles.infoValue}
                                                value={amount}
                                                // onChangeText={setAmount}
                                                onChangeText={handleAmountChange}
                                                // keyboardType="numeric"
                                            />
                                        </View>
                                        
                                        

                                        <View style={styles.infoBox}>
                                            <Text style={styles.infoTitle}>Durée</Text>
                                            <TouchableOpacity onPress={() => setPickerVisible(true)}>
                                                {/* <Text style={styles.infoValue}>{intervention.duration}</Text> */}
                                                <Text style={styles.infoValue}>{temporaryDuration}</Text>
                                            </TouchableOpacity>
                                            <Modal
                                                transparent={true}
                                                visible={pickerVisible}
                                                onRequestClose={() => {
                                                    setDuration(temporaryDuration);
                                                    setPickerVisible(false);
                                                }}
                                            >
                                                <TouchableWithoutFeedback
                                                    onPress={() => {
                                                        setDuration(temporaryDuration);
                                                        setPickerVisible(false);
                                                    }}
                                                >
                                                    <View style={styles.modalContainer}>
                                                        <TouchableWithoutFeedback onPress={() => {}}>
                                                            <View style={styles.pickerContainer}>
                                                                <Picker
                                                                    selectedValue={temporaryDuration}
                                                                    onValueChange={(itemValue) => setTemporaryDuration(itemValue)}
                                                                >
                                                                    <Picker.Item label="-30mn" value="-30mn" />
                                                                    <Picker.Item label="30mn" value="30mn" />
                                                                    <Picker.Item label="1h" value="1h" />
                                                                    <Picker.Item label="1h30" value="1h30" />
                                                                    <Picker.Item label="2h" value="2h" />
                                                                </Picker>
                                                            </View>
                                                        </TouchableWithoutFeedback>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </Modal>
                                        </View>



                                    </View>
                                    
                                    <Text style={styles.signatureTitle}>Signature du client</Text>
                                    <View style={styles.signatureContainer}>
                                            <Signature
                                                onOK={handleSignature}
                                                onClear={handleClear}
                                                descriptionText=""
                                                clearText="Clear"
                                                confirmText="Save"
                                                webStyle={styles.signatureWebStyle}
                                            />
                                        </View>


                                    <TouchableOpacity
                                        style={styles.submitButton}
                                        onPress={() => {
                                            setIsQuoteDone(true);
                                            setModalVisible(false);
                                            handleSubmitQuote(); 
                                        }}
                                    >
                                        <Text style={styles.submitButtonText}>Valider ce devis</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

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
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#fff',
        paddingHorizontal: width * 0.05,
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
    },
    contentContainer: {
        flexGrow: 1,
    },
    greeting: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: width * 0.03,
        paddingTop: width * 0.05,
    },
    descriptiontitle: {
        fontSize: 14,
        color: '#000',
        fontWeight: '600'
    },
    description: {
        fontSize: 14,
        color: '#333',
        marginBottom: width * 0.02,
        textAlign: 'justify',
    },
    image: {
        width: width * 0.25,
        height: width * 0.35,
        borderRadius: 10,
        marginRight: 10,
        backgroundColor: '#F6F7F9'
    },
    imagesContainer: {
        flexDirection: 'row',
        height: width * 0.35,
        marginBottom: width * 0.05,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: width * 0.02,
    },
    infoBox: {
        padding: width * 0.03,
        width: '48%',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderColor: '#0041C4',
        borderWidth: 1,
        borderRadius: 10,
    },
    infoTitle: {
        fontSize: 16,
        color: '#0041C4',
        marginBottom: width * 0.02,
    },
    infoValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0041C4',
    },
    location: {
        marginBottom: width * 0.01,
        fontSize: 14,
        color: '#000',
        textAlign: 'justify',
        fontWeight: '600'
    },
    mapImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: width * 0.05,
    },
    reserveButton: {
        backgroundColor: '#0041C4',
        borderRadius: 10,
        marginTop: width * 0.02,
        padding: width * 0.03,
        alignItems: 'center',
        width: width * 0.7
    },
    reserveButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },


    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '100%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: width * 0.05,
        paddingVertical: width * 0.08,
    },
    modalTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: width * 0.03,
    },
    modalText: {
        fontSize: 14,
        color: '#969696',
        marginBottom: width * 0.04,
        fontWeight:'500',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#0041C4',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: width * 0.05,
        paddingHorizontal: 10,
    },
    signatureTitle: {
        fontSize: 14,
        color: '#000',
        fontWeight:'bold',
        marginBottom: width * 0.01,
        marginTop: width * 0.02
    },
    signatureContainer: {
        width: '100%',
        height: 200,
        borderColor: '#0041C4',
        borderWidth: 1,
        marginBottom: width * 0.05,
    },
    signatureWebStyle: `
        .m-signature-pad {
            box-shadow: none;
            border: none;
            border-radius: 20px;
        }
        .m-signature-pad--body {
            border: none;
            border-radius: 20px;
        }
        .m-signature-pad--footer {
            display: none;
            margin: 0px;
        }
        body,html {
            width: 100%; height: 100%;
        }
    `,
    submitButton: {
        backgroundColor: '#0041C4',
        borderRadius: 10,
        padding: width * 0.03,
        alignItems: 'center',
        width: '100%',
    },
    submitButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        paddingHorizontal: width * 0.05,
    },
    flechemodale: {
        width: width * 0.08, 
        height: width * 0.08,
    },
    pickerContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        width: '100%',
    },
    picker: {
        width: '100%',
        height: 200,
        color: '#0041C4',
    },
    quoteDoneText: {
        color: 'green',
        fontSize: 14,
        fontWeight: 'bold',
        fontStyle: 'italic',
        // textAlign: 'center',
        marginBottom: width * 0.03,
    },
});

export default DetailInterventionPro;
