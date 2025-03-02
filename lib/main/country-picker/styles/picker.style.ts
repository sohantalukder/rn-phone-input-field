import { StyleSheet } from 'react-native';

const pickerStyles = (isDark: boolean) =>
  StyleSheet.create({
    eachContainer: {
      flexDirection: 'row',
      gap: 10,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    eachTextContainer: {
      color: isDark ? '#F8F8F8' : '#1B1D20',
      fontSize: 18,
    },
    eachText: { fontSize: 22, lineHeight: 0 },
    searchInput: {
      flexGrow: 1,
      fontSize: 16,
      color: isDark ? '#FFFFFF' : '#000000',
    },
    flatListContainer: {
      paddingTop: 8,
      paddingBottom: 80,
    },
    bgWhite: {
      flex: 1,
      backgroundColor: isDark ? '#000000' : '#FFFFFF',
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

const customBorder = (index: number, isDark: boolean) =>
  StyleSheet.create({
    border: {
      paddingTop: index === 0 ? 0 : 16,
      paddingRight: 20,
      paddingBottom: 16,
      paddingLeft: 20,
      borderTopWidth: index === 0 ? 0 : 1,
      borderTopColor:
        index === 0 ? '' : `rgba(${isDark ? '255,255,255' : '0,0,0'},0.2)`,
    },
  });

const countryPickerStyles = StyleSheet.create({
  flex: { flex: 1 },
  mb40: {
    marginBottom: -40,
  },
});

export { pickerStyles, countryPickerStyles, customBorder };
