import React from 'react';
import { View } from 'react-native';
import PhoneInput from 'rn-phone-input-field';

const App: React.FC = () => {
  return (
    <View>
      <PhoneInput
        placeholder="Enter your phone number"
        onChangeText={(value) => console.log(value)}
        onSelectCountryCode={(value) => console.log(value)}
      />
    </View>
  );
};

export default App;
