import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import PhoneInput from 'rn-phone-input-field';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.title}>Phone input</Text>
        <PhoneInput
          defaultValue="+8801865741212"
          placeholder="Enter your phone number"
          onChangeText={(value) => console.log('phone', value)}
          onSelectCountryCode={(value) => console.log('country', value)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    color: '#111827',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },
});

export default App;
