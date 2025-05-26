import { ColorSchemeName, StyleProp, TextStyle, ViewStyle } from 'react-native';

/**
 * styles for the picker
 */
export declare const pickerStyles: (scheme: ColorSchemeName) => {
  /**
   * each container for the picker
   */
  eachContainer: StyleProp<ViewStyle>;
  /**
   * each text container for the picker
   */
  eachTextContainer: StyleProp<TextStyle>;
  /**
   * each text for the picker
   */
  eachText: StyleProp<TextStyle>;
  /**
   * search input for the picker
   */
  searchInput: StyleProp<TextStyle>;
  /**
   * flat list container for the picker
   */
  flatListContainer: StyleProp<ViewStyle>;
  /**
   * background white for the picker
   */
  bgWhite: StyleProp<ViewStyle>;
  /**
   * flex row for the picker
   */
  flexRow: StyleProp<ViewStyle>;
  /**
   * icon button for the picker
   */
  iconButton: StyleProp<ViewStyle>;
};

/**
 * custom border for the picker
 */
export declare const customBorder: (
  index: number,
  scheme: ColorSchemeName
) => {
  /**
   * border for the picker
   */
  border: StyleProp<ViewStyle>;
};
