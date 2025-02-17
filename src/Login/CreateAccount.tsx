import React, {useState, useContext} from 'react';
import {View, Text, Pressable, TextInput, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';
//\icono de la flecha de retroceso
import {ChevronBack} from '../../assets/SVG/ChevronBack';
import {Header} from '../Utilities/Header';
import {ThemeLight} from '../Theme/Theme';
import {FloatingLabelInput} from '../Utilities/FloatingLabelInput';
import {FloatingLabelInputIcon} from '../Utilities/FloatingLabelInputIcon';
import Modal from 'react-native-modal';
import {InsertNewUser} from '../Login/Petitions copy';
import { AppContext } from '../Context/AppContext';
//REGISTRA EL USUARIO Y CONSTRASEÑA
//PARA PODER REGISTRAR UNA CUENTA NUEVA
export const CreateAccount = ({navigation}:any) => {
  const route = useRoute();
  const {email}: {email?: string} = route.params || {};
  //contexto de la aplicacion para guardar el usuario y la contraseña
  const context = useContext(AppContext);
  //variables para el estado del usuario y su focus
  const [user, setUser] = useState('');
  const [userFocus, setUserFocus] = useState(false);
  //variables para el estado de la contraseña y su focus
  const [password, setPassword] = useState('');
  const [passwordFocus, setPasswordFocus] = useState(false);
  //manejador de error en caso de que el usuario o la contraseña sean menores a 6 caracteres
  const [modalIsVisible, setModalIsVisible] = useState(false);
  //INFORMACION DE ERRORES
  const [error, setError] = useState('');
  //insertamos el nuevo usuario
  const newUser = async () => {
    if (user.length < 6 || password.length < 6) {
      setError('El usuario y la contraseña deben tener al menos 6 caracteres');
      setModalIsVisible(true);
      return;
    } else {
      context.setUser({...context.user, Name: user, Password: password});
        navigation.navigate('RegisterNumber'); //provicional mientras se implementa la base de datos

    }
  };
  return (
    <View style={styles.container}>
      <Header screenName="Crear cuenta" navigation={navigation} />
      <Text style={styles.emailText}>{email}</Text>
      <View style={styles.inputContainer}>
        <FloatingLabelInput
          label="Nombre"
          value={user}
          onChangeText={setUser}
          placeholder="Juan Pérez"
          keyboardType="default"
        />
        <FloatingLabelInputIcon
          label="Contraseña"
          value={password}
          onChangeText={setPassword}
          placeholder="Contraseña"
          keyboardType="default"
        />
      </View>
      <Text style={styles.minCaracteres}>Min. 6 caracteres</Text>
      <Pressable
        style={
          user != '' && password != ''
            ? styles.btnNextAvailable
            : styles.btnNextUnavailable
        }
        onPress={() => {
          newUser();
        }}>
        <Text
          style={
            user != '' && password != ''
              ? styles.textNext
              : styles.textNextUnavailable
          }>
          Avanzar
        </Text>
      </Pressable>

      <Modal
        style={styles.modal}
        isVisible={modalIsVisible}
        swipeDirection={['down']}
        backdropOpacity={0.58}
        onSwipeComplete={() => setModalIsVisible(false)}
        onBackdropPress={() => setModalIsVisible(false)}
        onBackButtonPress={() => setModalIsVisible(false)}
        animationIn="slideInUp"
        animationOut="slideOutDown">
        <View style={styles.modalContent}>
          <Text
            style={{
              color: ThemeLight.textColor,
              fontFamily: 'Poppins-SemiBold',
              fontSize: 24,
            }}>
            ADVERTENCIA
          </Text>
          <View style={styles.containerColor}>
            <Text
              style={{
                color: ThemeLight.textColor,
                fontFamily: 'Poppins-Regular',
                fontSize: 20,
              }}>
              {error}
            </Text>
            <Pressable
              style={{
                backgroundColor: ThemeLight.secondaryColor,
                height: 44,
                width: '75%',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 25,
                marginTop: 20,
                alignSelf: 'center',
              }}
              onPress={() => {
                setModalIsVisible(false);
              }}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 20,
                  width: '100%',
                  textAlign: 'center',
                }}>
                Aceptar
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  emailText: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: ThemeLight.textColor,
    marginTop: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginTop: 20,
    width: '85%',
    alignSelf: 'center',
  },
  minCaracteres: {
    fontSize: 10,
    fontFamily: 'Poppins-SemiBold',
    color: ThemeLight.textColor,
    marginTop: 10,
    textAlign: 'center',
  },
  btnNextAvailable: {
    backgroundColor: ThemeLight.secondaryColor,
    borderRadius: 25,
    width: '75%',
    alignSelf: 'center',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  btnNextUnavailable: {
    backgroundColor: ThemeLight.boxShadow,
    borderRadius: 25,
    width: '75%',
    alignSelf: 'center',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  textNext: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
  },
  textNextUnavailable: {
    color: ThemeLight.borderColor,
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  containerColor: {
    justifyContent: 'space-around',
    width: '100%',
  },
});