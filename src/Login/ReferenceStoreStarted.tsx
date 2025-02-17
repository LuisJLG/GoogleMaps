import React, { useState, useContext, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Animated,
  Platform,
} from 'react-native';
import { ThemeLight } from '../Theme/Theme';
import { AppContext } from '../Context/AppContext';
import { ChevronBack } from '../../assets/SVG/ChevronBack';

export const ReferenceStoreStarted = ({ navigation }: any) => {
  const context = useContext(AppContext);
  const [reference, setReference] = useState( '');
  const [referenceFocus, setReferenceFocus] = useState(false);

  // Animaciones
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const isValidReference = (ref: string) => ref.length > 10;

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
      ]}
    >
      {/* Header */}
      <View style={styles.headerContainer}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <ChevronBack strokeColor="#000" />
        </Pressable>
        <Text style={styles.headerText}>Referencias del negocio</Text>
      </View>

      {/* Progreso */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>Referencias de tu negocio 4/4</Text>
        <View style={styles.progressBar}>
          <View style={styles.progressStepInactive} />
          <View style={styles.progressStepInactive} />
          <View style={styles.progressStepInactive} />
          <View style={styles.progressStepActive} />
        </View>
      </View>

      {/* Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Referencias</Text>
        <TextInput
          style={[
            styles.input,
          ]}
          placeholder="Ej: Cerca de la estación del metro"
          placeholderTextColor="#aaa"
          value={reference}
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
          onChangeText={setReference}
          onFocus={() => setReferenceFocus(true)}
          onBlur={() => setReferenceFocus(false)}
        />
      </View>

      {/* Botón Continuar */}
      <Pressable
        style={[
          styles.btnContinue,
          isValidReference(reference) ? styles.btnActive : styles.btnDisabled,
        ]}
        onPress={() => {
          if (isValidReference(reference)) {
            /*context.setStore({ References: reference });*/
            navigation.navigate('CustomizeApp');
          }
        }}
      >
        <Text
          style={[
            styles.btnText,
            isValidReference(reference) ? { color: '#fff' } : { color: '#aaa' },
          ]}
        >
          Siguiente
        </Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: Platform.OS === 'ios' ? 60 : 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressStepActive: {
    width: 40,
    height: 4,
    backgroundColor: ThemeLight.secondaryColor,
    marginHorizontal: 5,
    borderRadius: 2,
  },
  progressStepInactive: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
    borderRadius: 2,
  },
  inputContainer: {
    marginBottom: 30,
    width: '90%',
    alignSelf: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#555',
  },
  input: {
    borderWidth: 0.2,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
    minHeight: 100,
  },
  btnContinue: {
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  btnActive: {
    backgroundColor: ThemeLight.secondaryColor,
  },
  btnDisabled: {
    backgroundColor: '#eee',
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
  },
});
