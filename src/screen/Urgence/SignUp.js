import React from 'react';
import { View, Text, Button } from 'react-native';

function SignUp({ navigation }) {
    const goToHome = () => {
        navigation.navigate('Home');
    };

    return (
        <View>
            <Text>Welcome to Sign Up Page!</Text>
            {/* Add your sign up form components here */}
            <Button title="Back to Home" onPress={goToHome} />
        </View>
    );
}

export default SignUp;
