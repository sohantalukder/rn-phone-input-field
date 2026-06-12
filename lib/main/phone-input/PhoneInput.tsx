import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import assets from '../assets/assets';
import CountryPickerModal from '../country-picker/CountryPickerModal';
import type { PickerOpenRef } from '../country-picker/Picker.d';
import type { CountryCode, EachCountry } from '../constants/constants.d';
import styles from '../../styles';
import type { PhoneInputProps, PhoneInputRef } from '../../index.d';
import {
  getCountryByCode,
  getMaxNationalNumberLength,
  isValidForCountry,
  parsePhoneValue,
  sanitizePhoneInputValue,
  toSelectedCountryPayload,
} from './phoneUtils';

const PhoneInput = forwardRef<PhoneInputRef, PhoneInputProps>(
  (
    {
      onChangeText,
      onSelectCountryCode,
      defaultCountry = 'US',
      defaultValue = '',
      containerStyle,
      placeholder,
      inputProps,
      textInputStyle,
      downArrowIcon,
      placeholderColor = '#999',
      iconContainerStyle,
      codeTextStyle,
      darkMode = false,
      searchInputProps,
    },
    ref
  ) => {
    const countryPickerRef = useRef<PickerOpenRef>(null);
    const onSelectCountryCodeRef = useRef(onSelectCountryCode);
    const [selectedCountry, setSelectedCountry] = useState<EachCountry>(() =>
      getCountryByCode(defaultCountry)
    );
    const [value, setValue] = useState('');
    const {
      keyboardType = 'phone-pad',
      maxLength: inputPropsMaxLength,
      onChangeText: inputPropsOnChangeText,
      style: inputPropsStyle,
      ...restInputProps
    } = inputProps || {};
    const themedStyles = useMemo(() => styles(darkMode), [darkMode]);
    const maxNationalNumberLength = useMemo(
      () => getMaxNationalNumberLength(selectedCountry),
      [selectedCountry]
    );
    const inputMaxLength = useMemo(() => {
      if (typeof inputPropsMaxLength !== 'number') {
        return maxNationalNumberLength;
      }

      return Math.min(inputPropsMaxLength, maxNationalNumberLength);
    }, [inputPropsMaxLength, maxNationalNumberLength]);

    useEffect(() => {
      onSelectCountryCodeRef.current = onSelectCountryCode;
    }, [onSelectCountryCode]);

    const emitSelectedCountry = useCallback((country: EachCountry) => {
      onSelectCountryCodeRef.current?.(toSelectedCountryPayload(country));
    }, []);

    const applyValue = useCallback(
      (nextValue: string) => {
        const parsedValue = parsePhoneValue(nextValue, defaultCountry);
        const nextCountry =
          parsedValue.country || getCountryByCode(defaultCountry);
        const sanitizedValue = sanitizePhoneInputValue(
          parsedValue.nationalNumber,
          nextCountry
        );

        setSelectedCountry(nextCountry);
        setValue(sanitizedValue);
        emitSelectedCountry(nextCountry);
      },
      [defaultCountry, emitSelectedCountry]
    );

    useEffect(() => {
      applyValue(defaultValue);
    }, [applyValue, defaultValue]);

    const handleTextChange = useCallback(
      (nextValue: string) => {
        const sanitizedValue = sanitizePhoneInputValue(nextValue, selectedCountry);

        setValue(sanitizedValue);
        onChangeText?.(sanitizedValue);
        inputPropsOnChangeText?.(sanitizedValue);
      },
      [inputPropsOnChangeText, onChangeText, selectedCountry]
    );

    const handleCountrySelect = useCallback(
      (country: EachCountry) => {
        const sanitizedValue = sanitizePhoneInputValue(value, country);

        setSelectedCountry(country);
        setValue(sanitizedValue);
        emitSelectedCountry(country);

        if (sanitizedValue !== value) {
          onChangeText?.(sanitizedValue);
          inputPropsOnChangeText?.(sanitizedValue);
        }
      },
      [emitSelectedCountry, inputPropsOnChangeText, onChangeText, value]
    );

    const openCountryPicker = useCallback(() => {
      countryPickerRef.current?.openModal();
    }, []);

    const defaultDownArrowIcon = useMemo(
      () => (
        <Image
          source={{
            uri: darkMode
              ? assets.downArrowDarkIcon
              : assets.downArrowDefaultIcon,
          }}
          resizeMode="contain"
          style={{ height: 12, width: 12 }}
        />
      ),
      [darkMode]
    );

    useImperativeHandle(
      ref,
      () => ({
        isValidNumber: (phoneNumber: string) =>
          isValidForCountry(selectedCountry, phoneNumber),
        onChangeText: (nextValue: string) => {
          handleTextChange(nextValue);
        },
        defaultCountry: (code: CountryCode) => {
          const nextCountry = getCountryByCode(code);
          const sanitizedValue = sanitizePhoneInputValue(value, nextCountry);

          setSelectedCountry(nextCountry);
          setValue(sanitizedValue);
          emitSelectedCountry(nextCountry);

          if (sanitizedValue !== value) {
            onChangeText?.(sanitizedValue);
            inputPropsOnChangeText?.(sanitizedValue);
          }
        },
        defaultValue: (text: string) => {
          applyValue(text);
        },
      }),
      [
        applyValue,
        emitSelectedCountry,
        handleTextChange,
        inputPropsOnChangeText,
        onChangeText,
        selectedCountry,
        value,
      ]
    );

    return (
      <>
        <View style={[themedStyles.container, containerStyle]}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={openCountryPicker}
            style={[themedStyles.flexRow, iconContainerStyle]}
            accessibilityLabel="Select country code"
            accessibilityRole="button"
          >
            <Text style={themedStyles.ft28}>{selectedCountry.icon}</Text>
            <Text style={[themedStyles.ft16, codeTextStyle]}>
              +{selectedCountry.callingCode}
            </Text>
            {downArrowIcon || defaultDownArrowIcon}
          </TouchableOpacity>

          <TextInput
            {...restInputProps}
            value={value}
            onChangeText={handleTextChange}
            placeholder={placeholder}
            placeholderTextColor={placeholderColor}
            keyboardType={keyboardType}
            maxLength={inputMaxLength}
            style={[
              themedStyles.ft16,
              themedStyles.width75,
              textInputStyle,
              inputPropsStyle,
            ]}
          />
        </View>

        <CountryPickerModal
          ref={countryPickerRef}
          darkMode={darkMode}
          onSelect={handleCountrySelect}
          searchInputProps={searchInputProps}
        />
      </>
    );
  }
);

PhoneInput.displayName = 'PhoneInput';

export default PhoneInput;
