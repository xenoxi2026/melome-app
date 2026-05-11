import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image
} from 'react-native';
import axios from 'axios';
import { saveUser } from '../storage/offlineStorage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    setLoading(true);
    try {
      // Demo driver login (replace with real API)
      const demoDrivers = {
        'driver@melome.com': { id: 101, name: 'Sipho Dlamini', email: 'driver@melome.com', role: 'driver', phone: '+27784567890' },
        'thabo.driver@melome.com': { id: 102, name: 'Thabo Nkosi', email: 'thabo.driver@melome.com', role: 'driver', phone: '+27785678901' }
      };

      if (demoDrivers[email] && password === 'driver123') {
        const driverData = demoDrivers[email];
        await saveUser(driverData);
        navigation.replace('MainApp');
      } else {
        Alert.alert('Error', 'Invalid credentials.\nDemo: driver@melome.com / driver123');
      }
    } catch (error) {
      Alert.alert('Error', 'Login failed. Check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>ðŸšš Melome Driver</Text>
        <Text style={styles.subtitle}>Driver Mobile App</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#64748b"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#64748b"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Login â†’</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.demoText}>
          Demo: driver@melome.com / driver123
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 30,
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: '#334155'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#10b981',
    textAlign: 'center',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 30
  },
  input: {
    backgroundColor: '#0f172a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    color: 'white',
    borderWidth: 1,
    borderColor: '#334155'
  },
  button: {
    backgroundColor: '#10b981',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8
  },
  buttonText: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: 'bold'
  },
  demoText: {
    color: '#64748b',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 20
  }
});

export default LoginScreen;