import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Pressable,
} from 'react-native';
import {ThemeLight} from '../Theme/Theme';
import { AppContext } from '../Context/AppContext';
//PANTALLA DONDE SE REGISTRA EL CORREO Y DA PIE A CREAR
//UNA CUENTA NUEVA
export const RegisterEmail = ({navigation}: any) => {
  const context = useContext(AppContext);
  const [Number, setNumber] = useState('');
  const [NumberFocus, setNumberFocus] = useState(false);
  const addMailType = (mailType: string) => {
    //verificar si el correo ya tiene un @ para no agregar otro
    if (Number.includes('@')) {
      return;
    }
    if (Number != '') {
      setNumber(Number + mailType);
      return;
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/Img/RavekhLogo.png')}
        style={styles.logo}
      />

      <View
        style={
          NumberFocus ? styles.inputContainer : styles.inputContainerNotFocus
        }>
        <TextInput
          style={styles.input}
          placeholder="Ejemplo@ejemplo.com"
          placeholderTextColor={ThemeLight.borderColor}
          value={Number}
          keyboardType="numeric"
          onChangeText={(value: string) => {
            setNumber(value);
          }}
          onFocus={() => {
            setNumberFocus(!NumberFocus);
          }}
          onBlur={() => {
            setNumberFocus(false);
          }}
        />
        <View style={styles.labelContainer}>
          <Text style={NumberFocus ? styles.label : styles.labelNotFocus}>
            Correo
          </Text>
        </View>
      </View>

      <View style={styles.containerMails}>
        <Pressable
          style={styles.btnMail}
          onPress={() => {
            addMailType('@gmail.com');
          }}>
          <Text style={styles.textMail}>@gmail.com</Text>
        </Pressable>
        <Pressable
          style={styles.btnMail}
          onPress={() => {
            addMailType('@hotmail.com');
          }}>
          <Text style={styles.textMail}>@hotmail.com</Text>
        </Pressable>
        <Pressable
          style={styles.btnMail}
          onPress={() => {
            addMailType('@outlook.com');
          }}>
          <Text style={styles.textMail}>@outlook.com</Text>
        </Pressable>
      </View>

      <Pressable style={Number.includes('@') ? styles.btnNextAvailable : styles.btnNextUnavailable} 
        onPress={() => {
          //Validar que el correo tenga un @
          if (Number.includes('@')) {
            context.setUser({...context.user});
            navigation.navigate('CreateAccount', {Number: Number}); 
            
          }
        }
      }
      >
        <Text style={Number.includes('@') ? styles.textNext : styles.textNextUnavailable}>Siguiente</Text>
      </Pressable>

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
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 150,
    marginBottom: 50,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: ThemeLight.secondaryColor,
    paddingTop: 8,
    paddingHorizontal: 16,
    width: '80%',
    borderRadius: 4,
    marginTop: 10,
  },
  inputContainerNotFocus: {
    borderWidth: 1,
    borderColor: ThemeLight.borderColor,
    paddingTop: 8,
    paddingHorizontal: 16,
    width: '80%',
    borderRadius: 4,
    marginTop: 10,
  },
  input: {
    height: 44,
    fontSize: 16,
    color: ThemeLight.secondaryColor,
    fontFamily: 'Poppins-SemiBold',
  },
  labelContainer: {
    position: 'absolute',
    backgroundColor: '#fff',
    top: -14, // Ajusta este valor para que se alinee perfectamente con el borde superior de tu input
    left: 22, // Ajusta según corresponda con el padding de tu input
    paddingHorizontal: 4, // Para que el fondo cubra el texto de la etiqueta
  },
  label: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: ThemeLight.secondaryColor, // Color gris para el texto de la etiqueta
  },
  labelNotFocus: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: ThemeLight.borderColor, // Color gris para el texto de la etiqueta
  },
  containerMails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  btnMail: {
    backgroundColor: ThemeLight.backgrounColor,
    borderRadius: 25,
    alignSelf: 'center',
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    padding: 2,
  },
  textMail: {
    color: ThemeLight.textColor,
    fontSize: 10,
    fontFamily: 'Poppins-SemiBold',
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
  }

});
