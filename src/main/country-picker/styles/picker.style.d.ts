import { ColorSchemeName, StyleProp, TextStyle, ViewStyle } from 'react-native';

export declare const pickerStyles: (scheme: ColorSchemeName) => {
  eachContainer: StyleProp<ViewStyle>;
  eachTextContainer: StyleProp<TextStyle>;
  eachText: StyleProp<TextStyle>;
  searchInput: StyleProp<TextStyle>;
  container: StyleProp<ViewStyle>;
  flatListContainer: StyleProp<ViewStyle>;
  bgWhite: StyleProp<ViewStyle>;
  flexRow: StyleProp<ViewStyle>;
  iconButton: StyleProp<ViewStyle>;
};

export declare const customBorder: (
  index: number,
  scheme: ColorSchemeName
) => {
  border: StyleProp<ViewStyle>;
};
