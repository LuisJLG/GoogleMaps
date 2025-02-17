import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, Pressable, Platform, StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; // Para navegar de vuelta a la pantalla principal
import { ThemeLight } from '../../Theme/Theme';
import { updatePaymentDate } from './petitions';
import { AppContext } from '../../Context/AppContext';


interface PaymentResultScreenProps {
  success: boolean;
  message: string; // Mensaje detallado del resultado del pago
  plan: string;
}

export const PaymentResultScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Hook para obtener los parámetros
  const context = useContext(AppContext);

  // Acceder a los parámetros 'success' y 'message' desde route.params
  const { success, message, plan } = route.params as PaymentResultScreenProps;

  const handleReturn = () => {
    // Navegar de vuelta a la pantalla principal o a donde quieras
    navigation.navigate('MainSales' as never); // Cambia 'Ventas' por la pantalla adecuada
  };
  useEffect(() => {
    if (success) {
      let planbody = "";
      switch (plan) {
        case 'PLAN EMPRENDEDOR':
          planbody = "EMPRENDEDOR";
          break;
        case 'PLAN EMPRESARIAL':
          planbody = "EMPRESARIAL";
          break;
        case 'PLAN VIP':
          planbody = "VIP";
          break;
        default:
          console.warn('Plan desconocido:', plan);
          break;
      }
      updatePaymentDate(context.store.Id + "", context.user.Token, planbody)
        .then((response) => {
          if (response) {
            context.setStore({ ...context.store, Plan: planbody });
          }
        });
    }
  }, []); // Ejecutar una vez al cargar el componente

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor:
            /*context.store.Color ? context.store.Color :*/ ThemeLight.btnBackground,
          height: Platform.OS === 'ios' ? 40 : 0,
        }}

      />
      <StatusBar
        backgroundColor={/*context.store.Color ? context.store.Color :*/ ThemeLight.btnBackground}
        barStyle={'light-content'}
      />
      {success ? (
        <View style={styles.successContainer}>
          <Image
            source={require('../../../assets/Img/paymentSucessfull.webp')}
            style={styles.image}
          />
          <Text style={styles.title}>¡Pago exitoso!</Text>
          <Text style={styles.message}>{message}</Text>
        </View>
      ) : (
        <View style={styles.errorContainer}>
          <Image
            source={require('../../../assets/Img/paymentError.webp')}
            style={styles.image}
          />
          <Text style={styles.title}>El pago falló</Text>
          <Text style={styles.message}>{message}</Text>
        </View>
      )}
      <Pressable style={styles.returnButton} onPress={handleReturn}>
        <Text style={styles.returnButtonText}>Volver</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  errorContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#606060',
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    width: 180,
    height: 250,
    marginBottom: 20,
  },
  returnButton: {
    backgroundColor: ThemeLight.btnBackground,
    padding: 10,
    borderRadius: 10,
    width: '100%',
  },
  returnButtonText: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    textAlign: 'center',
  },
});
