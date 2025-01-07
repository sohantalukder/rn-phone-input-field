import { type ColorSchemeName, Dimensions, StyleSheet } from 'react-native';
const { height } = Dimensions.get('window');

const pickerStyles = (scheme: ColorSchemeName) =>
  StyleSheet.create({
    eachContainer: {
      flexDirection: 'row',
      gap: 10,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    eachTextContainer: {
      color: scheme === 'dark' ? '#F8F8F8' : '#1B1D20',
      fontSize: 18,
    },
    eachText: { fontSize: 22, lineHeight: 0 },
    searchInput: {
      flexGrow: 1,
      fontSize: 16,
      color: scheme !== 'dark' ? 'black' : 'white',
    },
    container: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: height - 64,
    },
    flatListContainer: {
      paddingTop: 8,
      paddingBottom: 80,
    },
    bgWhite: {
      flex: 1,
      backgroundColor: scheme === 'dark' ? 'black' : '#FAFAFB',
    },
    flexRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    iconButton: {
      height: 48,
      width: 48,
      padding: 0,
      borderRadius: 500,
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 0,
    },
  });

const customBorder = (index: number, scheme: ColorSchemeName) =>
  StyleSheet.create({
    border: {
      paddingTop: index === 0 ? 0 : 16,
      paddingRight: 20,
      paddingBottom: 16,
      paddingLeft: 20,
      borderTopWidth: index === 0 ? 0 : 1,
      borderTopColor:
        index === 0
          ? ''
          : `rgba(${scheme === 'dark' ? '255,255,255' : '0,0,0'},0.2)`,
    },
  });

export { pickerStyles, customBorder };
