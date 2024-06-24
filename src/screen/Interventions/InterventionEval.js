import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions, TextInput } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
// import MesInformations from './MesInformations/MesInformations';

import logoverif from '../../../assets/shield-check-fill.png';
import photoprofil from '../../../assets/account-circle-fill.png';
import happybleu from '../../../assets/compliment/happy-bleu.png'
import happygris from '../../../assets/compliment/happy-gris.png'
import talkbleu from '../../../assets/compliment/talk-bleu.png'
import talkgris from '../../../assets/compliment/talk-gris.png'
import timebleu from '../../../assets/compliment/time-bleu.png'
import timegris from '../../../assets/compliment/time-gris.png'
import toolsbleu from '../../../assets/compliment/tools-bleu.png'
import toolsgris from '../../../assets/compliment/tools-gris.png'
import starjaune from '../../../assets/compliment/star-jaune.png'
import stargris from '../../../assets/compliment/star-gris.png'
import flecheretour from '../../../assets/arrow-left-line.png';


import { getAuth, signOut } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import {app, auth, database} from '../../../firebase';

const { width } = Dimensions.get('window');

function InterventionEval({ navigation }) {

    // const navigation = useNavigation();
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [compliments, setCompliments] = useState([]);

    const goToHome = () => {
        navigation.navigate('Interventions');
    };

    const handleRating = (rate) => {
        setRating(rate);
    };

    const toggleCompliment = (compliment) => {
        setCompliments(prevCompliments =>
            prevCompliments.includes(compliment)
                ? prevCompliments.filter(c => c !== compliment)
                : [...prevCompliments, compliment]
        );
    };

    const handleBack = () => {
        navigation.goBack(); // Fonction de navigation pour revenir en arrière
    };
    
    const complimentsData = [
        { text: 'Sympathique', selectedImage: talkbleu, unselectedImage: talkgris },
        { text: 'Bon matériel', selectedImage: toolsbleu, unselectedImage: toolsgris },
        { text: 'Efficace', selectedImage: timebleu, unselectedImage: timegris },
        { text: 'Travail soigné', selectedImage: happybleu, unselectedImage: happygris },
    ];
    
    return (
        <View style={styles.container}>
            {/* <Text style={styles.header}>Intervention du 24/08/2024</Text> */}
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Image source={flecheretour} style={styles.flechestyle} />
                </TouchableOpacity>
                <Text style={styles.header}>Intervention du 24/08/2024</Text>
            </View>
                
            <View style={styles.content}>

                <View style={styles.profileSection}>
                    <View style={styles.profileText}>
                        <Text style={styles.profileName}>Basile Truquin </Text>
                        <Text style={styles.profileTitle}>Plombier - 4.5 ★</Text>
                        <Text style={styles.profileSince}>Depuis 2019 sur HS</Text>
                    </View>
                    <Image source={photoprofil} style={styles.profileImage} />
                </View>


                <ScrollView contentContainerStyle={styles.contentContainer}>

                    <Text style={styles.sectionTitle}>Attribuez une note à l’intervenant :</Text>
                    <View style={styles.ratingContainer}>
                        {[...Array(5)].map((_, index) => (
                            <TouchableOpacity key={index + 1} onPress={() => handleRating(index + 1)}>
                                <Image
                                    source={index < rating ? starjaune : stargris}
                                    style={styles.star}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={styles.sectionTitle}>Ajoutez un avis :</Text>
                    <TextInput
                        style={styles.reviewInput}
                        placeholder="Écrivez votre avis ici..."
                        value={review}
                        onChangeText={setReview}
                        multiline
                    />

                    <Text style={styles.sectionTitle}>Ajoutez un compliment :</Text>
                    <View style={styles.complimentContainer}>
                        {complimentsData.map((compliment) => (
                            <TouchableOpacity
                                key={compliment.text}
                                style={styles.complimentButton}
                                onPress={() => toggleCompliment(compliment.text)}
                            >
                                <Image
                                    source={compliments.includes(compliment.text) ? compliment.selectedImage : compliment.unselectedImage}
                                    style={styles.complimentImage}
                                />
                                <Text
                                    style={[
                                        styles.complimentText,
                                        compliments.includes(compliment.text) && styles.complimentTextSelected,
                                    ]}
                                >
                                    {compliment.text}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={styles.sectionTitle}>Ajoutez une photo :</Text>
                    <View style={styles.photoContainer}>
                        {[1, 2, 3].map((index) => (
                            <TouchableOpacity key={index} style={styles.photoBox}>
                                <Text style={styles.sectionTitle}>+</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TouchableOpacity style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>Ajouter l'évaluation</Text>
                    </TouchableOpacity>
                        
                        
                </ScrollView>

            </View>
        </View>
    );
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         // padding: '5%',
//         paddingTop: '20%',
//         backgroundColor: '#0041C4',
//     },
//     header: {
//         fontSize: 30,
//         fontWeight: 'bold',
//         marginBottom: 15,
//         color: '#fff',
//         paddingHorizontal: '5%',

//     },
//     content: {
//         flex: 1,
//         backgroundColor: '#fff',
//         borderTopLeftRadius: 20,
//         borderTopRightRadius: 20,
//         paddingHorizontal: '5%',
//     },

//     contentContainer: {
//         flexGrow: 1,
//     },
//     profileSection: {
//         marginVertical: width * 0.05, 
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         marginBottom: 20,
//     },
//     profileText: {
//         flex: 1,
//     },
//     profileName: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: '#000',
//     },
//     profileTitle: {
//         fontSize: 16,
//         color: '#000',
//         // marginVertical: 5,
//     },
//     profileSince: {
//         fontSize: 14,
//         color: '#888',
//     },
//     profileImage: {
//         width: width * 0.15, // 15% of the screen width
//         height: width * 0.15,
//         borderRadius: 25,
//         marginLeft: 10,
//     },

//     sectionTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#000',
//         marginBottom: 10,
//     },
//     ratingContainer: {
//         flexDirection: 'row',
//         marginBottom: 20,
//     },
//     star: {
//         width: 40,
//         height: 40,
//         marginRight: 10,
//     },
//     reviewInput: {
//         backgroundColor: '#f9f9f9',
//         padding: 15,
//         borderRadius: 10,
//         marginBottom: 20,
//         height: 100,
//         textAlignVertical: 'top',
//     },
//     complimentContainer: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         marginBottom: 20,
//     },
//     complimentButton: {
//         padding: 10,
//         borderRadius: 10,
//         borderWidth: 1,
//         borderColor: '#0041C4',
//         marginRight: 10,
//         marginBottom: 10,
//     },
//     complimentButtonSelected: {
//         backgroundColor: '#0041C4',
//     },
//     complimentText: {
//         color: '#0041C4',
//     },
//     photoContainer: {
//         flexDirection: 'row',
//         marginBottom: 20,
//     },
//     photoBox: {
//         width: width * 0.25,
//         height: width * 0.25,
//         backgroundColor: '#f9f9f9',
//         borderRadius: 10,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginRight: 10,
//     },
//     addPhotoIcon: {
//         width: 40,
//         height: 40,
//     },
//     submitButton: {
//         backgroundColor: '#0041C4',
//         padding: 15,
//         borderRadius: 10,
//         alignItems: 'center',
//     },
//     submitButtonText: {
//         color: '#fff',
//         fontSize: 18,
//         fontWeight: 'bold',
//     }, 
// });


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: '20%',
        backgroundColor: '#0041C4',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems:'center',
        // backgroundColor:'red'

    },
    header: {
        fontSize: 23,
        fontWeight: 'bold',
        // marginBottom: 15,
        color: '#fff',
        paddingHorizontal: '3%',
        // alignItems:'center',
        textAlignVertical:'center',
        
        // backgroundColor:'green',
        height:'100%'
    },
    flechestyle: {
        width: width * 0.10, 
        height: width * 0.10,
        borderRadius: 25,
        marginLeft: 10,
        // paddingBottom: 40
    },

    
    content: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: '5%',
        paddingVertical: '5%',
    },
    contentContainer: {
        flexGrow: 1,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
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
    sectionTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    ratingContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    star: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    reviewInput: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        height: 100,
        textAlignVertical: 'top',
    },
    complimentContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
        // flex:'space-between'
        justifyContent:'space-between'
    },
    complimentButton: {
        flexDirection: 'column',
        alignItems: 'center',
        // paddingHorizontal: 3,
        borderRadius: 10,
        // borderWidth: 1,
        // borderColor: '#0041C4',
        marginRight: 10,
        marginBottom: 10,
    },
    complimentImage: {
        width: 40,
        height: 40,
        marginBottom: 5,
    },
    complimentText: {
        color: '#969696',
    },
    complimentTextSelected: {
        color: '#0041C4',
    },
    photoContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    photoBox: {
        width: width * 0.25,
        height: width * 0.25,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    addPhotoIcon: {
        width: 40,
        height: 40,
    },
    submitButton: {
        backgroundColor: '#0041C4',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default InterventionEval;
