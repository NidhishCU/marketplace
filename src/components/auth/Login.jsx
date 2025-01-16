import React, { useState } from 'react';
import { Button, TextInput, View, Alert } from 'react-native';
import sdk from '../../../sdk'; 

function LoginForm({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Handle user login
    const handleLogin = async () => {
        try {
            // Authenticate user with Sharetribe using email and password
            const loginRes = await sdk.login({
                username: email,
                password: password,
            });

            // Check if login was successful
            if (loginRes) {
                console.log("Login successful:", loginRes);
                // Pass the authenticated user data to the parent component
                navigation.replace('Home');
            } else {
                Alert.alert("Error", "Failed to log in.");
            }
        } catch (error) {
            console.error("Login failed", error);
            Alert.alert("Error", "Failed to log in. Please try again.");
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={{ marginBottom: 10, borderWidth: 1, padding: 8 }}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
                style={{ marginBottom: 10, borderWidth: 1, padding: 8 }}
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
}

export default LoginForm;
