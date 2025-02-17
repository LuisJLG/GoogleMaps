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
} from 'react-native';
import {ThemeDark, ThemeLight} from '../Theme/Theme';
import {Back} from '../Utilities/Back';
import {FloatingLabelInput} from '../Utilities/FloatingLabelInput';
import {FloatingLabelInputIcon} from '../Utilities/FloatingLabelInputIcon';
import {LoginUser} from './Petitions copy';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from '../Context/AppContext';

export const Login = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme();
  const context = useContext(AppContext);

  const handleLogin = async () => {
    setLoading(true);
    LoginUser(email, password)
      .then(async data => {
        if (data.error) {
          setEmail('');
          setPassword('');
          setError(true);
        } else {
          await AsyncStorage.setItem(
            'user',
            JSON.stringify({Email: email, Password: password}),
          );
          context.setUser(data);
          context.setShowNavBar(true);
        }
      })
      .catch(e => {
        //alert('Error al iniciar sesion');
      })
      .finally(() => {
        setLoading(false);
      });

    setTimeout(() => {
      setError(false);
    }, 3000);
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}} // Ocupa toda la pantalla
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, justifyContent: 'flex-start'}}>
          <View>
            <View style={styles.circleOne} />
            <View style={styles.circleTwo} />
            <Back navigation={navigation} />
            <View style={styles.inputContainer}>
              <FloatingLabelInput
                label="Correo"
                value={email}
                onChangeText={setEmail}
                placeholder="Correo"
                keyboardType="email-address"
              />
              {error ? (
                <Text
                  style={{
                    color: 'red',
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: 10,
                    textAlign: 'center',
                  }}>
                  Verifica tus datos
                </Text>
              ) : null}
              <FloatingLabelInputIcon
                label="Contraseña"
                value={password}
                onChangeText={setPassword}
                placeholder="Contraseña"
                keyboardType="default"
              />
            </View>
          </View>

          <View>
            <Pressable style={styles.button} onPress={() => navigation.navigate('MainUser')}>
              <Text style={styles.textButton}>Iniciar sesión</Text>
            </Pressable>
            {/*
<Text style={styles.textContinue}>O iniciar con</Text>
            <View style={styles.containerBtnContinue}>
              <Pressable
                style={[
                  styles.buttonContinue,
                  colorScheme === 'dark'
                    ? { backgroundColor: ThemeDark.primaryColor }
                    : null,
                ]}
              >
                <Text
                  style={[
                    styles.textButtonContinue,
                    colorScheme === 'dark' ? { color: '#fefefe' } : null,
                  ]}
                >
                  Google
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.buttonContinue,
                  colorScheme === 'dark'
                    ? { backgroundColor: ThemeDark.primaryColor }
                    : null,
                ]}
              >
                <Text
                  style={[
                    styles.textButtonContinue,
                    colorScheme === 'dark' ? { color: '#fefefe' } : null,
                  ]}
                >
                  Facebook
                </Text>
              </Pressable>
            </View>
              */}

            <View style={styles.footer}>
              <Text style={[styles.textContinue, {fontSize: 18}]}>
                ¿No tienes una cuenta?
              </Text>
              <Pressable onPress={() => navigation.navigate('RegisterEmail')}>
                <Text
                  style={[
                    styles.textContinue,
                    {
                      color: ThemeLight.secondaryColor,
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: 18,
                    },
                  ]}>
                  Regístrate
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={ThemeLight.primaryColor} />
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  containerLight: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  containerDark: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#161616',
  },
  circleOne: {
    position: 'absolute',
    width: 460,
    height: 460,
    borderRadius: 500,
    backgroundColor: ThemeLight.primaryColor,
    top: -250,
    right: 200,
  },
  circleTwo: {
    position: 'absolute',
    width: 460,
    height: 460,
    borderRadius: 500,
    backgroundColor: ThemeLight.secondaryColor,
    top: -280,
    left: 150,
  },
  inputContainer: {
    marginTop: 170,
    width: '85%',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: ThemeLight.primaryColor,
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    height: 58,
    width: '85%',
    alignSelf: 'center',
    marginBottom: 50,
  },
  textButton: {
    color: '#fefefe',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  textContinue: {
    color: ThemeLight.textColor,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  containerBtnContinue: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  buttonContinue: {
    backgroundColor: '#F1F5F9',
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    height: 58,
    width: '40%',
  },
  textButtonContinue: {
    color: ThemeLight.textColor,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
