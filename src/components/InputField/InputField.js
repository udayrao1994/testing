import React from 'react';
import { TextInput } from 'react-native';
import { styles } from './InputField.styles';

const InputField = ({ placeholder, value, onChangeText, keyboardType, secureTextEntry }) => {
  return (
    <TextInput
      style={styles.input}
      testID="emailInput" 
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      placeholderTextColor="#ccc"
    />
  );
};

export default InputField;
