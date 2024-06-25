import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, Image, ScrollView, Alert, FlatList, Modal, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Signature from 'react-native-signature-canvas';


import flecheretour from '../../../../assets/arrow-left-line.png'
import flecheretourbleu from '../../../../assets/arrow-left-line (1).png'
import poubelle from '../../../../assets/delete-bin-2-line.png'

const { width } = Dimensions.get('window');

function TerminerInter({ navigation }) {
    // const { service, emergency } = route.params;
    const [problemDescription, setProblemDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [images, setImages] = useState([]);
    // const [image, setImage] = useState([]);
    const [modalVisible, setModalVisible] = useState(false); // État pour gérer la visibilité de la modal
    const [selectedImage, setSelectedImage] = useState(''); // État pour stocker l'URI de l'image sélectionnée
    const [signature, setSignature] = useState(null);

    const handleBack = () => {
        navigation.goBack(); // Fonction de navigation pour revenir en arrière
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImages([...images, result.assets[0].uri]);
        }
    };

    const openImageModal = (uri) => {
        setSelectedImage(uri);
        setModalVisible(true);
    };

    const deleteImage = (uri) => {
        const updatedImages = images.filter(image => image !== uri);
        setImages(updatedImages);
        setModalVisible(false);
    };

    const gotoHome = () => {
        navigation.navigate('NavBarPro');
    };

    const handleSignature = (signature) => {
        setSignature(signature);
    };

    const handleClear = () => {
        setSignature(null);
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Image source={flecheretour} style={styles.flechestyle} />
                </TouchableOpacity>
                <Text style={styles.header}>Terminer l'intervention</Text>
            </View>
            <View style={styles.content}>
                <ScrollView contentContainerStyle={styles.contentContainer}>

                <Text style={styles.label}>Description de l'intervention</Text>
                    <TextInput
                        style={styles.textInput}
                        multiline
                        placeholder="Description du problème"
                        value={problemDescription}
                        onChangeText={setProblemDescription}
                    />

                    <Text style={styles.label}>Durée de l'intervention :</Text>
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
                                <Text style={[
                                    styles.timeButtonText,
                                    estimatedTime === time && styles.timeButtonTextSelected
                                ]}>
                                    {time}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>


                    {/* <TouchableOpacity onPress={pickImage} >
                        <Text style={styles.addButtonText}>Ajouter une photo</Text>
                    </TouchableOpacity>

                    <FlatList
                        horizontal={true} // Configurez la FlatList pour qu'elle ait une direction horizontale
                        data={images}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => openImageModal(item)}>
                                <Image source={{ uri: item }} style={styles.image} />
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={styles.imagesContainer} // Style de conteneur pour la FlatList
                    /> */}

                    <Text style={styles.label}>Signature du client</Text>
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

                    <TouchableOpacity onPress={pickImage} >
                        <Text style={styles.addButtonText}>Ajouter une photo</Text>
                    </TouchableOpacity>

                    <FlatList
                        horizontal={true} // Configurez la FlatList pour qu'elle ait une direction horizontale
                        data={images}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => openImageModal(item)}>
                                <Image source={{ uri: item }} style={styles.image} />
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={styles.imagesContainer} // Style de conteneur pour la FlatList
                    />

                    <TouchableOpacity style={styles.searchButton}>
                        <Text style={styles.searchButtonText}  onPress={gotoHome} >Terminer l'intervention</Text>
                    </TouchableOpacity>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(false);
                        }}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <View style={styles.modalHaut}>
                                    <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.backButton}>
                                        <Image source={flecheretourbleu} style={styles.flechemodale} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => deleteImage(selectedImage)} style={styles.backButton}>
                                        <Image source={poubelle} style={styles.suppmodale} />
                                    </TouchableOpacity>
                                </View>

                                <Image source={{ uri: selectedImage }} style={styles.modalImage} />

                            </View>
                        </View>
                    </Modal>


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
    },
    contentContainer: {
        flexGrow: 1,
        marginTop: width*0.07
    },
    greeting: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: width * 0.03,
        paddingTop: width * 0.05, 
    },
    description: {
        fontSize: 18,
        color: '#000',
        marginBottom: 10,
    },



    label: {
        fontSize: 15,
        marginBottom: width*0.01,
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
        height: width*0.35, 
    },
    image: {
        width: width*0.25, // Largeur fixe pour les images
        height: width*0.35, 
        borderRadius: 10,
        marginRight: 10,
    },
    addButton: {
        marginRight:width*0.5,
        borderRadius: 10,
        borderColor: '#0041C4',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        color: '#0041C4',
        fontSize: 14,
        fontWeight:'bold',
        marginBottom:10,
        paddingTop:width*0.05
    },


    searchButton: {
        backgroundColor: '#0041C4',
        paddingVertical: width * 0.03,
        borderRadius: 10,
        alignItems: 'center',
        margin:width*0.1,
        marginTop:width*0.05
    },
    searchButtonText: {
        color: '#fff',
        fontSize: 18,
    },


    // Styles pour la modal
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingBottom:20,
        paddingTop:10,
        alignItems: 'center',
        elevation: 5,
    },
    modalImage: {
        width: width * 0.8,
        height: width * 0.8,
        borderRadius: 10,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalHaut: {
        width: width * 0.8,
        flexDirection: 'row',
        justifyContent: 'space-between', 
        marginBottom:10,
        alignItems:'center', 
    },
    flechemodale: {
        width: width * 0.08, 
        height: width * 0.08,
    },
    suppmodale: {
        width: width * 0.08, 
        height: width * 0.08,
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
        // marginBottom: width * 0.05,
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
});

export default TerminerInter;
