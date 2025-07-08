import React from 'react';
import { TextInput } from 'react-native';
import { styles } from './InputField.styles';

const InputField = ({ placeholder,testID, value, onChangeText, keyboardType, secureTextEntry }) => {
  return (
    <TextInput  
    testID={testID} 
    accessibilityLabel={testID} 
    data-testid={testID}
      style={styles.input}
      
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
