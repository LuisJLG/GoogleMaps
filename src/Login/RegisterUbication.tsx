import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {ThemeDark, ThemeLight} from '../Theme/Theme';
import {Back} from '../Utilities/Back';
import {FloatingLabelInput} from '../Utilities/FloatingLabelInput';
import {FloatingLabelInputIcon} from '../Utilities/FloatingLabelInputIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from '../Context/AppContext';

export const RegisterUbication = ({navigation}: any) => {

  /*return (
  );*/
};

const styles = StyleSheet.create({
});
