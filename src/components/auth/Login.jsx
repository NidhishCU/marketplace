import React from 'react';
import { Button, TextInput, View, Alert,Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import sdk from '../../../sdk'; 

// Define validation schema using Zod
const schema = z.object({
    email: z.string().email('Invalid email address').nonempty('Email is required'),
    password: z.string().min(6, 'Password should be at least 6 characters').nonempty('Password is required'),
});

function LoginForm({ navigation }) {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    // Handle user login
    const handleLogin = async (data) => {
        try {
            const { email, password } = data;

            // Authenticate user with Sharetribe using email and password
            const loginRes = await sdk.login({
                username: email,
                password: password,
            });

            // Check if login was successful
            if (loginRes) {
                console.log("Login successful:", loginRes);
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
            <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                    <>
                        <TextInput
                            placeholder="Email"
                            value={value}
                            onChangeText={onChange}
                            style={{
                                marginBottom: 10,
                                borderWidth: 1,
                                padding: 8,
                                borderColor: errors.email ? 'red' : '#ccc',
                            }}
                        />
                        {errors.email && (
                            <Text style={{ color: 'red' }}>{errors.email.message}</Text>
                        )}
                    </>
                )}
            />
            <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                    <>
                        <TextInput
                            placeholder="Password"
                            value={value}
                            onChangeText={onChange}
                            secureTextEntry
                            style={{
                                marginBottom: 10,
                                borderWidth: 1,
                                padding: 8,
                                borderColor: errors.password ? 'red' : '#ccc',
                            }}
                        />
                        {errors.password && (
                            <Text style={{ color: 'red' }}>{errors.password.message}</Text>
                        )}
                    </>
                )}
            />
            <Button title="Login" onPress={handleSubmit(handleLogin)} />
        </View>
    );
}

export default LoginForm;
