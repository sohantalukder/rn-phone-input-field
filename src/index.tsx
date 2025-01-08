import React, { useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { forwardRef, useImperativeHandle, useState } from 'react';
import constants from './main/constants/constants';
import assets from './main/assets/assets';
import styles from './styles';
import type { RNPhoneInputProps, RNPhoneInputRef } from './index.d';
import type { CountryCode, EachCountry } from './main/constants/constants.d';
import CountryPickerModal from './main/country-picker/CountryPickerModal';
import { type PickerOpenRef } from './main/country-picker/Picker.d';

const RNPhoneInput = forwardRef<RNPhoneInputRef, RNPhoneInputProps>(
  (
    {
      downArrowIcon,
      containerStyle,
      defaultCountry,
      defaultValue,
      inputProps,
      onChangeText,
      onSelectCountryCode,
      placeholder,
      textInputStyle,
      placeholderColor,
      codeTextStyle,
      iconContainerStyle,
      darkMode = false,
    },
    ref
  ) => {
    const [country, setCountry] = useState<EachCountry>(
      constants[defaultCountry || 'BD']
    );
    const openModalRef = useRef<PickerOpenRef>(null);
    const [value, setValue] = useState<string>(defaultValue || '');
    const openBottomSheet = () => {
      openModalRef.current?.openModal();
    };
    useImperativeHandle(ref, () => ({
      isValidNumber: (text: string) => {
        if (text.length === 0) {
          return false;
        }
        const finalText = country.callingCode + text;
        return !!finalText.match(new RegExp(country.regex));
      },
      defaultCountry: (code: CountryCode) => {
        setCountry(constants[code]);
      },
      defaultValue: (text: string) => {
        setValue(text);
      },
      onChangeText: (text: string) => {
        setValue(text);
        onChangeText && onChangeText(text);
      },
    }));
    const onSelect = (item: EachCountry) => {
      setCountry(item);
      onSelectCountryCode &&
        onSelectCountryCode({
          countryCode: item.countryCode,
          callingCode: item.callingCode,
        });
    };
    const handleChangeText = (text: string) => {
      setValue(text);
      onChangeText && onChangeText(text);
    };
    const style = styles(darkMode);
    return (
      <React.Fragment>
        <View style={[style.container, containerStyle]}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={openBottomSheet}
            style={[style.flexRow, iconContainerStyle]}
          >
            <Text style={style.ft28}>{country.icon}</Text>
            {downArrowIcon || (
              <Image
                source={{
                  uri: !darkMode
                    ? assets.downArrowDarkIcon
                    : assets.downArrowDefaultIcon,
                }}
                resizeMode="contain"
                height={10}
                width={10}
              />
            )}
          </TouchableOpacity>
          <View style={[style.flexRow, style.gap10]}>
            <Text style={[style.ft16, codeTextStyle]}>
              +{country.callingCode}
            </Text>
            <TextInput
              style={[style.width75, style.ft16, textInputStyle]}
              placeholder={placeholder || 'Phone Number'}
              numberOfLines={1}
              defaultValue={value}
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
          onSelect={onSelect}
        />
      </React.Fragment>
    );
  }
);
export type { RNPhoneInputProps, RNPhoneInputRef, CountryCode };
export default RNPhoneInput;
