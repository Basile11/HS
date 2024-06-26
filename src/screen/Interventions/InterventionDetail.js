// src/components/InterventionDetail.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image, Alert, Platform } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import { WebView } from 'react-native-webview';
import * as Sharing from 'expo-sharing';
 
import flecheretour from '../../../assets/arrow-left-line.png'
const { width } = Dimensions.get('window');


const InterventionDetail = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { intervention } = route.params;
    const [pdfUri, setPdfUri] = useState(null);
    const [userData, setUserData] = useState(null);
    const [proData, setProData] = useState(null);
 
    const handleBack = () => {
        navigation.goBack(); // Fonction de navigation pour revenir en arrière
    };
    
    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;
 
        if (user) {
            const database = getDatabase();
            const userRef = ref(database, 'users/' + user.uid);
 
            onValue(userRef, (snapshot) => {
                const data = snapshot.val();
                setUserData(data);
            });
        }
 
        if (intervention.pro_id) {
            const database = getDatabase();
            const proRef = ref(database, 'professionnel/' + intervention.pro_id);
 
            onValue(proRef, (snapshot) => {
                const data = snapshot.val();
                setProData(data);
            });
        }
    }, [intervention.pro_id]);
 
    const createAndShowPDF = async () => {
        if (!userData || !proData) {
            Alert.alert('Erreur', 'Les informations utilisateur ou professionnel ne sont pas encore chargées');
            return;
        }
 
        const template = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Facture</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    color: #333;
                }
                .container {
                    width: 100%;
                    padding: 20px;
                    box-sizing: border-box;
                }
                .header {
                    text-align: center;
                    margin-bottom: 20px;
                }
                .header h1 {
                    margin: 0;
                    font-size: 24px;
                }
                .header p {
                    margin: 0;
                    font-size: 14px;
                }
                .details {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 20px;
                }
                .details div {
                    width: 48%;
                }
                .details p {
                    margin: 5px 0;
                    font-size: 14px;
                }
                .invoice-details {
                    margin-bottom: 20px;
                }
                .invoice-details h2 {
                    margin: 0 0 10px 0;
                    font-size: 18px;
                }
                .items table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 20px;
                }
                .items th, .items td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                    font-size: 14px;
                }
                .items th {
                    background-color: #f2f2f2;
                }
                .total {
                    text-align: right;
                    margin-top: 20px;
                }
                .total p {
                    font-size: 18px;
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Facture</h1>
                    <p>Date: ${intervention.date}</p>
                </div>
                <div class="details">
                    <div class="hs-details">
                        <p>${proData.firstName} ${proData.lastName}</p>
                        <p>${proData.address}</p>
                        <p>${proData.city}, ${proData.postalCode}</p>
                        <p>${proData.email}</p>
                        <p>${proData.phoneNumber}</p>
                    </div>
                    <div class="client-details">
                        <p>Nom du client: ${userData.firstName} ${userData.lastName}</p>
                        <p>Adresse: ${userData.address}, ${userData.city}, ${userData.postalCode}</p>
                    </div>
                </div>
                <div class="invoice-details">
                    <h2>Détails de l'intervention</h2>
                    <p>${intervention.title} - ${intervention.subtitle}</p>
                </div>
                <div class="items">
                    <table>
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Durée</th>
                                <th>Prix</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>${intervention.title} - ${intervention.subtitle}</td>
                                <td>${intervention.duration}</td>
                                <td>${intervention.price} €</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="total">
                    <p>Total: ${intervention.price} €</p>
                </div>
            </div>
        </body>
        </html>
        `;
 
        try {
            const { uri } = await Print.printToFileAsync({ html: template });
            const pdfUri = await FileSystem.getContentUriAsync(uri);
            setPdfUri(pdfUri);
        } catch (error) {
            console.error(error);
            Alert.alert('Erreur', 'Une erreur est survenue lors de la génération du PDF');
        }
    };
 
    const sharePDF = async () => {
        if (pdfUri) {
            await Sharing.shareAsync(pdfUri);
        } else {
            Alert.alert('Erreur', 'Aucun PDF à partager');
        }
    };
 
    if (pdfUri) {
        return (
            <View style={{ flex: 1 }}>
                <WebView
                    style={{ flex: 1, marginTop: 40 }} // Marge en haut
                    originWhitelist={['*']}
                    source={{ uri: pdfUri }}
                />
                <View style={styles.pdfFooter}>
                    <TouchableOpacity onPress={() => setPdfUri(null)} style={styles.pdfButton}>
                        <Text style={styles.pdfButtonText}>Retour</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={sharePDF} style={styles.pdfButton}>
                        <Text style={styles.pdfButtonText}>Partager</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Print.printAsync({ uri: pdfUri })} style={styles.pdfButton}>
                        <Text style={styles.pdfButtonText}>Imprimer</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
 
    return (
        <View style={styles.container}>

            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Image source={flecheretour} style={styles.flechestyle} />
                </TouchableOpacity>
                <Text style={styles.header}>{intervention.date}</Text>
            </View>

            <View style={styles.content}>


                <ScrollView contentContainerStyle={styles.contentContainer}>
                   <View style={styles.card}>
                        <View style={styles.row}>
                            <Text style={styles.title}>{intervention.title}</Text>
                            <Text style={styles.price}>{intervention.price || ''} €</Text>
                        </View>
                        <Text style={styles.subtitle}>{intervention.subtitle}</Text>
                        <Text style={styles.descriptionTitle}>Description :</Text>
                        <Text style={styles.description}>{intervention.description || 'Aucune description disponible'}</Text>
                        <Text style={styles.rating}>Avis : {intervention.rating}</Text>

                        {/* Display images */}
                        {intervention.photos && intervention.photos.length > 0 && (
                            <View style={styles.imagesContainer}>
                                {intervention.photos.map((photoUrl, index) => (
                                    <Image key={index} source={{ uri: photoUrl }} style={styles.image} />
                                ))}
                            </View>
                        )}
                    </View>
                    <TouchableOpacity style={styles.invoiceButton} onPress={createAndShowPDF}>
                        <Text style={styles.invoiceButtonText}>Afficher la facture</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View> 
        </View>
    );
};
 
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
        fontSize: 25,
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#0041C4',
    },
    subtitle: {
        fontSize: 18,
        // color: '#666',
        marginBottom: 30,
        fontStyle:'italic'
    },
    descriptionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    description: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
    },
    rating: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
    },
    invoiceButton: {
        backgroundColor: '#0041C4',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    invoiceButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    pdfFooter: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        padding: 10,
        marginBottom: 20, // Ajout de marge en bas
    },
    pdfButton: {
        backgroundColor: '#0041C4',
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 5,
    },
    pdfButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    imagesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingVertical: width * 0.1
    },
    image: {
        width: width * 0.4,
        height: width * 0.5,
        borderRadius: 10,
        marginBottom: 10,
    },
});
 
export default InterventionDetail;