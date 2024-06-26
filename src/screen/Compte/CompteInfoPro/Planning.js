import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';
import CheckBox from 'expo-checkbox';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { app, auth, database } from '../../../../firebase';

const Planning = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const [schedule, setSchedule] = useState({});
    const [isAvailable, setIsAvailable] = useState(true);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const database = getDatabase();
            const scheduleRef = ref(database, 'professionnel/' + user.uid + '/schedule');

            onValue(scheduleRef, (snapshot) => {
                const data = snapshot.val();
                setSchedule(data);
            });
        }
    }, []);

    const handleDayPress = (day) => {
        setSelectedDay(day);
        setIsAvailable(schedule[day]?.isAvailable ?? true);
        setStartTime(schedule[day]?.startTime ?? '08:30');
        setEndTime(schedule[day]?.endTime ?? '17:00');
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedDay(null);
    };

    const handleSave = () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user && selectedDay) {
            const database = getDatabase();
            const dayRef = ref(database, 'professionnel/' + user.uid + '/schedule/' + selectedDay);

            update(dayRef, { isAvailable, startTime, endTime })
                .then(() => {
                    console.log('Data updated successfully');
                    setSchedule((prev) => ({
                        ...prev,
                        [selectedDay]: {
                            ...prev[selectedDay],
                            isAvailable,
                            startTime,
                            endTime,
                        },
                    }));
                    closeModal();
                })
                .catch((error) => {
                    console.error('Error updating data: ', error);
                });
        }
    };

    const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Planning</Text>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {days.map((day) => (
                    <TouchableOpacity key={day} style={styles.item} onPress={() => handleDayPress(day)}>
                        <Text style={styles.itemTitle}>{day}</Text>
                        <Text style={styles.itemSubtitle}>
                            {schedule[day]?.isAvailable === false ? 'Non disponible ce jour' : `${schedule[day]?.startTime ?? '8h'} à ${schedule[day]?.endTime ?? '17h30'}`}
                        </Text>
                    </TouchableOpacity>
                ))}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Période d'absence à venir</Text>
                    {[
                        { title: 'Vacances de février', dates: '24/02/2024 - 01/03/2024' },
                        { title: 'Vacances d\'été', dates: '26/08/2024 - 01/09/2024' }
                    ].map((absence) => (
                        <TouchableOpacity key={absence.title} style={styles.item}>
                            <Text style={styles.itemTitle}>{absence.title}</Text>
                            <Text style={styles.itemSubtitle}>{absence.dates}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalHeader}>Horaires du {selectedDay}</Text>
                        <View style={styles.checkboxContainer}>
                            <CheckBox
                                value={!isAvailable}
                                onValueChange={() => setIsAvailable(!isAvailable)}
                                style={styles.checkbox}
                            />
                            <Text style={styles.label}>Je ne suis pas disponible ce jour</Text>
                        </View>
                        <View style={styles.timeContainer}>
                            <View style={styles.timeBox}>
                                <Text style={styles.timeLabel}>Début</Text>
                                <TextInput
                                    style={styles.timeInput}
                                    value={startTime}
                                    onChangeText={setStartTime}
                                    editable={isAvailable}
                                />
                            </View>
                            <View style={styles.timeBox}>
                                <Text style={styles.timeLabel}>Fin</Text>
                                <TextInput
                                    style={styles.timeInput}
                                    value={endTime}
                                    onChangeText={setEndTime}
                                    editable={isAvailable}
                                />
                            </View>
                        </View>
                        <TouchableOpacity style={styles.button} onPress={handleSave}>
                            <Text style={styles.buttonText}>Valider ces horaires</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('ComptePro')}>
                <Text style={styles.homeButtonText}>Retour à la page d'accueil</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: '20%',
        backgroundColor: '#0041C4',
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#fff',
        paddingHorizontal: '5%',
    },
    contentContainer: {
        flexGrow: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: '5%',
        paddingVertical: 20,
    },
    item: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    itemSubtitle: {
        fontSize: 14,
        color: '#888',
    },
    section: {
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#000',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
    },
    checkbox: {
        marginRight: 10,
    },
    label: {
        fontSize: 16,
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
    timeBox: {
        borderWidth: 1,
        borderColor: '#0041C4',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        width: '40%',
    },
    timeLabel: {
        fontSize: 16,
        color: '#0041C4',
        marginBottom: 10,
    },
    timeInput: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#0041C4',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    homeButton: {
        backgroundColor: '#0041C4',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        margin: 20,
    },
    homeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Planning;
