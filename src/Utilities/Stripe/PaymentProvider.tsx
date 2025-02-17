// PaymentProvider.tsx

import React, { useState, createContext, useContext, useEffect } from 'react';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import { getPublishableKey } from './petitions';
import {AppContext} from '../../Context/AppContext';

interface PaymentContextProps {
  initializePaymentSheet: (paymentSheetParams: any) => Promise<boolean>;
}

const PaymentContext = createContext<PaymentContextProps | undefined>(undefined);

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment debe estar dentro de un PaymentProvider');
  }
  return context;
};

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { initPaymentSheet } = useStripe();
  const [publishableKey, setPublishableKey] = useState('');
  const context = useContext(AppContext);

  const initializePaymentSheet = async (paymentSheetParams: any): Promise<boolean> => {
    const { paymentIntent, ephemeralKey, customer } = paymentSheetParams;

    const { error } = await initPaymentSheet({
      merchantDisplayName: 'Ravekh, Inc.',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      allowsDelayedPaymentMethods: true,
    });

    return !error;
  };
useEffect(() => {
    getPublishableKey(/*context.user?.Token || */"")
    .then((key) => {
      if(key){
        setPublishableKey(key);
      }
    });
  }, []); // Ejecutar una vez al cargar el componente
  return (
    <StripeProvider
      publishableKey={publishableKey}
      merchantIdentifier="merchant.identifier"
    >
      <PaymentContext.Provider value={{ initializePaymentSheet }}>
        {children}
      </PaymentContext.Provider>
    </StripeProvider>
  );
};
