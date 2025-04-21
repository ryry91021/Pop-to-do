// screens/Signup.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Pressable } from 'react-native';
import { supabase } from '../lib/supabase';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; // Adjust path if needed

type SignupScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Signup'>;

export default function SignupScreen() {
    const navigation = useNavigation<SignupScreenNavigationProp>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSignup = async () => {
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            Alert.alert(
                'Success',
                'Check your email for a confirmation link.',
                [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
            );
        }

        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>

            <TextInput
                style={styles.input}
                autoCapitalize="none"
                autoComplete="email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
            />

            <TextInput
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
            />

            {error && <Text style={styles.error}>{error}</Text>}

            <Button title={loading ? 'Creating account...' : 'Sign Up'} onPress={handleSignup} disabled={loading} />

            <Pressable onPress={() => navigation.navigate('Login')}>
                <Text style={styles.link}>Already have an account? Log In</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 24, flex: 1, justifyContent: 'center' },
    title: { fontSize: 28, marginBottom: 24, textAlign: 'center', fontWeight: '600' },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 12, marginBottom: 16, borderRadius: 6 },
    error: { color: 'red', marginBottom: 12, textAlign: 'center' },
    link: { color: '#1e90ff', marginTop: 20, textAlign: 'center' },
});
