import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';

function SignIn({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isProfessional, setIsProfessional] = useState(false);
    const [isParticulier, setIsParticulier] = useState(true);

    const goToHome = () => {
        navigation.navigate('Home');
    };

    const handleSignIn = () => {
        // navigation.navigate('UrgenceTabs'); // Navigate to UrgenceTabs after sign in
        navigation.navigate('NavBar'); // Navigate to UrgenceTabs after sign in
    };

    return (
        <View>
            <Text>Welcome to Sign In Page!</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                <Button title="Professional" onPress={() => { setIsProfessional(true); setIsParticulier(false); }} />
                <Button title="Personal" onPress={() => { setIsProfessional(false); setIsParticulier(true); }} />
            </View>

            {isProfessional && (
                <View>
                    <Text>Enter Professional Information:</Text>
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />
                </View>
            )}

            {isParticulier && (
                <View>
                    <Text>Enter personnel Information:</Text>
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />
                </View>
            )}

            <Button title="Sign In" onPress={handleSignIn} />
            <Button title="Back to Home" onPress={goToHome} />
        </View>
    );
}

export default SignIn;
