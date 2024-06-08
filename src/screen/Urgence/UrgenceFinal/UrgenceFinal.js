import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';

const { width } = Dimensions.get('window');

function UrgenceFinal({ route, navigation }) {
    const { service, problemDescription, estimatedTime, images, emergency } = route.params;

    // const displayEmergency = emergency === 'Autre' ? 'Quel est votre problème ?' : emergency;

    const handleBackToHome = () => {
        navigation.navigate('Urgence');
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                {/* <Image source={require('../../../../assets/hs-logo.png')} style={styles.logo} /> */}
                <Text style={styles.logoText}>HS</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>Intervention réservée !</Text>
                <View style={styles.urgencetitle}>
                    <Text style={styles.subtitle}>{service}</Text>
                    {emergency !== "Autre" && <Text style={styles.subtitle}> - {emergency}</Text>}
                </View>

                <Text style={styles.problemDescription}>{problemDescription}</Text>

                <FlatList
                    horizontal={true} // Configurez la FlatList pour qu'elle ait une direction horizontale
                    data={images}
                    renderItem={({ item }) => (
                        <TouchableOpacity >
                            <Image source={{ uri: item }} style={styles.image} />
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.imagesContainer} 
                />



                <Text style={styles.attentionTitle}>Attention !</Text>
                <Text style={styles.attentionMessage}>
                    Le montant indiqué lors de la réservation est une estimation. Le professionnel vous fera signer un devis définitif une fois qu'il aura évalué votre situation.
                </Text>
                <TouchableOpacity style={styles.homeButton} onPress={handleBackToHome}>
                    <Text style={styles.homeButtonText}>Retour à la page d'accueil</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: '10%',
        backgroundColor: '#0041C4',
        alignItems: 'center',
        paddingBottom: width * 0.5,
        paddingTop:width * 0.4

    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: width * 0.1,
    },
    logo: {
        width: 80,
        height: 80,
    },
    logoText: {
        fontSize: 70,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    content: {
        width: '90%',
        borderRadius: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        marginTop: 15,
    },
    urgencetitle: {
        flexDirection: 'row', 
        alignItems: 'center',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    problemDescription: {
        fontSize: 14,
        color: '#fff',
        marginBottom: 20,
    },
    imagesContainer: {
        flexDirection: 'row',
        marginBottom: width*0.15,
    },
    image: {
        width: width*0.25, 
        height: width*0.35, 
        borderRadius: 10,
        marginRight: 10,
    },
    attentionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    attentionMessage: {
        fontSize: 14,
        color: '#fff',
        marginBottom: 20,
        textAlign: 'justify',
    },
    homeButton: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
    },
    homeButtonText: {
        fontSize: 18,
        color: '#0041C4',
        fontWeight: 'bold',
    },
});

export default UrgenceFinal;
