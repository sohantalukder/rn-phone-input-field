import React from 'react';
import { View } from 'react-native';
import RNPhoneInput from 'rn-phone-input-field';

const App: React.FC = () => {
  return (
    <View>
      <RNPhoneInput
        placeholder="Enter your phone number"
        onChangeText={(value) => console.log(value)}
        onSelectCountryCode={(value) => console.log(value)}
      />
    </View>
  );
};

export default App;
