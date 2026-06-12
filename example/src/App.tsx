import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import PhoneInput, {
  CountryCode,
  type PhoneInputProps,
  type PhoneInputRef,
} from 'rn-phone-input-field';

const DEFAULT_PHONE_NUMBER = '34669968571';

type ValidationState = {
  isValid: boolean;
  message: string;
};

const App: React.FC = () => {
  const phoneInputRef = useRef<PhoneInputRef>(null);
  const [phoneNumber, setPhoneNumber] = useState(DEFAULT_PHONE_NUMBER);
  const [validation, setValidation] = useState<ValidationState>({
    isValid: false,
    message: '',
  });

  const validatePhoneNumber = useCallback((value: string): ValidationState => {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return {
        isValid: false,
        message: 'Phone number is required.',
      };
    }

    if (trimmedValue.length < 6) {
      return {
        isValid: false,
        message: 'Phone number is too short.',
      };
    }

    const isValid =
      phoneInputRef.current?.isValidNumber?.(trimmedValue) ?? false;

    return {
      isValid,
      message: isValid
        ? 'Valid phone number.'
        : 'Enter a valid phone number for the selected country.',
    };
  }, []);

  const runValidation = useCallback(
    (value: string) => {
      setValidation(validatePhoneNumber(value));
    },
    [validatePhoneNumber]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      runValidation(DEFAULT_PHONE_NUMBER);
    }, 0);

    return () => clearTimeout(timeout);
  }, [runValidation]);

  const handlePhoneChange = useCallback(
    (value: string) => {
      setPhoneNumber(value);
      runValidation(value);
      console.log('phone', value);
    },
    [runValidation]
  );

  const handleCountrySelect = useCallback<
    NonNullable<PhoneInputProps['onSelectCountryCode']>
  >(
    (country: CountryCode) => {
      console.log('country', country.countryCode);
      console.log('calling code', country.callingCode);

      setTimeout(() => {
        runValidation(phoneNumber);
      }, 0);
    },
    [phoneNumber, runValidation]
  );

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.title}>Phone input</Text>
        <PhoneInput
          ref={phoneInputRef}
          defaultValue={DEFAULT_PHONE_NUMBER}
          placeholder="Enter your phone number"
          onChangeText={handlePhoneChange}
          onSelectCountryCode={handleCountrySelect}
          inputProps={{
            accessibilityLabel: 'Phone number',
            returnKeyType: 'done',
          }}
        />

        <View
          style={[
            styles.validationBox,
            validation.isValid ? styles.validBox : styles.invalidBox,
          ]}
        >
          <Text
            style={[
              styles.validationText,
              validation.isValid ? styles.validText : styles.invalidText,
            ]}
          >
            {validation.message || 'Enter a phone number to validate.'}
          </Text>
        </View>

        <Pressable
          onPress={() => runValidation(phoneNumber)}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>Validate phone number</Text>
        </Pressable>
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
  validationBox: {
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  validBox: {
    backgroundColor: '#ECFDF5',
    borderColor: '#10B981',
  },
  invalidBox: {
    backgroundColor: '#FEF2F2',
    borderColor: '#EF4444',
  },
  validationText: {
    fontSize: 14,
    fontWeight: '600',
  },
  validText: {
    color: '#047857',
  },
  invalidText: {
    color: '#B91C1C',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#111827',
    borderRadius: 8,
    marginTop: 12,
    paddingVertical: 12,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default App;
