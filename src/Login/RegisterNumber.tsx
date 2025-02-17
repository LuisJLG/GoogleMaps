import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {ThemeLight} from '../Theme/Theme';
import { AppContext } from '../Context/AppContext';
//PANTALLA DONDE SE REGISTRA EL CORREO Y DA PIE A CREAR
//UNA CUENTA NUEVA
export const RegisterNumber = ({navigation}: any) => {
  const context = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [emailFocus, setEmailFocus] = useState(false);
  const addMailType = (mailType: string) => {
    //verificar si el correo ya tiene un @ para no agregar otro
    if (email.includes('@')) {
      return;
    }
    if (email != '') {
      setEmail(email + mailType);
      return;
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Verificación SMS</Text>
      </View>

      <View style={styles.verificationContainer}>
        <View style={styles.phoneInputContainer}>
          <Text style={styles.countryCode}>+52</Text>
          <TextInput
            style={styles.phoneInput}
            placeholder="1234567899"
            keyboardType="numeric"
          />
        </View>
        <Text style={styles.infoText}>
          Enviaremos un SMS al número proporcionado para la autenticación del usuario.
        </Text>
        <TouchableOpacity style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    width: '100%',
    backgroundColor: '#1F3B87',
    paddingVertical: 16,
    alignItems: 'center',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  verificationContainer: {
    marginTop: 40,
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  countryCode: {
    fontSize: 16,
    color: '#333333',
    marginRight: 8,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  infoText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: '#1F3B87',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
  /*return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/Img/RavekhLogo.png')}
        style={styles.logo}
      />

      <View
        style={
          emailFocus ? styles.inputContainer : styles.inputContainerNotFocus
        }>
        <TextInput
          style={styles.input}
          placeholder="Ejemplo@ejemplo.com"
          placeholderTextColor={ThemeLight.borderColor}
          value={email}
          keyboardType="email-address"
          onChangeText={(value: string) => {
            setEmail(value);
          }}
          onFocus={() => {
            setEmailFocus(!emailFocus);
          }}
          onBlur={() => {
            setEmailFocus(false);
          }}
        />
        <View style={styles.labelContainer}>
          <Text style={emailFocus ? styles.label : styles.labelNotFocus}>
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

      <Pressable style={email.includes('@') ? styles.btnNextAvailable : styles.btnNextUnavailable} 
        onPress={() => {
          //Validar que el correo tenga un @
          if (email.includes('@')) {
            context.setUser({...context.user});
            navigation.navigate('CreateAccount', {email: email}); 
            
          }
        }
      }
      >
        <Text style={email.includes('@') ? styles.textNext : styles.textNextUnavailable}>Siguiente</Text>
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
*/