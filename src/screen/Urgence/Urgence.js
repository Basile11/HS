import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native';

import ButtonUrgence from '../../components/ButtonUrgence/ButtonUrgence';

import water from '../../../assets/urgence/drop-line.png';
import key from '../../../assets/urgence/key-2-fill.png';
import elec from '../../../assets/urgence/flashlight-line.png';
import temp from '../../../assets/urgence/temp-hot-line.png';
import bug from '../../../assets/urgence/bug-line.png';

const { width } = Dimensions.get('window');

function Urgence({ navigation }) {
    // React.useEffect(() => {
    //     navigation.addListener('beforeRemove', (e) => {
    //         e.preventDefault(); // Prevent default behavior of going back
    //     });
    // }, [navigation]);

    const navPlombier = () => {
        navigation.navigate('UrgenceTypePlomb');
    };
    const navElec = () => {
        navigation.navigate('UrgenceTypeElec');
    };
    const navChauf = () => {
        navigation.navigate('UrgenceTypeChauf');
    };
    const navDerat = () => {
        navigation.navigate('UrgenceTypeDerat');
    };
    const navSerr = () => {
        navigation.navigate('UrgenceTypeSerr');
    };

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
                        <ButtonUrgence text="Plombier" imageSource={water} onPress={navPlombier} />
                        <ButtonUrgence text="Serrurier" imageSource={key} onPress={navSerr} />
                        <ButtonUrgence text="Electricien" imageSource={elec} onPress={navElec} />
                        <ButtonUrgence text="Chauffagiste" imageSource={temp} onPress={navChauf} />
                        <ButtonUrgence text="Dératiseur" imageSource={bug} onPress={navDerat} />

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
        paddingHorizontal: width * 0.05,
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
    instructions: {
        fontSize: 14,
        color: '#969696',
        marginBottom: width * 0.08,
        fontWeight:'500',
    },
});

export default Urgence;
