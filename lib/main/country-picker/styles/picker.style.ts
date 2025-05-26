import { StyleSheet } from 'react-native';
import { useMemo } from 'react';

// Constants for colors and dimensions
const COLORS = {
  dark: {
    text: '#F8F8F8',
    background: '#000000',
    searchText: '#FFFFFF',
  },
  light: {
    text: '#1B1D20',
    background: '#FFFFFF',
    searchText: '#000000',
  },
};

const DIMENSIONS = {
  padding: {
    horizontal: 20,
    vertical: 16,
  },
  fontSize: {
    small: 16,
    medium: 18,
    large: 22,
  },
  icon: {
    size: 48,
  },
};

const pickerStyles = (isDark: boolean) =>
  StyleSheet.create({
    eachContainer: {
      flexDirection: 'row',
      gap: 10,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    eachTextContainer: {
      color: isDark ? COLORS.dark.text : COLORS.light.text,
      fontSize: DIMENSIONS.fontSize.medium,
    },
    eachText: {
      fontSize: DIMENSIONS.fontSize.large,
    },
    searchInput: {
      flexGrow: 1,
      fontSize: DIMENSIONS.fontSize.small,
      color: isDark ? COLORS.dark.searchText : COLORS.light.searchText,
    },
    flatListContainer: {
      paddingTop: 8,
      paddingBottom: 80,
    },
    bgWhite: {
      flex: 1,
      backgroundColor: isDark
        ? COLORS.dark.background
        : COLORS.light.background,
    },
    flexRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    iconButton: {
      height: DIMENSIONS.icon.size,
      width: DIMENSIONS.icon.size,
      padding: 0,
      borderRadius: 500,
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 0,
    },
    emptyContainer: {
      padding: DIMENSIONS.padding.vertical,
      alignItems: 'center',
    },
    emptyText: {
      fontSize: DIMENSIONS.fontSize.small,
      fontWeight: '500',
      lineHeight: 24,
      textAlign: 'center',
      color: isDark ? COLORS.dark.text : COLORS.light.text,
    },
  });

const customBorder = (index: number, isDark: boolean) =>
  StyleSheet.create({
    border: {
      paddingTop: index === 0 ? 0 : DIMENSIONS.padding.vertical,
      paddingRight: DIMENSIONS.padding.horizontal,
      paddingBottom: DIMENSIONS.padding.vertical,
      paddingLeft: DIMENSIONS.padding.horizontal,
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

// Memoized hook for styles
export const usePickerStyles = (isDark: boolean) => {
  return useMemo(() => pickerStyles(isDark), [isDark]);
};

export { countryPickerStyles, customBorder };
