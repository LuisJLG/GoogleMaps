// PaymentScreenStripe.tsx

import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { AppContext } from '../../Context/AppContext';
import { URL } from '../../Const/Const';
import { usePayment } from './PaymentProvider';

interface PaymentScreenStripeProps {
  navigation: any;
  plan: string;
}

interface PaymentSheetParams {
  paymentIntent: string;
  ephemeralKey: string;
  customer: string;
}

export const PaymentScreenStripe: React.FC<PaymentScreenStripeProps> = ({
  navigation,
  plan
}) => {
  const { presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false); // Estado local para manejar la carga
  const context = useContext(AppContext);
  const { initializePaymentSheet } = usePayment();

  const fetchPaymentSheetParams = async (): Promise<PaymentSheetParams | null> => {
    try {
      let body = { pago: "", dinero: 0 };
      switch(plan){
        case 'PLAN EMPRENDEDOR':
          body = { pago: "EMPRENDEDOR", dinero: 50000 };
          break;
        case 'PLAN EMPRESARIAL':
          body = { pago: "EMPRESARIAL", dinero: 20000 };
          break;
        case 'PLAN VIP':
          body = { pago: "VIP", dinero: 100000 }; // Parámetros completos para 'PLAN VIP'
          break;
        default:
          console.warn('Plan desconocido:', plan);
          break;
      }
      const response = await fetch(`${URL}payment-sheet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (data.paymentIntent && data.ephemeralKey && data.customer) {
        return data;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  const initializeAndOpenPaymentSheet = async () => {
    setLoading(true); // Inicia la carga y deshabilita el botón
    const paymentSheetParams = await fetchPaymentSheetParams();
    if (!paymentSheetParams) {
      setLoading(false); // Finaliza la carga si hay error
      return;
    }
    const isInitialized = await initializePaymentSheet(paymentSheetParams);
    if (isInitialized) {
      await openPaymentSheet();
    }
    setLoading(false); // Finaliza la carga después de la operación
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();
    context.setCheckout(!context.checkout);
    if (error) {
      navigation.navigate('PaymentResult', {
        success: false,
        message: 'Hubo un problema al procesar el pago',
        plan: "",
      });
    } else {
      navigation.navigate('PaymentResult', {
        success: true,
        message: 'Pago realizado exitosamente',
        plan: plan,
      });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight
        onPress={()=>{initializeAndOpenPaymentSheet();}}
        disabled={loading} // Desactiva el botón mientras carga
        style={[styles.btn, loading && styles.btnDisabled]}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.title}>Realizar Pago</Text>
        )}
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  btn: {
    marginTop: 25,
    backgroundColor: 'rgba(0,0,0,0.25)', // Color visible para el botón
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnDisabled: {
    backgroundColor: '#a0a0a0', // Color para el botón deshabilitado
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    color: '#fff', // Color de texto visible
  },
});
