import React, { forwardRef, useImperativeHandle, useRef, useState, useCallback, useMemo } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import type { RNPhoneInputProps, RNPhoneInputRef } from './index.d';
import assets from './main/assets/assets';
import constants from './main/constants/constants';
import type { CountryCode, EachCountry } from './main/constants/constants.d';
import CountryPickerModal from './main/country-picker/CountryPickerModal';
import { type PickerOpenRef } from './main/country-picker/Picker.d';
import styles from './styles';

const RNPhoneInput = forwardRef<RNPhoneInputRef, RNPhoneInputProps>(
  (
    {
      downArrowIcon,
      containerStyle,
      defaultCountry = 'BD',
      defaultValue = '',
      inputProps,
      onChangeText,
      onSelectCountryCode,
      placeholder = 'Phone Number',
      textInputStyle,
      placeholderColor,
      codeTextStyle,
      iconContainerStyle,
      darkMode = false,
      searchInputProps,
    },
    ref
  ) => {
    // Memoize initial country to prevent unnecessary re-creation
    const initialCountry = useMemo(() => constants[defaultCountry], [defaultCountry]);
    
    const [country, setCountry] = useState<EachCountry>(initialCountry);
    const [value, setValue] = useState<string>(defaultValue);
    
    const openModalRef = useRef<PickerOpenRef>(null);
    const inputRef = useRef<TextInput>(null);
    
    // Memoize styles to prevent recreation on every render
    const componentStyles = useMemo(() => styles(darkMode), [darkMode]);
    
    // Memoize arrow icon to prevent recreation
    const arrowIcon = useMemo(() => {
      if (downArrowIcon) return downArrowIcon;
      
      return (
        <Image
          source={{
            uri: darkMode ? assets.downArrowDefaultIcon : assets.downArrowDarkIcon,
          }}
          resizeMode="contain"
          height={10}
          width={10}
        />
      );
    }, [downArrowIcon, darkMode]);
    
    // Memoize regex pattern to avoid recreation
    const validationRegex = useMemo(() => new RegExp(country.regex), [country.regex]);
    
    const openBottomSheet = useCallback(() => {
      openModalRef.current?.openModal();
    }, []);
    
    const handleCountrySelect = useCallback((item: EachCountry) => {
      setCountry(item);
      onSelectCountryCode?.({
        countryCode: item.countryCode,
        callingCode: item.callingCode,
      });
    }, [onSelectCountryCode]);
    
    const handleChangeText = useCallback((text: string) => {
      setValue(text);
      onChangeText?.(text);
    }, [onChangeText]);
    
    // Memoize imperative handle methods
    const imperativeHandleMethods = useMemo(() => ({
      isValidNumber: (text: string): boolean => {
        if (!text?.length) return false;
        const fullNumber = country.callingCode + text;
        return validationRegex.test(fullNumber);
      },
      
      defaultCountry: (code: CountryCode): void => {
        const newCountry = constants[code];
        if (newCountry) {
          setCountry(newCountry);
        }
      },
      
      defaultValue: (text: string): void => {
        setValue(text);
        inputRef.current?.setNativeProps({ text });
      },
      
      onChangeText: (text: string): void => {
        setValue(text);
        inputRef.current?.setNativeProps({ text });
      },
    }), [country.callingCode, validationRegex]);
    
    useImperativeHandle(ref, () => imperativeHandleMethods, [imperativeHandleMethods]);
    
    return (
      <>
        <View style={[componentStyles.container, containerStyle]}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={openBottomSheet}
            style={[componentStyles.flexRow, iconContainerStyle]}
          >
            <Text style={componentStyles.ft28}>{country.icon}</Text>
            {arrowIcon}
          </TouchableOpacity>
          
          <View style={[componentStyles.flexRow, componentStyles.gap10]}>
            <Text style={[componentStyles.ft16, codeTextStyle]}>
              +{country.callingCode}
            </Text>
            <TextInput
              ref={inputRef}
              style={[componentStyles.width75, componentStyles.ft16, textInputStyle]}
              placeholder={placeholder}
              numberOfLines={1}
              value={value}
              placeholderTextColor={placeholderColor}
              onChangeText={handleChangeText}
              inputMode="numeric"
              {...inputProps}
            />
          </View>
        </View>
        
        <CountryPickerModal
          ref={openModalRef}
          darkMode={darkMode}
          onSelect={handleCountrySelect}
          searchInputProps={searchInputProps}
        />
      </>
    );
  }
);

// Add display name for debugging
RNPhoneInput.displayName = 'RNPhoneInput';

export type { CountryCode, RNPhoneInputProps, RNPhoneInputRef };
export default RNPhoneInput;