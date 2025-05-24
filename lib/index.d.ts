import type {
  ColorValue,
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import type { CountryCode, EachCountry } from './main/constants/constants.d';

/**
 * Props for the RNPhoneInput component.
 */
interface RNPhoneInputProps {
  /**
   * Callback triggered when the text input value changes.
   * @param value - The updated input value.
   */
  onChangeText?: (value: string) => void;

  /**
   * The default country code for the phone input.
   */
  defaultCountry?: CountryCode;

  /**
   * The initial value displayed in the text input field.
   */
  defaultValue?: string;

  /**
   * Custom style for the container of the phone input component.
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * Placeholder text displayed when the text input is empty.
   */
  placeholder?: string;

  /**
   * Additional props passed to the underlying `TextInput` component.
   */
  inputProps?: TextInputProps;

  /**
   * Custom style for the text input field.
   */
  textInputStyle?: StyleProp<TextStyle>;

  /**
   * Callback triggered when a country is selected.
   * @param value - The selected country's details excluding `countryCode` and `callingCode`.
   */
  onSelectCountryCode?: (
    value: Omit<EachCountry, 'icon' | 'countryName' | 'regex'>
  ) => void;

  /**
   * Custom React element or icon rendered as the dropdown arrow.
   */
  downArrowIcon?: React.ReactNode;

  /**
   * Custom color for the placeholder text.
   */
  placeholderColor?: ColorValue;

  /**
   * Custom style for the container of the dropdown arrow icon.
   */
  iconContainerStyle?: StyleProp<ViewStyle>;

  /**
   * Custom style for the text displaying the country code.
   */
  codeTextStyle?: StyleProp<TextStyle>;
  /**
   * Determines whether the component should use dark mode.
   */
  darkMode?: boolean;

  searchInputProps?: TextInputProps;
}

/**
 * Ref for the RNPhoneInput component.
 */
interface RNPhoneInputRef {
  /**
   * Validates the entered phone number.
   * @param value - The phone number to validate.
   * @returns `true` if the number is valid, otherwise `false`.
   */
  isValidNumber?: (value: string) => boolean;

  /**
   * Method to programmatically change the text input value.
   * @param value - The new value to set.
   */
  onChangeText?: (value: string) => void;

  /**
   * Method to set the default country code programmatically.
   * @param code - The country code to set as default.
   */
  defaultCountry?: (code: CountryCode) => void;

  /**
   * Method to programmatically set the default value of the text input.
   * @param text - The new default value to set.
   */
  defaultValue?: (text: string) => void;
}
export type { RNPhoneInputProps, RNPhoneInputRef };
