// screens/Login.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; // adjust path if needed
import { supabase } from '../lib/supabase';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)


    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Missing fields', 'Please enter both email and password.')
            return
        }

        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            Alert.alert('Login Failed', error.message)
        }

        setLoading(false)
    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} value={email} />
            <TextInput style={styles.input} placeholder="Password" onChangeText={setPassword} value={password} secureTextEntry />
            <Button title="Login" onPress={handleLogin} />

            {/* Navigate to Signup */}
            <Pressable onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.link}>Don't have an account? Sign Up</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 24, flex: 1, justifyContent: 'center' },
    input: { borderWidth: 1, padding: 12, marginBottom: 12, borderRadius: 6 },
    link: { color: '#1e90ff', marginTop: 16, textAlign: 'center' },
});
