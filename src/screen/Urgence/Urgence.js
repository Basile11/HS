import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native';

import water from '../../../assets/urgence/drop-line.png';
import key from '../../../assets/urgence/key-2-fill.png';
import elec from '../../../assets/urgence/flashlight-line.png';
import temp from '../../../assets/urgence/temp-hot-line.png';
import bug from '../../../assets/urgence/bug-line.png';

const { width } = Dimensions.get('window');

function Urgence({ navigation }) {
    React.useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
            e.preventDefault(); // Prevent default behavior of going back
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Accueil</Text>
            </View>
            <View style={styles.content}>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <Text style={styles.greeting}>Besoin d'aide ?</Text>
                    <Text style={styles.instructions}>Sélectionnez le domaine pour lequel vous avez besoin d'un professionnel.</Text>
                    <View>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Plombier</Text>
                            <Image source={water} style={styles.logourgence} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Serrurier</Text>
                            <Image source={key} style={styles.logourgence} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Électricien</Text>
                            <Image source={elec} style={styles.logourgence} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Chauffagiste</Text>
                            <Image source={temp} style={styles.logourgence} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Dératiseur</Text>
                            <Image source={bug} style={styles.logourgence} />
                        </TouchableOpacity>
                    </View>                    
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
        paddingHorizontal: '3%',
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
        marginBottom: 10,
    },
    instructions: {
        fontSize: 14,
        color: '#000',
        marginBottom: width * 0.1,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderColor: '#0041C4',
        borderWidth: 1,
        borderRadius: 10,
        padding: width * 0.07,
        marginBottom: 10,
    },
    buttonText: {
        color: '#0041C4',
        fontSize: 16,
        fontWeight: '500', 
    },
    logourgence: {
        width: 24,
        height: 24,
    },
});

export default Urgence;
