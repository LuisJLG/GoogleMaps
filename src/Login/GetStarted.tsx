import React, {useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  useColorScheme,
} from 'react-native';
import {ThemeLight} from '../Theme/Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoginUser} from './Petitions';
import {AppContext} from '../Context/AppContext';
export const GetStarted = ({navigation}: any) => {
  const colorScheme = useColorScheme();
  const context = useContext(AppContext);
  //usamos un useEffect para verificar si tenemos un usario en el LS
  //si es asi lo redirigimos al home
  useEffect(() => {
    //rescatamos el usuario del local storage
    const checkUser = async () => {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        LoginUser(parsedUser.Email, parsedUser.Password)
          .then(async data => 
          {
            if (!data.error) {
              context.setShowNavBar(true);
              context.setUser(data);
              navigation.navigate('Login');
              
            }
          })
          .catch(e => {
            //alert('Error al iniciar sesion');
          });
      }
    };
    checkUser();
  }, []);
  return (
    <View
      style={
        colorScheme === 'dark' ? styles.containerDark : styles.containerLight
      }>
      <View
        style={[
          styles.circleOne,
          colorScheme === 'dark' ? {backgroundColor: '#303030'} : null,
        ]}
      />
      <View
        style={[
          styles.circleTwo,
          colorScheme === 'dark' ? {backgroundColor: '#303030'} : null,
        ]}
      />
      <Image
        source={require('../../assets/Img/RavekhLogo.png')}
        style={styles.logo}
      />
      <View style={styles.containerInfo}>
        <Text
          style={[
            styles.title,
            colorScheme === 'dark' ? {color: '#e8e8e8'} : null,
          ]}>
          Comenzemos
        </Text>
        <Text
          style={[
            styles.subTitle,
            colorScheme === 'dark' ? {color: '#e8e8e8'} : null,
          ]}>
          Hagamos crecer tu negocio
        </Text>
        <Pressable
          style={[
            styles.btnStart,
            colorScheme === 'dark' ? {backgroundColor: '#BD3088'} : null,
          ]}
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text
            style={[
              styles.buttonText,
              colorScheme === 'dark' ? {color: '#e8e8e8'} : null,
            ]}>
            Iniciar
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  containerLight: {
    flex: 1,
    //alinear los items en la parte inferior
    justifyContent: 'flex-end',
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
    top: -106,
    left: 31,
  },
  circleTwo: {
    position: 'absolute',
    width: 460,
    height: 460,
    borderRadius: 500,
    backgroundColor: ThemeLight.primaryColor,
    top: 147,
    left: 214,
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    position: 'absolute',
    top: 283,
    left: 175,
    backgroundColor: 'white',
  },
  containerInfo: {
    marginBottom: 70,
  },
  title: {
    fontSize: 40,
    fontFamily: 'Poppins-Bold',
    padding: 10,
    color: ThemeLight.primaryColor,
  },
  subTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    padding: 10,
    marginTop: -20,
    color: ThemeLight.textColor,
  },
  btnStart: {
    backgroundColor: ThemeLight.secondaryColor,
    borderRadius: 25,
    width: '75%',
    alignSelf: 'center',
    height: 50,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 36,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
});
