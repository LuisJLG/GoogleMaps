import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LanguageContextProps {
  locale: string;
  setLocale: (locale: string) => void;
}

// Este es el contexto que provee los valores
export const LanguageContext = createContext<LanguageContextProps>({
  locale: 'en', // Valor predeterminado
  setLocale: () => {}, // Función vacía predeterminada
});

// Este es el componente Provider que usarás en tu aplicación
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState('en');

  useEffect(() => {
    const loadLocale = async () => {
      const storedLocale = await AsyncStorage.getItem('locale');
      if (storedLocale) {
        setLocale(storedLocale);
      }
    };
    loadLocale();
  }, []);

  const changeLocale = async (newLocale: string) => {
    setLocale(newLocale);
    await AsyncStorage.setItem('locale', newLocale);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale: changeLocale }}>
      {children}
    </LanguageContext.Provider>
  );
};
