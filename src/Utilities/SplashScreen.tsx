import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RotatingLoader } from './RotatingLoader';

interface SplashScreenProps {
  isShowSplash: boolean;
  setIsShowSplash: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SplashScreen = ({isShowSplash, setIsShowSplash}: SplashScreenProps) => {
  if (!isShowSplash) {
    return null; // No mostrar nada si `isShowing` es false
  }

  return (
    <View style={styles.overlayContainer}>
      <RotatingLoader />
      <Text style={styles.textPowered}>POWERED BY RAVEKH</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    ...StyleSheet.absoluteFillObject, // Asegura que el SplashScreen cubra toda la pantalla
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.685)', // Fondo semitransparente
    //zIndex: 999999, // Asegura que esté por encima de todo, incluida la bottom tab
  },
  textPowered: {
    fontSize: 12,
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    position: 'absolute',
    bottom: 10,
  },
});
