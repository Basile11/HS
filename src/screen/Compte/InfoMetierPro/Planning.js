import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import CheckBox from 'expo-checkbox';

const Planning = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const [isAvailable, setIsAvailable] = useState(true);

    const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

    const handleDayPress = (day) => {
        setSelectedDay(day);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedDay(null);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Planning</Text>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {days.map((day) => (
                    <TouchableOpacity key={day} style={styles.item} onPress={() => handleDayPress(day)}>
                        <Text style={styles.itemTitle}>{day}</Text>
                        <Text style={styles.itemSubtitle}>8h à 17h30</Text>
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

            {/* Modal for day schedule */}
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
                                <Text style={styles.timeValue}>8h</Text>
                            </View>
                            <View style={styles.timeBox}>
                                <Text style={styles.timeLabel}>Fin</Text>
                                <Text style={styles.timeValue}>17h30</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.button} onPress={closeModal}>
                            <Text style={styles.buttonText}>Valider ces horaires</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    timeValue: {
        fontSize: 20,
        fontWeight: 'bold',
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
});

export default Planning;
