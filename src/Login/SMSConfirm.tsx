import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
  StatusBar,
  ActivityIndicator,
  TextInput,
  Button,
} from 'react-native';
import {ThemeDark, ThemeLight} from '../Theme/Theme';
import {Back} from '../Utilities/Back';
import {FloatingLabelInput} from '../Utilities/FloatingLabelInput';
import {FloatingLabelInputIcon} from '../Utilities/FloatingLabelInputIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from '../Context/AppContext';

// Definimos el tipo manualmente
type ConfirmationResult = {
  confirm: (code: string) => Promise<any>;
};

type SMSConfirmProps = {
  confirmation: ConfirmationResult;
  phoneNumber: string; // Para mostrar el número telefónico en la pantalla
};

export const SMSConfirm: React.FC<SMSConfirmProps> = ({ confirmation, phoneNumber }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);

  const handleCodeChange = (index: number, value: string) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  };

  const verifyCode = async () => {
    try {
      const fullCode = code.join('');
      const userCredential = await confirmation.confirm(fullCode);
      console.log("Usuario autenticado:", userCredential.user);
      await AsyncStorage.setItem('userToken', userCredential.user.uid);
    } catch (error) {
      console.error("Error al confirmar el código:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>Enter verification code</Text>
      <Text style={styles.subtitle}>Te hemos enviado un código de verificación</Text>
      <Text style={styles.phoneNumber}>{phoneNumber}</Text>

      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.codeInput}
            value={digit}
            onChangeText={(value) => handleCodeChange(index, value)}
            keyboardType="numeric"
            maxLength={1}
          />
        ))}
      </View>

      <Button title="Verificar" onPress={verifyCode} disabled={code.some((digit) => digit === '')} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 5,
  },
  phoneNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 20,
  },
  codeInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 18,
  },
});
