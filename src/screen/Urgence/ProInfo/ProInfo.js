import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native';
import flecheretour from '../../../../assets/arrow-left-line.png';
import photoprofil from '../../../../assets/account-circle-fill.png';
import Carte from '../../../../assets/Carte.png'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set, get, push } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";


const { width } = Dimensions.get('window');

function ProInfo({ route, navigation }) {
    const { pro, service, problemDescription, estimatedTime, images, emergency } = route.params;

    //On prend les infos de l'utilisateur connecté pour compléter les infos de l'interentions
    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const db = getDatabase();
                const userRef = ref(db, 'users/'+firebaseUser.uid);
                const userSnapshot = await get(userRef);
                if (userSnapshot.exists()) {
                    const userData = userSnapshot.val();
                    const fullAddress = `${userData.address}, ${userData.city}`;
                    setUser({
                        uid: firebaseUser.uid,
                        address: fullAddress
                    });
                } else {
                    console.log("User data not found");
                }
            } else {
                console.log("No user is signed in.");
                setUser(null);
            }
        });
    }, []);

    useEffect(() => {
        // Vérifiez les données du professionnel pour vous assurer que l'UID est présent
        console.log('Professional Data icicicici:', pro);
    }, [pro]);

    if (!user) {
        return <Text>Loading...</Text>; // ou tout autre indicateur de chargement
      }    
    
    const handleBack = () => {
        navigation.goBack();
    };

    // const ajtInt=async() =>{
    //     const db = getDatabase();
    //     console.log("ceci est l'id de l'user connecté",user.uid);
    //     console.log("ceci est l'adresse de l'user connecté",user.address);
    //     console.log(pro.uid);
    //     const interventionRef = ref(db,'interventions/'+user.uid);
    //     const newInterventionRef = push(interventionRef);
    //     //const imageUrls = await uploadImages(images);

    //         const newIntervention = {
    //             pro_id: pro.uid,
    //             subtitle: emergency,
    //             title: service,
    //             location: user.address,
    //             date: ".",
    //             duration: estimatedTime,
    //             photos: "imageUrls", // Assurez-vous que c'est un tableau ou un format compatible
    //             rating:'.',
    //             price:'.',
    //             status : "current"
    //         };

    //     set(newInterventionRef,newIntervention)
    //         .then(() => console.log('Intervention ajoutée'))
    //         .catch(error=>console.error('Erreur',error));
        
    // };

 
    const ajtInt = async () => {
        const db = getDatabase();
        const storage = getStorage();
        console.log("User ID:", user.uid);
        console.log("User address:", user.address);
        console.log("Professional UID:", pro.uid);

        // Obtenez la date actuelle
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

        console.log("Test date");

        try {
            // Upload images and get their URLs
            const imageUrls = await uploadImages(images);

            const interventionRef = ref(db, 'interventions/' + user.uid);
            const newInterventionRef = push(interventionRef);

            const newIntervention = {
                pro_id: pro.uid,
                subtitle: emergency,
                title: service,
                location: user.address,
                date: formattedDate,
                duration: estimatedTime,
                photos: imageUrls, // Use the uploaded image URLs
                rating: '.',
                price: '.',
                status: "new",
                description: problemDescription,
            };

            console.log("New Intervention:", newIntervention);

            await set(newInterventionRef, newIntervention);
            console.log('Intervention ajoutée');
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    const handleReserve = () => {
        ajtInt();
        navigation.navigate('UrgenceFinal', { service, problemDescription, estimatedTime, images, emergency });
    };

    // Function to upload images to Firebase Storage and return their URLs
    const uploadImages = async (images) => {
        const storage = getStorage();
        const imageUrls = [];

        for (const image of images) {
            try {
                const response = await fetch(image);
                const blob = await response.blob();
                const imageRef = storageRef(storage, `interventions/${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
                await uploadBytes(imageRef, blob);
                const url = await getDownloadURL(imageRef);
                imageUrls.push(url);
                console.log('Image uploaded:', url);
            } catch (error) {
                console.error('Image upload error:', error);
                throw error; // Re-throw the error to be caught in ajtInt
            }
        }

        return imageUrls;
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
                    <View style={styles.profileContainer}>
                        <View style={styles.textContainer}>
                        <Text style={styles.name}>{pro.firstName} {pro.lastName}</Text>
                        <Text style={styles.detail}>Problem: {problemDescription}</Text>
                         <Text style={styles.detail}>Estimated Time: {estimatedTime}</Text>
                        <Text style={styles.detail}>Price: {pro.price || 'N/A'}</Text>
                        <Text style={styles.details}>{service}{pro.rating} ★ Depuis 2019 sur HS</Text>
                        </View>
                        <Image source={photoprofil} style={styles.photoprofil} />
                    </View>
                    <Text style={styles.description}>
                    {pro.additionalInfo}
                    </Text>
                    <View style={styles.infoContainer}>
                        <View style={styles.infoBox}>
                            <Text style={styles.infoTitle}>Expérience</Text>
                            <Text style={styles.infoValue}>10 ans</Text>
                        </View>
                        <View style={styles.infoBox}>
                            <Text style={styles.infoTitle}>Identité vérifiée</Text>
                            <Text style={styles.infoValue}>OK</Text>
                        </View>
                    </View>
                    <Text style={styles.location}>Agis sur {pro.location}, Ile de France</Text>
                    <Image source={Carte} style={styles.mapImage} />

                    <Text style={styles.reviewsTitle}>Avis client</Text>
                    <View style={styles.reviewsContainer}>
                        {/* <Text style={styles.review}>Bon relationnel</Text>
                        <Text style={styles.review}>Bon matériel</Text>
                        <Text style={styles.review}>Très efficace</Text>
                        <Text style={styles.review}>Travail soigné</Text> */}
                    </View>
                    <TouchableOpacity style={styles.reserveButton} onPress={handleReserve}>
                        <Text style={styles.reserveButtonText}>Réserver</Text>
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
    },
    contentContainer: {
        flexGrow: 1,
    },
    profileContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: width * 0.08,
        paddingTop: width * 0.05, 
    },
    textContainer: {
        flex: 1,
    },
    name: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: width * 0.03,
    },
    details: {
        fontSize: 16,
        color: '#666',
    },
    photoprofil: {
        width: width * 0.2,
        height: width * 0.2,
        borderRadius: width * 0.075,
    },
    description: {
        fontSize: 14,
        color: '#333',
        marginBottom: width * 0.05,
        textAlign: 'justify',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: width * 0.05,
    },
    infoBox: {
        padding: width * 0.03,
        width: '48%',
        // flexDirection: 'row',
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
        fontSize: 16,
        color: '#666',
        marginBottom: width * 0.01,
    },
    mapImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: width * 0.05,
    },
    reviewsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: width * 0.03,
    },
    reviewsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: width * 0.05,
    },
    review: {
        fontSize: 14,
        color: '#666',
    },
    reserveButton: {
        backgroundColor: '#0041C4',
        borderRadius: 10,
        padding: width * 0.03,
        alignItems: 'center',
    },
    reserveButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default ProInfo;
