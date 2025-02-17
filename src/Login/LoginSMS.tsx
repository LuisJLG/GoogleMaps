import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  useColorScheme,
} from 'react-native';
import { FloatingLabelInput } from '../Utilities/FloatingLabelInput';
import { FloatingLabelInputIcon } from '../Utilities/FloatingLabelInputIcon';

export const PhoneNumberScreen = ({ navigation }: any) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const isButtonEnabled = phoneNumber.length > 0 && password.length > 0;

  const handleLogin = () => {
    // Navegar a VerificationCodeScreen
    navigation.navigate('VerificationCodeScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>🌀</Text>
        <Text style={styles.businessName}>Nombre negocio</Text>
      </View>

      <View style={styles.inputContainer}>
        <FloatingLabelInput
          label={'Teléfono'}
          placeholder="445-XXX-XX-XX"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        <FloatingLabelInputIcon
          label="Contraseña"
          value={password}
          onChangeText={setPassword}
          placeholder="Contraseña"
          keyboardType="default"
        />
      </View>

      <Pressable
        style={[
          styles.button,
          isButtonEnabled && { backgroundColor: '#282828' },
        ]}
        disabled={!isButtonEnabled}
        onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      <View style={styles.footer}>
        <Pressable onPress={() => navigation.navigate('CreateAccount')}>
          <Text style={styles.link}>Crear cuenta</Text>
        </Pressable>
        <Text style={styles.divider}> | </Text>
        <Pressable onPress={() => navigation.navigat('login')}>
          <Text style={styles.link}>Olvidaste tu contraseña</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    fontSize: 50,
    color: '#282828',
  },
  businessName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#282828',
    marginTop: 10,
  },
  inputContainer: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
  },
  phoneInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C6C6C6',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  countryCode: {
    fontSize: 16,
    color: '#555',
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    color: '#555',
  },
  button: {
    marginTop: 30,
    width: '100%',
    backgroundColor: '#C6C6C6',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  link: {
    color: '#1E90FF',
    fontSize: 14,
  },
  divider: {
    marginHorizontal: 5,
    color: '#000',
  },
});
