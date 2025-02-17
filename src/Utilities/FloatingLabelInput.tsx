import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Animated, StyleSheet } from 'react-native';
import { ThemeLight } from '../Theme/Theme';

export const FloatingLabelInput = ({ label, value, onChangeText, placeholder, keyboardType }) => {
  const [isFocused, setIsFocused] = useState(false);
  const labelAnimation = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(labelAnimation, {
      toValue: isFocused || value ? 1 : 0,
      duration: 80,
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
        placeholder={isFocused ? placeholder : ''}
        keyboardType={keyboardType}
        placeholderTextColor={'#aaa'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    paddingBottom: 0,
    borderBottomWidth: 1,
    marginTop: 20,
    width: '100%',
    position: 'relative',
    borderColor: ThemeLight.borderColor
  },
  input: {
    height: 49,
    fontSize: 16,
    color: ThemeLight.primaryColor,
    width: '100%',
  },
});
