import React from "react";
import { TextInput, StyleSheet, KeyboardTypeOptions } from "react-native";

interface InputBasicProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
}

const InputBasic: React.FC<InputBasicProps> = ({ value, onChangeText, placeholder, keyboardType = "default" }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value === "" ? '' : value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      placeholderTextColor={"#9999"}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#F8F8F8",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
    width: "95%",
  },
});

export default InputBasic;
