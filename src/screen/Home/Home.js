import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Home() {
    const navigation = useNavigation();

    const goToUrgencePage = () => {
        navigation.navigate('Urgence');
    };

    const goToSignInPage = () => {
        navigation.navigate('SignIn');
    };

    const goToSignUpPage = () => {
        navigation.navigate('SignUp');
    };

    return (
        <View>
            <Text>Welcome to the Home Page!</Text>
            <Text>This is the content of your home page.</Text>
            <Button title="Go to Urgence Page" onPress={goToUrgencePage} />
            <Button title="Go to SignIn Page" onPress={goToSignInPage} />
            <Button title="Go to SignUp Page" onPress={goToSignUpPage} />
        </View>
    );
}

export default Home;
