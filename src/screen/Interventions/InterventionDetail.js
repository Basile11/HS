// src/components/InterventionDetail.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import { WebView } from 'react-native-webview';
import * as Sharing from 'expo-sharing';

const InterventionDetail = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { intervention } = route.params;
    const [pdfUri, setPdfUri] = useState(null);

    const createAndShowPDF = async () => {
        const template = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Facture</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                }
                .header {
                    text-align: center;
                    margin-bottom: 40px;
                }
                .header h1 {
                    margin: 0;
                }
                .header p {
                    margin: 0;
                }
                .details {
                    margin-bottom: 20px;
                }
                .details p {
                    margin: 5px 0;
                }
                .items table {
                    width: 100%;
                    border-collapse: collapse;
                }
                .items th, .items td {
                    border: 1px solid #ddd;
                    padding: 8px;
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
            <div class="header">
                <h1>Facture</h1>
                <p>Date: ${intervention.date}</p>
            </div>
            <div class="details">
                <p>Nom du client: John Doe</p>
                <p>Adresse: 123 Main Street, City</p>
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
                <View style={styles.pdfHeader}>
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
                <WebView
                    style={{ flex: 1 }}
                    originWhitelist={['*']}
                    source={{ uri: pdfUri }}
                />
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backButtonText}>{"< Retour"}</Text>
            </TouchableOpacity>
            <Text style={styles.header}>Intervention du {intervention.date}</Text>
            <View style={styles.card}>
                <View style={styles.row}>
                    <Text style={styles.title}>{intervention.title}</Text>
                    <Text style={styles.price}>{intervention.price || ''} €</Text>
                </View>
                <Text style={styles.subtitle}>{intervention.subtitle}</Text>
                <Text style={styles.descriptionTitle}>Description :</Text>
                <Text style={styles.description}>{intervention.description || 'Aucune description disponible'}</Text>
                <Text style={styles.rating}>{intervention.rating}</Text>
            </View>
            <TouchableOpacity style={styles.invoiceButton} onPress={createAndShowPDF}>
                <Text style={styles.invoiceButtonText}>Afficher la facture</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f2f2f2',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        backgroundColor: '#0041C4',
        padding: 10,
        borderRadius: 10,
        zIndex: 1,
    },
    backButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 80,
        marginBottom: 20,
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        marginTop: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0041C4',
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0041C4',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
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
    pdfHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        padding: 10,
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
});

export default InterventionDetail;
