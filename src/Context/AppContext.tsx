import React, { createContext, useState, useMemo, useEffect } from 'react';
import { AppContextState } from './ContextState';
import { User } from '../Model/User';

import { Category } from '../Model/Category';

import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  children: React.ReactNode;
};

export const AppContext = createContext({} as AppContextState);

const AppProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User>({
    Id: 1,
    Name: '',
    Username: '',
    PhoneNumber: '',
    Password: '',
    Role: '',
  });
  const [selectedTable, setSelectedTable] = useState<string>('');
  const [showNavBar, setShowNavBar] = useState<boolean>(false); // Control de navegación
  const [stockFlag, setStockFlag] = useState<boolean>(false); // Añadir este estado para manejar el stock
  const [quantityNextSell, setQuantityNextSell] = useState<string>('1');
  const [captureUri, setCaptureUri] = useState<string | null>(null);

  const [printerConnection, setPrinterConnection] = useState<boolean>(false);
  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean>(false);
  const [note, setNote] = useState<string>(''); // Añadir este estado para manejar la nota
  const [categorySelected, setCategorySelected] = useState<Category>({
    Id: 0,
    Name: '',
  });
  const [isShowSplash, setIsShowSplash] = useState<boolean>(false);
  const [checkout, setCheckout] = useState<boolean>(false);
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const completed = await AsyncStorage.getItem('onboardingCompleted');
      setOnboardingCompleted(completed === 'true');
    };
    checkOnboardingStatus();
  }, []);
  const value = useMemo(
    () => ({
      user,
      setUser,
      showNavBar,
      setShowNavBar,
      stockFlag,
      setStockFlag,
      quantityNextSell,
      setQuantityNextSell,
      printerConnection,
      setPrinterConnection,
      note,
      setNote,
      categorySelected,
      setCategorySelected,
      isShowSplash,
      setIsShowSplash,
      selectedTable,
      setSelectedTable,
      checkout,
      setCheckout,
      captureUri,
      setCaptureUri,
      onboardingCompleted,
      setOnboardingCompleted,
    }),
    [
      user,
      setUser,
      showNavBar,
      setShowNavBar,
      stockFlag,
      setStockFlag,
      quantityNextSell,
      setQuantityNextSell,
      printerConnection,
      setPrinterConnection,
      note,
      setNote,
      categorySelected,
      setCategorySelected,
      isShowSplash,
      setIsShowSplash,
      selectedTable,
      setSelectedTable,
      checkout,
      setCheckout,
      captureUri,
      setCaptureUri,
      onboardingCompleted,
      setOnboardingCompleted,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;