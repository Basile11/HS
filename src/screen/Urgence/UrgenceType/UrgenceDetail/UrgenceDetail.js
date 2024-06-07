import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import flecheretour from '../../../../../assets/arrow-left-line.png'

const { width } = Dimensions.get('window');

function UrgenceDetail({ route, navigation }) {
    const { service, emergency } = route.params;
    const [problemDescription, setProblemDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [images, setImages] = useState([]);
    const displayEmergency = emergency === 'Autre' ? 'Quel est votre problème ?' : emergency;

    const handleBack = () => {
        navigation.goBack(); // Fonction de navigation pour revenir en arrière
    };

    const handleImagePicker = () => {
        // Implement image picker functionality
    };

    const handleSearchProfessional = () => {
        // Implement search professional functionality
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Image source={flecheretour} style={styles.flechestyle} />
                </TouchableOpacity>
                <Text style={styles.header}>{service}</Text>
            </View>
            <View style={styles.content}>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <Text style={styles.greeting}>{displayEmergency}</Text>


                <Text style={styles.label}>Explication du problème :</Text>
                    <TextInput
                        style={styles.textInput}
                        multiline
                        placeholder="Description du problème"
                        value={problemDescription}
                        onChangeText={setProblemDescription}
                    />

                    <Text style={styles.label}>Estimation du temps d'intervention :</Text>
                    <View style={styles.timeButtonsContainer}>
                        {['30 mn', '1 h', '1 h 30', '2 h', '+'].map((time) => (
                            <TouchableOpacity
                                key={time}
                                style={[
                                    styles.timeButton,
                                    estimatedTime === time && styles.timeButtonSelected
                                ]}
                                onPress={() => setEstimatedTime(time)}
                            >
                                {/* <Text style={styles.timeButtonText}>{time}</Text> */}
                                <Text style={[
                                    styles.timeButtonText,
                                    estimatedTime === time && styles.timeButtonTextSelected
                                ]}>
                                    {time}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={styles.label}>Ajouter une photo :</Text>
                    <View style={styles.imagesContainer}>
                        {images.map((img, index) => (
                            <Image key={index} source={{ uri: img.uri }} style={styles.image} />
                        ))}
                        <TouchableOpacity onPress={handleImagePicker} style={styles.addButton}>
                            <Text style={styles.addButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={handleSearchProfessional} style={styles.searchButton}>
                        <Text style={styles.searchButtonText}>Rechercher un professionnel</Text>
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
        paddingVertical: width * 0.05, 
    },
    contentContainer: {
        flexGrow: 1,
    },
    greeting: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: width * 0.03,
    },
    description: {
        fontSize: 18,
        color: '#000',
        marginBottom: 10,
    },



    label: {
        fontSize: 15,
        marginBottom: 10,
        fontWeight:'500',
        color: '#969696'
    },
    textInput: {
        height: 100,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        textAlignVertical: 'top',
    },
    timeButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    timeButton: {
        flex:1,
        marginRight: width*0.015,
        paddingVertical: width*0.03,
        borderWidth: 1,
        borderColor: '#0041C4',
        borderRadius: 10,
        alignItems: 'center',
    },
    timeButtonSelected: {
        backgroundColor: '#0041C4',
    },
    timeButtonText: {
        color: '#0041C4',
    },
    timeButtonTextSelected: {
        color: '#fff',
        fontWeight: 'bold',
    },
    imagesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 10,
        marginRight: 10,
    },
    addButton: {
        width: 50,
        height: 50,
        borderRadius: 10,
        borderColor: '#0041C4',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        color: '#0041C4',
        fontSize: 24,
    },
    searchButton: {
        backgroundColor: '#0041C4',
        paddingVertical: width * 0.03,
        borderRadius: 10,
        alignItems: 'center',
        margin:width*0.1,
    },
    searchButtonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default UrgenceDetail;
