import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {ThemeLight} from '../../Theme/Theme';
import {ChevronBack} from '../../../assets/SVG/ChevronBack';
import {PaymentScreenStripe} from './PaymentScreenStripe';

interface PremiumExpirationModalProps {
  isVisible: boolean;
  onClose: () => void;
  navigation?: any;
}

export const PremiumExpirationModal: React.FC<PremiumExpirationModalProps> = ({
  isVisible,
  onClose,
  navigation,
}) => {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = ['40%', '60%', '80%'];

  useEffect(() => {
    // Solo abrir el modal si isVisible es true y sheetRef está listo
    if (isVisible && sheetRef.current) {
      sheetRef.current.snapToIndex(1); // Abre en el índice 1
    } else if (sheetRef.current) {
      sheetRef.current.close(); // Cierra el modal si isVisible es false
    }
  }, [isVisible]); // Dependiendo de isVisible para controlar el comportamiento

  const handleSheetChanges = (index: number) => {
    if (index === -1) {
      onClose();
    }
  };

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      index={isVisible ? 1 : -1} // Iniciar cerrado
    >
      <View style={styles.modalContainer}>
        {/* Header con botón de cerrar */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Suscripción Expirada</Text>
        </View>

        {/* Contenido Principal */}
        <View style={styles.content}>
          <Text style={styles.title}>Tu suscripción premium ha expirado</Text>
          <Text style={styles.message}>
            Para seguir disfrutando de todas las funcionalidades, por favor
            renueva tu suscripción.
          </Text>

          {/* Botón de Renovación */}
          {/* <PaymentScreenStripe navigation={navigation} isVisible={isVisible} onClose={onClose}/> */}
            <TouchableOpacity
            style={[styles.renewButton]}
            onPress={() => {
              onClose();
              setTimeout(() => {
              navigation.navigate('SelectPlan');
              }, 0);
            }}>
            <Text style={styles.renewButtonText}>Renovar Suscripción</Text>
            </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
    zIndex: 1000,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: ThemeLight.textColor,
    marginLeft: 10,
  },
  content: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#565656',
    textAlign: 'center',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: ThemeLight.textColor,
    textAlign: 'center',
    marginBottom: 30,
  },
  renewButton: {
    backgroundColor: ThemeLight.btnBackground,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  renewButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
});
