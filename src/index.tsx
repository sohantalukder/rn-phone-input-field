import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  useColorScheme,
} from 'react-native';
import { forwardRef, useImperativeHandle, useState } from 'react';
import constants from './lib/constants/constants';
import Picker from './lib/country-picker/Picker';
import assets from './lib/assets/assets';
import styles from './styles';
import type { RNPhoneInputProps, RNPhoneInputRef } from './index.d';
import type { CountryCode, EachCountry } from './lib/constants/types';

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
    },
    ref
  ) => {
    const [country, setCountry] = useState<EachCountry>(
      constants[defaultCountry || 'BD']
    );
    const [value, setValue] = useState<string>(defaultValue || '');
    const scheme = useColorScheme();
    const openBottomSheet = () => {
      global.openCountryModal({
        component: Picker as any,
        componentProps: { onSelect: onSelect },
      });
    };
    useImperativeHandle(ref, () => ({
      isValidNumber: (text: string) => {
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
      global.openCountryModal({});
      setCountry(item);
      onSelectCountryCode && onSelectCountryCode(item);
    };
    const handleChangeText = (text: string) => {
      console.log(text, text.match(new RegExp(country.regex)));
      setValue(text);
      onChangeText && onChangeText(text);
    };
    return (
      <View style={[styles.container, containerStyle]}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={openBottomSheet}
          style={[styles.flexRow, iconContainerStyle]}
        >
          <Text style={styles.ft28}>{country.icon}</Text>
          {downArrowIcon && (
            <Image
              source={{
                uri:
                  scheme !== 'dark'
                    ? assets.downArrowDarkIcon
                    : assets.downArrowDefaultIcon,
              }}
              resizeMode="contain"
              height={10}
              width={10}
            />
          )}
        </TouchableOpacity>
        <View style={[styles.flexRow, styles.gap10]}>
          <Text style={[styles.ft16, codeTextStyle]}>
            +{country.callingCode}
          </Text>
          <TextInput
            style={[styles.width75, styles.ft16, textInputStyle]}
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
    );
  }
);
export type { RNPhoneInputProps, RNPhoneInputRef, CountryCode };
export default RNPhoneInput;
