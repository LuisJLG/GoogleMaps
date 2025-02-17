import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Animated, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeLight } from '../Theme/Theme';

import {Eye} from '../../assets/SVG/Eye';
import {EyeOff} from '../../assets/SVG/EyeOff';
export const FloatingLabelInputIcon = ({ label, value, onChangeText, placeholder, keyboardType }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const labelAnimation = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(labelAnimation, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const labelStyle = {
    position: 'absolute',
    left: 0,
    bottom: labelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 35] // Adjust this value based on your input height
    }),
    fontSize: labelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 14]
    }),
    color: labelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['#aaa', ThemeLight.primaryColor]
    })
  };

  return (
    <View style={styles.container}>
     <Animated.Text style={labelStyle}>
      {label}
    </Animated.Text>
    <TextInput
      style={styles.input}
      onFocus={handleFocus}
      onBlur={handleBlur}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={isPasswordVisible}
      placeholder={isFocused ? placeholder : ''}
      keyboardType={keyboardType}
      placeholderTextColor={'#aaa'}
    />
    <TouchableOpacity
      style={styles.icon}
      onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
      {isPasswordVisible ? <EyeOff width={20} height={20}/> : <Eye width={20} height={20}/>}
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 18,
    paddingBottom: 6,
    borderBottomWidth: 1,
    marginTop: 20,
    width: '100%',
    position: 'relative',
    borderColor: ThemeLight.borderColor
  },
  input: {
    height: 40,
    fontSize: 16,
    color: ThemeLight.primaryColor,
    width: '100%',
    paddingRight: 30, 
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 15,
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 10,
  }
});
